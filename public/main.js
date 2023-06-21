const { app, BrowserWindow, ipcMain } = require("electron");
const { AlarmDatabase } = require("../scripts/database-manager");
const { checkAlarms } = require("../scripts/alarms-checker.js");

// Retrieve all alarms from database
ipcMain.on("retrieve-data", (event) => {
  const currDB = new AlarmDatabase();
  currDB.retrieveData((err, data) => {
    if (err) {
      console.error("Error retrieving data:", err);
      // Handle the error accordingly
    } else {
      event.reply("retrieve-data-response", data);
    }
  });
});

// Open a window with the necessary UI to set up a new alarm
ipcMain.on("open-setalarm-window", (event) => {
  // Retrieve parent window
  const win = BrowserWindow.fromWebContents(event.sender);
  // Create a child window to set up the alarm
  const winAlarmSet = new BrowserWindow({
    width: 400,
    height: 400,
    modal: true,
    parent: win || undefined, // Set the parent window
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  winAlarmSet.loadURL("http://localhost:3000/add-alarm");
});

// Create a new alarm in database
ipcMain.on("create-alarm", (event, name, time) => {
  // Create an object, instance of database
  const currDB = new AlarmDatabase();
  // Proceed with operation and retrieve sucess status
  const success = currDB.insertAlarm(name, time);
  if (success) {
    event.reply("create-alarm-response", success);
  } else {
    dialog.showMessageBox({
      type: "error",
      message: "There was an error creating the alarm",
      buttons: ["OK"],
    });
  }
  // Close window
  const window = BrowserWindow.fromWebContents(event.sender);
  window.close();
});

// Remove alarm in database
ipcMain.on("remove-alarm", (_event, id) => {
  const currDB = new AlarmDatabase();
  const success = currDB.deleteAlarm(id);
  if (!success) {
    dialog.showMessageBox({
      type: "error",
      message: "Error removing the alarm",
      buttons: ["OK"],
    });
  }
});

// Change status of alarm in the database
ipcMain.on("update-alarm-status", (event, id, status) => {
  const currDB = new AlarmDatabase();
  currDB.setAlarmStatus(id, status).then((success) => {
    if (success) {
      event.reply("update-alarm-status-response", success);
    } else {
      dialog.showMessageBox({
        type: "error",
        message: "Error creating the alarm",
        buttons: ["OK"],
      });
    }
  });
});

// Close window
ipcMain.on("close-window", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.close();
});

// Create main application window
// setInterval for checking the database:
interval = 1000;

function createMainWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  setInterval(checkAlarms, interval);

  win.loadURL("http://localhost:3000");

  //win.webContents.openDevTools();
}

// Create window when app is ready
app.whenReady().then(createMainWindow);

// Shut app down when all windows are closed, except on macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Reopen window when the app icon is clicked in the dock on macOS
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
