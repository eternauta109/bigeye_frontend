const { ipcRenderer } = window.require("electron");

export const initialUser = null;

const userReducer = (state, action) => {
  const { type, payload } = action;
  console.log("userReducer", type, payload.userName, payload.password);
  switch (type) {
    case "SET_USER":
      /* console.log("ADD_EVENT", payload); */
      // Ottieni il manager corrispondente alle credenziali
      let manager = null;
      ipcRenderer.send("login", {
        userName: payload.userName,
        password: payload.password,
      });

      ipcRenderer.on("returnManager", (event, returnManager) => {
        console.log("inizia un era", returnManager);

        //se return Manager torna non vuoto setto il manager nello store
        if (returnManager) {
          manager = { ...returnManager, isAuth: true };
          console.log(
            "User authenticated. Redirecting to calendar...",
            manager
          );
        } else {
          return console.log("credenziali non corrette");
        }
      });
      return {
        user: manager,
      };

    default:
      throw new Error("no case for type", type);
  }
};

export default userReducer;
