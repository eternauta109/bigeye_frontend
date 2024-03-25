const { Level } = require("level");
const path = require("path");
const fs = require("fs");

const dbName = "managers";

const dbPath = path.join(__dirname, `./${dbName}`);
const db = new Level(dbPath, { valueEncoding: "json" });

//funzione per cercare e restituire il manager con crede
//credenziali corrette
async function getManagerByCredentials(userName, password) {
  console.log("ricevo in db query user pass", userName, password, dbPath);
  const db = new Level(dbPath, { valueEncoding: "json" });
  let managerFound = null;

  try {
    for await (const [key, value] of db.iterator()) {
      const manager = value;

      if (manager.name === userName && manager.password === password) {
        console.log("Credenziali corrette", key, manager);
        managerFound = manager;
        break; // Esci dal loop quando trovi il manager corrispondente
      }
    }
    if (!managerFound) {
      console.log("Credenziali errate");
    }
  } catch (error) {
    console.error("Errore durante la ricerca del manager:", error);
    throw error;
  } finally {
    // Chiudi il database solo dopo aver completato le iterazioni
    console.log("chiudi il db:");
    await db.close();
  }

  return managerFound;
}

// Funzione per creare il database se non esiste
function createDbUser() {
  fs.access(dbPath, fs.constants.F_OK, async (err) => {
    if (err) {
      console.log("db managers non esistente, lo creo");

      await connect();
      try {
        await populateDatabase();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("db managers esistente lo leggo");
      try {
        await connect();
        await readAll();
      } catch (error) {
        console.log("try catch", error);
      }
    }
  });
}

// Funzione per popolare il database
async function populateDatabase() {
  await connect();
  const managers = [
    {
      name: "fabioc",
      rule: "tm",
      password: "109",
      isAuth: false,
      cinema: "guidonia",

      notification: [],
    },
    {
      name: "robertod",
      rule: "am",
      password: "110",
      isAuth: false,
      cinema: "guidonia",

      notification: [],
    },
    {
      name: "carlos",
      rule: "am",
      password: "111",
      isAuth: false,
      cinema: "guidonia",

      notification: [],
    },
    {
      name: "marap",
      rule: "am",
      password: "113",
      isAuth: false,
      cinema: "guidonia",

      notification: [],
    },
    {
      name: "valentinad",
      rule: "am",
      password: "114",
      isAuth: false,
      cinema: "guidonia",

      notification: [],
    },
  ];

  // Inserisci i manager nel database (assumendo che dbMan sia l'istanza del database creato)
  for (const manager of managers) {
    await db.put(manager.name, manager);
  }
  await close();
  console.log("Database popolato con successo!");
}

//funzione che restituisce un array contenente
//tutti i nomi dei managers
async function getAllManagersName() {
  console.log("nomi managers");
  await connect();
  const results = [];
  for await (const [key, value] of db.iterator()) {
    results.push(value.name);
  }
  console.log("stampo l'array di nomi managers dal gestore del db", results);
  await close();
  return results;
}

//funzione che legge e stampa tutto il db
async function readAll() {
  console.log("Database manager letto!");
  await connect();
  const results = [];
  for await (const [key, value] of db.iterator()) {
    results.push({ key, value });
  }
  console.log(results);
  await close();
  return results;
}

function connect() {
  console.log("Connect with managers");
  return new Promise((resolve, reject) => {
    db.open((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
}

async function insert(key, value) {
  await connect();
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

async function query(key) {
  await connect();
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

function close() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        console.log("db managers close");
        resolve();
      }
    });
  });
}

module.exports = {
  connect,
  insert,
  query,
  close,
  createDbUser,
  populateDatabase,
  getManagerByCredentials,
  readAll,
  getAllManagersName,
};
