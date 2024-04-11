// Modules to control application life and create native browser window
const { app, BrowserWindow, screen } = require("electron");
const { ipcMain } = require("electron");
const path = require("path");

const {
  createDbUser,
  getManagerByCredentials,
  getAllManagersName,
  addNotifyManagers,
  deleteThisNotify,
  getAllManagers,
  addNewUser,
  deleteThisManager,
} = require("../database/databaseManagersHandle");
const {
  createDbEvents,
  insertEvent,
  getAllEvents,
  deleteThisEvent,
} = require("../database/eventsDB");
const {
  createDbTasks,
  insertTask,
  getAllTasks,
  deleteThisTask,
} = require("../database/taskDB");

const {
  createDbTopics,
  insertTopic,
  getAllTopics,
  deleteThisTopic,
} = require("../database/topicsDB");
const { getAllOptions, createDbOptions } = require("../database/optionsDB");
const { add } = require("date-fns");

/* const express = require("express");
const cors = require("cors");
const localServerApp = express(); */

//non so bene perche faccio questa cosa
/* const PORT = 8088;
const startLocalServer = (done) => {
  localServerApp.use(express.json({ limit: "100mb" }));
  localServerApp.use(cors());
  localServerApp.use(express.static("./build/"));
  localServerApp.listen(PORT, async () => {
    console.log("Server Started on PORT ", PORT);
    done();
  });
}; */

const mode = process.env.NODE_ENV === "development" ? true : false;

console.log("Starting mode", mode);

// creo i db speriamo solo se serve

createDbUser();
createDbEvents();
createDbTasks();
createDbTopics();
createDbOptions();
/* getAllManagersName(); */

//inizializzo mainWindow per esposrla in tutta la funzione
let mainWindow;

function createWindow() {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: width,
    icon: path.join(__dirname, "bigeye2.ico"),
    height: height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      worldSafeExecution: true,
      /* preload: path.join(__dirname, "preload.js"), */
    },
  });

  const appPath = app.getAppPath();
  // and load the index.html of the app.
  mainWindow.loadURL(
    mode
      ? "http://localhost:3000"
      : `file://${path.join(appPath, "build", "index.html")}`
  );
  mainWindow.setMenu(null);
  // Open the DevTools.
  mainWindow.webContents.openDevTools({ mode: "right" });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
/* app.whenReady().then(createWindow); */

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

//ICP PER GESTIRE I MANAGERS

//icp per creare un nuovo user
ipcMain.on("send:newUser", async (event, args) => {
  const returnNames = await addNewUser({ ...args });
  console.log("main ritorno add new user ", returnNames);
  await mainWindow.webContents.send("return:newUser", returnNames);
});

//icp per cancellare user
ipcMain.on("send:deleteManager", async (event, args) => {
  const returnNames = await deleteThisManager(args);
  console.log("main ritorno delete new user ", returnNames);
  await mainWindow.webContents.send("return:deleteManager", returnNames);
});

//icp per prendere tutti i managers che appartengono al cinema
ipcMain.on("send:getAllManagers", async (event, args) => {
  const allManagers = await getAllManagers(args);
  console.log("main ritorno di tutti i mangers", allManagers);
  await mainWindow.webContents.send("return:getAllManagers", allManagers);
});

//icp per cercare sul db managers chi si sta loggando
ipcMain.on("login", async (event, args) => {
  const returnManager = await getManagerByCredentials(
    args.userName,
    args.password
  );
  /* console.log("manager ipcMain del main", returnManager); */
  await mainWindow.webContents.send("returnManager", returnManager);
  // Gestisci le credenziali di accesso qui
  // Esegui l'autenticazione, interagisci con il database, ecc.
});

//icp electron che restituisce un array con tutti i nomi dei managers
ipcMain.on("send:managersName", async (event, args) => {
  const managers = await getAllManagersName();
  /*  console.log("managers in main dopo chiamata al db", managers); */
  await mainWindow.webContents.send("managersName", managers);
});

