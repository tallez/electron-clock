const { ipcMain, BrowserWindow } = require("electron");
const { AlarmDatabase } = require("../scripts/database-manager");

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
