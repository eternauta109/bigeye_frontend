export const initialUser = {
  userName: null,
  password: null,
  isAuth: false,
};

//funzione che restistuisce un array con i nomi di tutti
// i managers. Se si è in produzione, faccio icp a electron
// per restituire i valori da db. altrimenti restituisco un array di defalt
export const getAllManagersName = async () => {
  if (process.env.NODE_ENV === "development") {
    const managers = [
      "fabiocTest",
      "robertodTest",
      "carlosTest",
      "marapTest",
      "valentinaoTest",
    ];
    return managers;
  } else {
    // siamo in modalita dist, quindi vado sul db gestito da electron
    //inizializzo icpRender
    console.log(
      "sono inn modalita dist e vado su electron a prendere i nnomi managers"
    );
    const { ipcRenderer } = window.require("electron");
    return new Promise((resolve, reject) => {
      try {
        ipcRenderer.send("send:managersName", "invio richiesta nomi managers");
        ipcRenderer.on("managersName", (event, managers) => {
          console.log("send:managers è arrivato su user reducer", managers);
          resolve(managers);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};

//funzione che restiruisce un oggetto manager/user
// se si è in produzione eseguo icp per restituire i valori da db managers.
//Altrimenti restituisco oggetto di default
export const loginUser = async (userName, password) => {
  if (process.env.NODE_ENV === "development") {
    console.log("login user function", userName, password);
    // Simulazione autenticazione in modalità di sviluppo
    const manager = {
      userName: "fabioc",
      password: "109",
      isAuth: true,
      role: "tm",
      cinema: "guidonia",
      notification: [],
    };
    console.log("User authenticated. Redirecting to calendar...", manager);
    return manager;
  } else if (window.require) {
    // Autenticazione tramite ipcRenderer in modalità di produzione
    const { ipcRenderer } = window.require("electron");
    return new Promise((resolve, reject) => {
      try {
        console.log("User nam e e pawss:", userName, password);
        ipcRenderer.send("login", { userName, password });
        ipcRenderer.on("returnManager", (event, returnManager) => {
          if (returnManager) {
            const manager = { ...returnManager, isAuth: true };
            console.log("ipc userReducer ritorna..", manager);

            resolve({ ...manager });
          } else {
            console.log("Credenziali non corrette");
            reject(new Error("Credenziali non corrette"));
          }
        });
      } catch (error) {
        console.error("Errore durante il login:", error);
        reject(error);
      }
    });
  }
};

const userReducer = (state, action) => {
  const { userName, password } = action.payload;
  console.log("userReducer action.paylod", action.payload);
  switch (action.type) {
    case "SET_USER":
      return { ...action.payload };
    default:
      throw new Error(`Azione non gestita: ${action.type}`);
  }
};

export default userReducer;
