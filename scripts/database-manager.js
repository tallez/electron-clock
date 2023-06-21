const sqlite3 = require("sqlite3").verbose();
const path = require("path");

class AlarmDatabase {
  constructor() {
    const dbPath = path.join(__dirname, "..", "public", "alarms.db");
    this.db = new sqlite3.Database(dbPath);
  }

  // Initialize the database by creating the alarms table if it doesn't exist
  initialize() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS alarms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        time TEXT NOT NULL,
        status BOOLEAN DEFAULT TRUE
      )
    `);
  }

  // Retrieve all alarm data from the database
  retrieveData(callback) {
    this.db.all("SELECT * FROM alarms", (err, rows) => {
      if (err) {
        // Pass the error to the callback function
        callback(err, null);
      } else {
        // Pass the retrieved rows to the callback function
        callback(null, rows);
      }
    });
  }

  // Insert a new alarm into the database
  insertAlarm(title, time) {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO alarms (title, time) VALUES (?, ?)",
        [title, time],
        (err) => {
          if (err) {
            console.error("Failed to insert alarm:", err);
            resolve(false);
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  // Delete an alarm from the database by its ID
  deleteAlarm(id) {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM alarms WHERE id = ?", id, (err) => {
        if (err) {
          console.error("Failed to delete alarm:", err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
  // Set the satus of an alarm by its ID
  setAlarmStatus(id, status) {
    return new Promise((resolve, reject) => {
      this.db.run(
        "UPDATE alarms SET status = ? WHERE id = ?",
        [status, id],
        (err) => {
          if (err) {
            console.error("Failed to update alarm status:", err);
            resolve(false);
          } else {
            resolve(true);
          }
        }
      );
    });
  }
}

const newAlarmDb = new AlarmDatabase();
newAlarmDb.initialize();

module.exports = {
  AlarmDatabase,
};
