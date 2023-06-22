const { ipcMain, BrowserWindow } = require("electron");
// Close window
ipcMain.on("close-window", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.close();
});
