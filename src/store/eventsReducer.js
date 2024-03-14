export const initialEvents = {
  totalEvents: 0,
  events: [],
  newEvent: {
    id: null,
    color: null,
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
        totalEvent: state.totalEvent + 1,
      };
    case "UPDATE_EVENT":
      /* console.log("UPDATE_EVENT", payload); */
      return { ...state, events: payload.events };
    case "GET_EVENTS":
      /* console.log("GET_EVENTS", payload); */
      return { ...state, events: payload.events };
    case "INSERT_TITLE":
      /*  console.log("insert title", payload); */
      return {
        ...state,
        newEvent: {
          ...state.newEvent,
          title: payload,
        },
      };
    case "INSERT_DESCRIPTION":
      /* console.log("INSERT_DESCRIPTION", payload); */
      return {
        ...state,
        newEvent: {
          ...state.newEvent,
          description: payload,
        },
      };
    case "SET_DATE":
      /*  console.log("SET_DATE", payload); */
      return {
        ...state,
        newEvent: {
          ...state.newEvent,
          start: payload.startDate,
          end: payload.endDate,
        },
      };

    case "SET_DIVISION":
      /* console.log("SET_DIVISION", payload); */
      return {
        ...state,
        newEvent: {
          ...state.newEvent,
          division: payload.division,
          color: payload.color,
        },
      };
    case "SET_MANAGER":
      /* console.log("SET_MANAGER", payload); */
      return {
        ...state,
        newEvent: {
          ...state.newEvent,
          manager: payload,
        },
      };

    case "INSERT_LINK":
      /*  console.log("INSERT_LINK", payload); */
      return {
        ...state,
        newEvent: {
          ...state.newEvent,
          link: payload,
        },
      };

    case "INSERT_NOTE":
      /* console.log("INSERT_NOTE", payload); */
      return {
        ...state,
        newEvent: {
          ...state.newEvent,
          note: payload,
        },
      };

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
