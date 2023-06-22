const { ipcMain, dialog } = require("electron");
const { AlarmDatabase } = require("../scripts/database-manager");

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
