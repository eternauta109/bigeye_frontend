import { createContext, useReducer, useContext } from "react";
import eventsReducer, { initialEvents } from "./eventsReducer";
import taskReducer, { initialTask } from "./taskReducer";

export const initialDataContext = {
  events: initialEvents,
  tasks: initialTask,
};

export const EventDataContext = createContext(initialDataContext);

export const EventStoreContext = ({ children }) => {
  const [eventState, deispatchEvent] = useReducer(eventsReducer, initialEvents);
  const [taskState, taskDispatch] = useReducer(taskReducer, initialTask);

  const addEvent = (event) => {
    const updateEvents = eventState.events.concat(event);
    deispatchEvent({
      type: "ADD_EVENT",
      payload: { events: updateEvents },
    });
  };

  const addTask = (task) => {
    const newTask = taskState.tasks.concat(task);
    taskDispatch({
      type: "ADD_EVENT",
      payload: { events: newTask },
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

  const value = {
    totalEvent: eventState.totalEvent,
    events: eventState.events,
    event: eventState.newEvent,
    tasks: taskState.tasks,
    totalTask: taskState.totalTask,
    task: taskState.newTask,
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
    addTask,
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
