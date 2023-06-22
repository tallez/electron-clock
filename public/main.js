const { app, BrowserWindow } = require("electron");
const { checkAlarms } = require("../scripts/alarms-checker.js");
require("dotenv").config();

// electron handlers
require("../ipcHandlers/retrieve-data");
require("../ipcHandlers/set-alarm-window");
require("../ipcHandlers/create-alarm");
require("../ipcHandlers/update-alarm-status");
require("../ipcHandlers/close-window");
require("../ipcHandlers/remove-alarm");

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
  win.loadURL(process.env.SERVER_URL);

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
    createMainWindow();
  }
});
