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

      await connect();
      try {
        await populateDatabase();
      } catch (error) {
        console.log(error);
      }
      await readAllEvents();
    } else {
      console.log("db events esistente lo leggo");
      try {
        await connect();
        await readAllEvents();
      } catch (error) {
        console.log("try catch", error);
      }
    }
  });
}

// Funzione per convertire le date in formato stringa ISO
function convertDateToString(date) {
  return date.toISOString();
}

// Funzione per convertire le stringhe ISO in oggetti Date
function convertStringToDate(dateString) {
  return new Date(dateString);
}

//funzione che restituisce tutto il db
async function getAllEvents() {
  const allEvents = [];
  try {
    await connect();
    for await (const [key, value] of db.iterator()) {
      if (key !== "totalEvents") {
        const parsedEvent = JSON.parse(value);
        parsedEvent.start = convertStringToDate(parsedEvent.start);
        parsedEvent.end = convertStringToDate(parsedEvent.end);
        allEvents.push(parsedEvent);
      }
    }
  } catch (error) {
    console.log("errore durante il recupero dei dai dal db events", error);
  } finally {
    close();
  }
  return allEvents;
}

// Funzione per popolare il database
async function populateDatabase() {
  await connect();

  // Inserisci i manager nel database (assumendo che dbMan sia l'istanza del database creato)

  await db.put("totalEvents", 0);

  await close();
  console.log("Database events popolato con successo!");
}

// funzione che legge tutto il database
async function readAllEvents() {
  console.log("Database events letto!");
  connect();
  const results = [];
  for await (const [key, value] of db.iterator()) {
    results.push({ key, value });
  }
  console.log("satmapa di tutto il db events", results);
  await close();
  return results;
}

//funzione che connette al db
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
async function insertEvent(value) {
  console.log("event in insertEvnet in db:", value);
  const serializeEvent = JSON.stringify({
    ...value.event,
    start: convertDateToString(value.event.start),
    end: convertDateToString(value.event.end),
  });
  connect();
  return new Promise((resolve, reject) => {
    db.put("totalEvents", value.totalEvents + 1, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
    db.put(value.event.id, serializeEvent, (err) => {
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
  connect();
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
  readAllEvents,
  getAllEvents,
};