//icp che restituisce un array di notifiche aggiornate dopo aver cancellato
//quella appena letta. con questo andrò a aggionare lo stato di user
ipcMain.on("send:notifyToDelete", async (event, args) => {
  console.log(
    "sono in main e mando questa notifica da cancellare al lla funzione che gestisce il db manager",
    args
  );
  const newNotify = await deleteThisNotify(args);
  console.log(
    "main: dopo eliminazione di una notifica ritorna questo array",
    newNotify
  );
  await mainWindow.webContents.send("return:notifyToDelete", newNotify);
});

//ICP PER GESTIRE GLI EVENTI

//icp electron che inserisce un nuovo evento
ipcMain.on("send:event", async (event, args) => {
  /* console.log("MAIN: evento da inserire in db", args); */
  await addNotifyManagers({ typeNotify: "event", obj: args.event });
  await insertEvent(args);
  /* await readAllEvents(); */
});

//icp che restituisce tutti gli events. mi serve per caricare events alla primo avvio
//viene letta dal reducers eventi che va a modificare events nel calendar
ipcMain.on("send:getEvents", async (event, args) => {
  /* console.log("argomenti di send:getEvents", args); */
  const stateEvents = await getAllEvents();
  await mainWindow.webContents.send("return:getEvents", stateEvents);
});

//icp che elimina un event dal db event
ipcMain.on("send:eventToDelete", async (event, eventId) => {
  /* console.log("send:eventToDelete", eventId); */
  await deleteThisEvent(eventId);
  /* await readAllEvents(); */
});

//ICP PER GESTIRE I TASK

//icp electron che inserisce o aggiorna  task
ipcMain.on("send:task", async (event, args) => {
  /* console.log("MAIN: task da inserire in db", args); */
  await insertTask(args);
  await addNotifyManagers({ typeNotify: "task", obj: args.task });
  /* await readAllTasks(); */
});

//icp che restituisce tutti gli tasks. mi serve per caricare events alla primo avvio
//viene letta dal reducers tasks
ipcMain.on("send:getTasks", async (event, args) => {
  /*   console.log("argomenti di send:getTasks", args); */
  const stateTasks = await getAllTasks();
  await mainWindow.webContents.send("return:getTasks", stateTasks);
});

//icp che elimina un event dal db task
ipcMain.on("send:taskToDelete", async (event, taskId) => {
  /* console.log("send:taskToDelete", taskId); */
  await deleteThisTask(taskId);
  /* await readAllTasks(); */
});

//ICP PER GESTIRE I TOPICS

//icp electron che inserisce o aggiorna un topic
ipcMain.on("send:topic", async (event, args) => {
  console.log("MAIN: topic da inserire in db", args);
  await insertTopic(args);
  const stateTopics = await getAllTopics();
  await addNotifyManagers({ typeNotify: "topic", obj: args.topic });
  await mainWindow.webContents.send("return:addNewTopics", stateTopics);
  /* await readAllTopics(); */
});

//icp che restituisce tutti i topics.
//viene letta dal reducers topics
ipcMain.on("send:getTopics", async (event, args) => {
  console.log("argomenti di send:getTopics", args);
  const stateTopics = await getAllTopics();

  await mainWindow.webContents.send("return:getTopics", stateTopics);
  /* await readAllTopics(); */
});

//icp che elimina un event dal db topics
ipcMain.on("send:topicToDelete", async (event, topicId) => {
  console.log("send:topicToDelete", topicId);
  await deleteThisTopic(topicId);
  const stateTopics = await getAllTopics();
  await mainWindow.webContents.send("return:topicToDelete", stateTopics);
  /* await readAllTopics(); */
});

//ICP PER OPZIONI
//icp che restituisce tutti le opt.
//viene letta dal reducers options
ipcMain.on("send:getOptions", async (event, args) => {
  console.log("argomenti di send:getOptions", args);
  const stateOptions = await getAllOptions();

  await mainWindow.webContents.send("return:getOptions", stateOptions);
  /* await readAllTopics(); */
});
