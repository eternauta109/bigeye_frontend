// Modules to control application life and create native browser window
const { app, BrowserWindow, screen } = require("electron");
const { ipcMain } = require("electron");
const path = require("path");
const {
  createDbUser,
  getManagerByCredentials,
  getAllManagersName,
} = require("./database/databaseManagersHandle");
const {
  createDbEvents,
  insertEvent,
  readAllEvents,
  getAllEvents,
  deleteThisEvent,
} = require("./database/eventsDB");
const express = require("express");
const cors = require("cors");
const localServerApp = express();

//non so bene perche faccio questa cosa
const PORT = 8088;
const startLocalServer = (done) => {
  localServerApp.use(express.json({ limit: "100mb" }));
  localServerApp.use(cors());
  localServerApp.use(express.static("./build/"));
  localServerApp.listen(PORT, async () => {
    console.log("Server Started on PORT ", PORT);
    done();
  });
};

// creo i db speriamo solo se serve

createDbUser();
createDbEvents();
/* getAllManagersName(); */

//inizializzo mainWindow per esposrla in tutta la funzione
let mainWindow;

function createWindow() {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      /* preload: path.join(__dirname, "preload.js"), */
    },
  });

  // and load the index.html of the app.
  //   mainWindow.loadFile('index.html')
  mainWindow.loadURL("http://localhost:" + PORT);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  startLocalServer(createWindow);

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

//ICP PER GESTIRE I MANAGERS

//icp per cercare sul db managers chi si sta loggando
ipcMain.on("login", async (event, args) => {
  console.log(
    "login ha inviato username e password a main",
    args.userName,
    args.password
  );
  const returnManager = await getManagerByCredentials(
    args.userName,
    args.password
  );
  console.log("manager ipcMain del main", returnManager);
  await mainWindow.webContents.send("returnManager", returnManager);
  // Gestisci le credenziali di accesso qui
  // Esegui l'autenticazione, interagisci con il database, ecc.
});

//icp electron che restituisce un array con tutti i nomi dei managers
ipcMain.on("send:managersName", async (event, args) => {
  const managers = await getAllManagersName();
  console.log("managers in main dopo chiamata al db", managers);
  await mainWindow.webContents.send("managersName", managers);
});

//ICP PER GESTIRE GLI EVENTI

//icp electron che inserisce un nuovo evento
ipcMain.on("send:event", async (event, args) => {
  console.log("MAIN: evento da inserire in db", args);
  await insertEvent(args);
  await readAllEvents();
});

//icp che restituisce tutti gli events. mi serve per caricare events alla primo avvio
//viene letta dal reducers eventi che va a modificare events nel calendar
ipcMain.on("send:getEvents", async (event, args) => {
  console.log("argomenti di send:getEvents", args);
  const stateEvents = await getAllEvents();
  await mainWindow.webContents.send("return:getEvents", stateEvents);
});

//icp che elimina un event dal db event
ipcMain.on("send:eventToDelete", async (event, eventId) => {
  console.log("send:eventToDelete", eventId);
  await deleteThisEvent(eventId);
  await readAllEvents();
});
