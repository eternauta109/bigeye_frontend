export const initialUser = {
  userName: null,
  password: null,
  isAuth: false,
};

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
