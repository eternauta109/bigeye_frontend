export const initialTopic = {
  totalTopics: 0,
  topics: [],
  newTopic: {
    id: null,
    dateStart: new Date(),
    topicArgument: "",
    typeDocument: "",
    topicType: "",
    office: "",
    priority: "",
    link: "",
    note: "",
    managers: [],
    tmVeto: false,
    isNew: true,
  },
};

const topicReducer = (state, action) => {
  const { type } = action;
  console.log("action", action);
  switch (type) {
    case "ADD_TOPIC":
      /* console.log("ADD_EVENT", payload); */
      console.log("add topic in reducer", action);

      return {
        ...state,
        topics: [...state.topics, action.payload.topic],
        totalTopics: state.totalTopics + 1,
      };
    case "UPDATE_TOPIC":
      const { payload } = action;
      console.log("UPDATE_EVENT", state.topics, payload);
      const topicIndex = state.topics.findIndex(
        (topic) => topic.id === payload.id
      );
      const updatedTopic = { ...state.topics[topicIndex], ...payload.topic };
      const updatedTopics = [...state.topics];
      updatedTopics[topicIndex] = updatedTopic;
      return { ...state, topics: updatedTopics };

    case "DELETE_TOPIC":
      return {
        ...state,
        topics: state.topics.filter((topic) => topic.id !== action.payload.id),
      };

    default:
      throw new Error("no case for type", type);
  }
};

export default topicReducer;
