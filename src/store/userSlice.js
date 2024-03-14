import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Funzione asincrona che rappresenta l'operazione di login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // Esegui la tua logica di login qui, ad esempio una chiamata API al tuo backend
      const response = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Errore durante il login");
      }

      const user = await response.json();

      // Restituisci i dati dell'utente per aggiornare lo stato
      return user;
    } catch (error) {
      // Gestisci gli errori e restituisci un payload per l'azione di fallimento
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Aggiungi i gestori delle azioni createAsyncThunk
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
