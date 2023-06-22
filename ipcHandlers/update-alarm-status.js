const { ipcMain, dialog } = require("electron");
const { AlarmDatabase } = require("../scripts/database-manager");

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
