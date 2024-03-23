import { createContext, useReducer, useContext } from "react";
import eventsReducer, { initialEvents } from "./eventsReducer";
import taskReducer, { initialTask } from "./taskReducer";
import topicsReducer, { initialTopic } from "./topicsReducer";
import userReducer, { initialUser } from "./userReducer";

export const initialDataContext = {
  events: initialEvents,
  tasks: initialTask,
  topics: initialTopic,
  user: initialUser,
};

export const EventDataContext = createContext(initialDataContext);

export const EventStoreContext = ({ children }) => {
  const [eventState, deispatchEvent] = useReducer(eventsReducer, initialEvents);
  const [taskState, taskDispatch] = useReducer(taskReducer, initialTask);
  const [topicState, topicDispatch] = useReducer(topicsReducer, initialTopic);
  const [userState, userDispatch] = useReducer(userReducer, initialUser);

  //USER ACTION
  const setUser = (user) => {
    userDispatch({
      type: "SET_USER",
      payload: { user },
    });
  };

  //Topic ACTION

  const addTopic = (topic) => {
    topicDispatch({
      type: "ADD_TOPIC",
      payload: { topic },
    });
  };

  const upDateTopic = (topic, id) => {
    topicDispatch({
      type: "UPDATE_TOPIC",
      payload: { topic, id },
    });
  };

  const deleteTopic = (id) => {
    topicDispatch({
      type: "DELETE_TOPIC",
      payload: { id },
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

  const upDateEvent = (event, id) => {
    let updateEvents = eventState.events;
    let updateEvent = eventState.events.findIndex((e) => e.id === id);
    updateEvents[updateEvent] = event;
    deispatchEvent({
      type: "UPDATE_EVENT",
      payload: { events: updateEvents },
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

  const setEvent = (event) => {
    deispatchEvent({
      type: "SET_EVENT",
      payload: event,
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
    //USER
    user: userState,
    setUser,

    //TOPICS
    totalTopics: topicState.totalTopics,
    emptyTopic: initialTopic.newTopic,
    topics: topicState.topics,
    addTopic,
    upDateTopic,
    deleteTopic,

    //EVENT

    totalEvent: eventState.totalEvents,
    events: eventState.events,
    eventToUpdate: eventState.newEvent,
    emptyEvent: initialEvents.newEvent,
    addEvent,
    upDateEvent,
    getEvents,
    initEvent,
    setEvent,

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
