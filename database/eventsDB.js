const { Level } = require("level");
const path = require("path");
const fs = require("fs");

const dbName = "events";

const dbPath = path.join(__dirname, `./${dbName}`);
const db = new Level(dbPath, { valueEncoding: "json" });

//funzione per cercare e restituire un event per id
async function getEvntFromID() {}

// Funzione per creare il database se non esiste
function createDbEvents() {
  fs.access(dbPath, fs.constants.F_OK, async (err) => {
    if (err) {
      console.log("db events non esistente, lo creo");
    } else {
      console.log("db events esistente lo leggo");
      try {
        await db.open();

        await readAll();

        return db;
      } catch (error) {
        console.log("try catch", error);
      }
      await close();
    }
  });
}

// funzione che legge tutto il database
async function readAll() {
  console.log("Database events letto!");
  db.open();
  const results = [];
  for await (const [key, value] of db.iterator()) {
    results.push({ key, value });
  }
  console.log("satmapa di tutto il db events", results);
  await close();
  return results;
}

//cunzione che conntte al db
function connect() {
  return new Promise((resolve, reject) => {
    db.open((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

//funzione che riceve una key e un event e lo
// aggiunge al database
function insertEvent(key, value) {
  return new Promise((resolve, reject) => {
    db.put(key, value, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

//non so
function query(key) {
  return new Promise((resolve, reject) => {
    db.get(key, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}
//funzione che chiude il db e fa un log di conferma chiusura
function close() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        console.log("db events close");
        resolve();
      }
    });
  });
}

module.exports = {
  connect,
  insertEvent,
  query,
  close,
  createDbEvents,
  getEvntFromID,
  readAll,
};
