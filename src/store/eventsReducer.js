export const initialEvents = {
  totalEvents: 0,
  events: [],
  newEvent: {
    id: null,
    eventType: "evento",
    colorDivision: null,
    colorEventType: "#F39C12",
    description: "",
    division: null,
    start: new Date(),
    end: new Date(),
    link: null,
    note: "",
    title: "",
    manager: "",
    laneId: "lane1",
  },
};

const eventsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_EVENT":
      /* console.log("ADD_EVENT", payload); */
      return {
        ...state,
        events: payload.events,
        totalEvents: state.totalEvents + 1,
      };
    case "UPDATE_EVENT":
      /* console.log("UPDATE_EVENT", payload); */
      return { ...state, events: payload.events };
    case "GET_EVENTS":
      /* console.log("GET_EVENTS", payload); */
      return { ...state, events: payload.events };

    case "SET_EVENT":
      /* console.log("payload SET_EVETN in reducer says:", payload); */
      return {
        ...state,
        newEvent: {
          ...payload,
        },
      };

    case "INIT_EVENT":
      console.log("INIT_EVENT");
      return {
        ...state,
        newEvent: {
          ...initialEvents.newEvent,
        },
      };

    default:
      throw new Error("no case for type", type);
  }
};

export default eventsReducer;
