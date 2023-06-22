const { ipcMain, BrowserWindow } = require("electron");
require("dotenv").config();

// Open a window with the necessary UI to set up a new alarm
ipcMain.on("open-setalarm-window", (event) => {
  // Retrieve parent window
  const win = BrowserWindow.fromWebContents(event.sender);
  // Create a child window to set up the alarm
  const winAlarmSet = new BrowserWindow({
    titleBarStyle: "hidden",
    width: 400,
    height: 400,
    parent: win || undefined, // Set the parent window
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  winAlarmSet.loadURL(`${process.env.SERVER_URL}/add-alarm`);
});
