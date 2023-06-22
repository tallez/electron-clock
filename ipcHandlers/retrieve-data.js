const { ipcMain } = require("electron");
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
