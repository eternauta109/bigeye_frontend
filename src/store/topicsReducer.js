export const initialTopic = {
  totalTopics: 0,
  topics: [],
  newTopic: {
    id: null,
    date: new Date(),
    topicArgument: [],
    typeDocument: "",
    topicType: "",
    office: "",
    priority: "",
    link: "",
    note: "",
    managers: [],
  },
};

const topicReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TOPIC":
      /* console.log("ADD_EVENT", payload); */
      return {
        ...state,
        topics: payload.topics,
        totalTopics: state.totalTopics + 1,
      };
    case "UPDATE_TOPIC":
      /* console.log("UPDATE_EVENT", payload); */
      return { ...state, topics: payload.topics };

    default:
      throw new Error("no case for type", type);
  }
};

export default topicReducer;
