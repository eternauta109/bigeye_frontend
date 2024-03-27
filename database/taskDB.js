const { Level } = require("level");
const path = require("path");
const fs = require("fs");

const dbName = "tasks";

const dbPath = path.join(__dirname, `./${dbName}`);
const db = new Level(dbPath, { valueEncoding: "json" });

//funzione per cercare e restituire un task per id
async function getEvntFromID() {}

// Funzione per creare il database se non esiste
function createDbtasks() {
  fs.access(dbPath, fs.constants.F_OK, async (err) => {
    if (err) {
      console.log("db tasks non esistente, lo creo");

      await connect();
      try {
        await populateDatabase();
      } catch (error) {
        console.log(error);
      }
      await readAlltasks();
    } else {
      console.log("db tasks esistente lo leggo");
      try {
        await readAlltasks();
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
async function getAlltasks() {
  const alltasks = [];
  const tottasks = await query("totaltasks");
  try {
    await connect();
    for await (const [key, value] of db.iterator()) {
      if (key !== "totaltasks") {
        const parsedtask = JSON.parse(value);
        parsedtask.start = convertStringToDate(parsedtask.start);
        parsedtask.end = convertStringToDate(parsedtask.end);
        alltasks.push(parsedtask);
      }
    }
  } catch (error) {
    console.log("errore durante il recupero dei dai dal db tasks", error);
  } finally {
    await close();
  }
  return { tasks: alltasks, totaltasks: tottasks };
}

// Funzione per popolare il database
async function populateDatabase() {
  await connect();

  // Inserisci i manager nel database (assumendo che dbMan sia l'istanza del database creato)

  await db.put("totaltasks", 0);

  await close();
  console.log("Database tasks popolato con successo!");
}

// funzione che legge tutto il database
async function readAlltasks() {
  console.log("Database tasks letto!");
  await connect();
  const results = [];
  for await (const [key, value] of db.iterator()) {
    results.push({ key, value });
  }
  console.log("satmapa di tutto il db tasks", results);
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

// Funzione per controllare se un tasko esiste nel database
// mi servirà quando aggiungo un nuovo task per capire
// se aumentare o no totaltasks
async function taskExists(key) {
  console.log("taskExists", key);
  try {
    const value = await db.get(key); // Recupero il valore dell'tasko
    return value !== undefined; // Ritorno true se l'tasko esiste, altrimenti false
  } catch (error) {
    // Se si verifica un errore, l'tasko non esiste
    return false;
  } finally {
  }
}

// Funzione per inserire o aggiornare un  tasko nel database
//in questa funzione controllo se un task esiste gia, per capire
// se devo aggiungere l'task e aumentare totaltasks in caso non esista,
// o aggiornare un task e non aumentare totaltasks in caso esista.
async function inserttask(value) {
  console.log("task in insertOrUpdatetask in db:", value);
  const serializetask = JSON.stringify({
    ...value.task,
    start: convertDateToString(value.task.start),
    end: convertDateToString(value.task.end),
  });

  try {
    await connect(); // Connessione al database
    if (await taskExists(value.task.id)) {
      // Se l'tasko esiste già, non aggiorno totaltasks
      await db.put(value.task.id, serializetask); // Aggiornamento dell'tasko nel database
    } else {
      // Se l'tasko non esiste, incremento totaltasks
      await db.put("totaltasks", value.totaltasks + 1); // Aggiornamento di totaltasks
      await db.put(value.task.id, serializetask); // Inserimento dell'tasko nel database
    }
    console.log("task inserted or updated successfully.");
  } catch (error) {
    console.error("Error inserting or updating task:", error);
    throw error; // Gestione dell'errore
  } finally {
    await close(); // Chiusura della connessione al database
  }
}

//qui ricevo un taskId e lo elimino
async function deleteThistask(taskId) {
  console.log("Deleting task id: ", taskId);
  try {
    await connect(); // Connessione al database
    await db.del(taskId); // Elimina l'tasko utilizzando l'ID come chiave
    console.log("task deleted successfully.");
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error; // Gestione dell'errore
  } finally {
    await close(); // Chiusura della connessione al database
  }
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
        console.log("db tasks close");
        resolve();
      }
    });
  });
}

module.exports = {
  connect,
  inserttask,
  query,
  close,
  createDbtasks,
  getEvntFromID,
  readAlltasks,
  getAlltasks,
  deleteThistask,
};
