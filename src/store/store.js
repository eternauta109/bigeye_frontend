import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./eventsSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    user: userReducer,
  },
});
