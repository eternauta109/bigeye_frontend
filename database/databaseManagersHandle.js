const { Level } = require("level");
const path = require("path");

const dbName = "managers";

const dbPath = path.join(__dirname, `./${dbName}`);
const db = new Level(dbPath, { valueEncoding: "json" });

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

async function createDb() {
  try {
    await db.open();
    console.log("create db prima linea");
    await populateDatabase();
    console.log("create db dopo popolate");
    await readAll();
    console.log("create db dopo readAll");
    await close();
    return db;
  } catch (error) {
    console.log("try catch", error);
  }
  await close();
}

/* 
console.log("Creating database path: " + dbPath);
const db = new Level(dbPath, { valueEncoding: "json" }); */

// Funzione per creare il database se non esiste

// Funzione per popolare il database
async function populateDatabase() {
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
      name: "corlos",
      rule: "am",
      password: "111",
      isAuth: fals,
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
  await db.close();
  console.log("Database popolato con successo!");
}

async function readAll() {
  console.log("Database letto!");
  db.open();
  const results = [];
  for await (const [key, value] of db.iterator()) {
    results.push({ key, value });
  }
  console.log(results);
  await close();
  return results;
}

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

function insert(key, value) {
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

function query(key) {
  return new Promise((resolve, reject) => {
    dbMan.get(key, (err, value) => {
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
  createDb,
  populateDatabase,
  getManagerByCredentials,
  readAll,
};
