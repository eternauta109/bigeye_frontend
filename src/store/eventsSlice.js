// itemSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialEvent = {
  id: null,
  color: null,
  description: "",
  division: null,
  start: "2024-03-11T09:21:17.084Z",
  end: "2024-03-11T09:21:17.084Z",
  link: null,
  note: "",
  title: "",
  manager: "",
  laneId: "lane1",
};

const eventsSlice = createSlice({
  name: "events",
  initialState: [],
  reducers: {
    addEvents: (state, action) => {
      console.log(state);
      state.push(action.payload);
    },
    removeEvents: (state, action) => {
      state = state.filter((item) => item.id !== action.payload);
    },
    updateEvents: (state, action) => {
      const { id, ...updatedEvents } = action.payload;
      const index = state.findIndex((item) => item.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedEvents };
      }
    },
  },
});

export const { addEvents, removeEvents, updateEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
