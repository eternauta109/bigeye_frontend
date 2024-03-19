import { createContext, useReducer, useContext } from "react";
import eventsReducer, { initialEvents } from "./eventsReducer";
import taskReducer, { initialTask } from "./taskReducer";
import topicsReducer, { initialTopic } from "./topicsReducer";

export const initialDataContext = {
  events: initialEvents,
  tasks: initialTask,
  topics: initialTopic,
};

export const EventDataContext = createContext(initialDataContext);

export const EventStoreContext = ({ children }) => {
  const [eventState, deispatchEvent] = useReducer(eventsReducer, initialEvents);
  const [taskState, taskDispatch] = useReducer(taskReducer, initialTask);
  const [topicState, topicDispatch] = useReducer(topicsReducer, initialTopic);

  //Topic ACTION

  const addTopic = (topic) => {
    console.log("add topic in reducer", topic);
    const newTopics = topicState.topics.concat(topic);
    topicDispatch({
      type: "ADD_TOPIC",
      payload: { topics: newTopics },
    });
  };

  const upDateTopic = (topic, id) => {
    console.log(topic, id);
    let updateTopics = topicState.topics;
    console.log("updateTopics", updateTopics);
    let updateTopic = topicState.topics.findIndex((e) => e.id === id);
    console.log("indice topic update", updateTopic);
    updateTopics[updateTopic] = topic;
    console.log("aggiornato", updateTopics);
    topicDispatch({
      type: "UPDATE_TOPIC",
      payload: { topics: updateTopics },
    });
  };

  //Action EVENT

  const addEvent = (event) => {
    const updateEvents = eventState.events.concat(event);
    deispatchEvent({
      type: "ADD_EVENT",
      payload: { events: updateEvents },
    });
  };

  const setEventType = (eventType) => {
    deispatchEvent({
      type: "SET_EVENT_TYPE",
      payload: eventType,
    });
  };

  const addTitleInEvent = (title) => {
    deispatchEvent({
      type: "INSERT_TITLE",
      payload: title,
    });
  };

  const addDescriptionInEvent = (descr) => {
    deispatchEvent({
      type: "INSERT_DESCRIPTION",
      payload: descr,
    });
  };

  const upDateEvent = (event, id) => {
    let updateEvents = eventState.events;
    let updateEvent = eventState.events.findIndex((e) => e.id === id);
    updateEvents[updateEvent] = event;
    deispatchEvent({
      type: "UPDATE_EVENT",
      payload: { events: updateEvents },
    });
  };

  const setDate = (range) => {
    deispatchEvent({
      type: "SET_DATE",
      payload: range,
    });
  };

  const setDivision = (division) => {
    deispatchEvent({
      type: "SET_DIVISION",
      payload: division,
    });
  };

  const setManager = (manager) => {
    deispatchEvent({
      type: "SET_MANAGER",
      payload: manager,
    });
  };

  const addLink = (link) => {
    deispatchEvent({
      type: "INSERT_LINK",
      payload: link,
    });
  };

  const addNote = (note) => {
    deispatchEvent({
      type: "INSERT_NOTE",
      payload: note,
    });
  };

  const setEvent = (event) => {
    deispatchEvent({
      type: "SET_EVENT",
      payload: event,
    });
  };

  const initEvent = () => {
    deispatchEvent({
      type: "INIT_EVENT",
    });
  };

  const getEvents = () => {
    deispatchEvent({
      type: "GET_EVENTS",
    });
  };

  //Azioni TASK ############################

  const addTask = (task) => {
    const newTasks = taskState.tasks.concat(task);
    taskDispatch({
      type: "ADD_TASK",
      payload: { tasks: newTasks },
    });
  };

  const getTasks = () => {
    taskDispatch({
      type: "GET_TASKS",
    });
  };

  const upDateTask = (task, id) => {
    let updateTasks = taskState.tasks;
    let updateTask = taskState.tasks.findIndex((e) => e.id === id);
    updateTasks[updateTask] = task;
    taskDispatch({
      type: "UPDATE_TASK",
      payload: { tasks: updateTasks },
    });
  };

  const value = {
    //TOPICS
    totalTopics: topicState.totalTopics,
    emptyTopic: initialTopic.newTopic,
    topics: topicState.topics,
    addTopic,
    upDateTopic,

    //EVENT

    totalEvent: eventState.totalEvents,
    events: eventState.events,
    event: eventState.newEvent,
    addEvent,
    setEventType,
    setManager,
    upDateEvent,
    addTitleInEvent,
    addDescriptionInEvent,
    getEvents,
    initEvent,
    addLink,
    setDate,
    setEvent,
    addNote,
    setDivision,

    //TASK

    tasks: taskState.tasks,
    totalTask: taskState.totalTask,
    emptyTask: initialTask.newTask,
    initialTask,
    addTask,
    getTasks,
    upDateTask,
  };
  return (
    <EventDataContext.Provider value={value}>
      {children}
    </EventDataContext.Provider>
  );
};

const useEventsStore = () => {
  const context = useContext(EventDataContext);
  if (context === undefined) {
    throw new Error("useData must be used with DataContext");
  }
  return context;
};

export default useEventsStore;
