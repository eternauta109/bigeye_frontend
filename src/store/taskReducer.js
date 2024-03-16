export const initialTask = {
  totalTask: 0,
  tasks: [],
  newTask: {
    id: null,
    colorType: "#F39C12",
    description: "",
    start: new Date(),
    end: new Date(),
    note: "",
    title: "",
    manager: "",
    laneId: null,
  },
};

const taskReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TASK":
      /* console.log("ADD_EVENT", payload); */
      return {
        ...state,
        tasks: payload.tasks,
        totalTask: state.totalTask + 1,
      };
    case "UPDATE_TASK":
      /* console.log("UPDATE_EVENT", payload); */
      return { ...state, tasks: payload.tasks };
    case "GET_TASK":
      /* console.log("GET_EVENTS", payload); */
      return { ...state, tasks: payload.tasks };

    default:
      throw new Error("no case for type", type);
  }
};

export default taskReducer;
