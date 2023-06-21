const { app, BrowserWindow, ipcMain } = require("electron");
const { AlarmDatabase } = require("../scripts/database-manager");

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

// Create main application window
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
