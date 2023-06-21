const { AlarmDatabase } = require("./database-manager");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");

function checkAlarms() {
  const currDB = new AlarmDatabase();
  currDB.retrieveData((err, data) => {
    if (err) {
      console.error("Error retrieving data:", err);
      // Handle the error accordingly
    } else {
      // Check if there are any alarms that match the current time
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const matchingAlarms = data.filter(
        (alarm) => alarm.time === currentTime && alarm.status === 1
      );

      // Process the matching alarms
      if (matchingAlarms.length > 0) {
        matchingAlarms.forEach((alarm) => {
          currDB.setAlarmStatus(alarm.id, false);

          const winAlarmTriggered = new BrowserWindow({
            frame: false,
            width: 200,
            height: 200,
            modal: true,
            webPreferences: {
              nodeIntegration: true,
              contextIsolation: false,
            },
          });

          winAlarmTriggered.loadURL(
            `http://localhost:3000/triggered-alarm?title=${encodeURIComponent(
              alarm.title
            )}`
          );
        });
      }
    }
  });
}

module.exports = {
  checkAlarms,
};
