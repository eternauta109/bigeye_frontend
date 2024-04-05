export const initialUser = {
  managersName: [],
  user: {
    userName: null,
    role: null,
    notification: [],
    password: null,
    isAuth: false,
    id: null,
  },
};

//funzione che va gestire la cancellazione di una notifica dall array notify
// nel db managers
export const deleteNotifyFromDb = async (notifyId, userName) => {
  console.log(
    "sono in userReducer e sto cancelladno una notifica",
    notifyId,
    userName
  );
  if (process.env.NODE_ENV === "development") {
    return [{ notify: "ritorno", see: true, id: "id di ritorno" }];
  } else {
    return new Promise((resolve, reject) => {
      const { ipcRenderer } = window.require("electron");
      try {
        ipcRenderer.send("send:notifyToDelete", { notifyId, userName });
        ipcRenderer.on("return:notifyToDelete", (e, args) => {
          console.log("return:notifyToDelete da user reducers", args);
          resolve(args);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};

//funzione che restiruisce un oggetto manager/user con tutti i nomi dei colleghi
// se si è in produzione eseguo icp per restituire i valori da db managers.
//Altrimenti restituisco oggetto di default
export const loginUser = async (userName, password) => {
  if (process.env.NODE_ENV === "development") {
    console.log("login user function mod dev", userName, password);
    // Simulazione autenticazione in modalità di sviluppo
    const eventoFittizio = {
      user: {
        userName: "fabioc",
        password: "109",
        isAuth: true,
        role: "tm",
        cinema: "guidonia",
        notification: [
          {
            notify: `uno ha creato un nuovo un coso con titolo stocazzo `,
            see: false,
            id: "obj1",
          },
          {
            notify: `uno ha creato un nuovo un coso con titolo stocazzo `,
            see: false,
            id: "obj2",
          },
        ],
        id: "guiman1",
      },
      managersName: [
        "fabioc",
        "robertodTest",
        "carlosTest",
        "marapTest",
        "valentinaoTest",
      ],
    };
    console.log("fake user from userLogin in dev mode...", eventoFittizio);
    return eventoFittizio;
  } else if (window.require) {
    // Autenticazione tramite ipcRenderer in modalità di produzione
    const { ipcRenderer } = window.require("electron");
    return new Promise((resolve, reject) => {
      try {
        console.log("User nam e e pawss:", userName, password);
        ipcRenderer.send("login", { userName, password });
        ipcRenderer.on("returnManager", (event, args) => {
          if (args) {
            const manager = { ...args.managerFound, isAuth: true };
            console.log("ipc userReducer ritorna..", manager);

            resolve({ user: manager, managersName: args.managersName });
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
      return action.payload;
    case "SET_NOTIFICATION":
      console.log("SET_NOTIFICATION", action.payload);

      return {
        ...state,
        user: { ...state.user, notification: [...action.payload] },
      };
    default:
      throw new Error(`Azione non gestita: ${action.type}`);
  }
};

export default userReducer;
