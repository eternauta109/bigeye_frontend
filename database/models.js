/* let dbMngr = require("./dbMngrs"); */
/* let db = dbMngr.db; */
const sqlite3 = require("sqlite3").verbose();
const dbPath = __dirname + "/database/bigEyeDB.db";
const db = new sqlite3.Database(dbPath);
console.log("qui db path: " + dbPath);

exports.testDB = db.serialize(() => {
  db.all("SELECT  * FROM managers", (err, result) => {
    if (err) {
      console.error("errore db", err);
    } else {
      console.log("managers stamp", result);
    }
  });
});

// Esempio di query di prova
/* exports.getManagers = () => {
  const qry = "SELECT * FROM managers";
  return db.all(qry, (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      console.log("risultato query", rows);
    }
  });
}; */
