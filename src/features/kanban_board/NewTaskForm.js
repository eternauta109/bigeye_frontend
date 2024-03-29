import React, { useState, useEffect, useMemo } from "react";

import useEventsStore from "../../store/EventDataContext";
import {
  FormControl,
  Container,
  TextField,
  Button,
  Slider,
} from "@mui/material";

import { addNewTask } from "../../store/taskReducer";

const NewTaskForm = ({ manager, onHandleClose }) => {
  const { addTask, totalTask, emptyTask, user } = useEventsStore();
  const [newTask, setNewTask] = useState({ ...emptyTask });
  console.log(user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aggiungi qui la logica per gestire il submit del form
    console.log("Form submitted!", newTask, totalTask);
    const sendNewTaskInStore = {
      ...newTask,
      manager: manager,
      createdBy: user.user.userName,
      start: new Date(),
      label: "task",
      laneId: `lane-${manager}`,
      id: "task" + totalTask,
    };
    addTask(sendNewTaskInStore);
    onHandleClose();
    await addNewTask(sendNewTaskInStore, totalTask);
  };
  console.log("Form submitted!", newTask, manager);

  /*  useMemo(() => {
    console.log("new task in use memo", newTask);
    return () => {
      setNewTask({ ...emptyTask });
    };
  }, [newTask]); */

  return (
    <Container
      sx={{
        height: "400px",
        padding: 2,

        mb: 2,
        overflowY: "auto",
      }}
    >
      {newTask && (
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              variant="filled"
              disabled
              value={`new task for:  ${manager}`}
              name="task for"
              onChange={(t) =>
                setNewTask({ ...newTask, title: t.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="title"
              variant="outlined"
              value={newTask ? newTask.title : ""}
              name="title"
              onChange={(t) =>
                setNewTask({ ...newTask, title: t.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="description"
              variant="outlined"
              multiline
              rows={4}
              value={newTask ? newTask.description : ""}
              name="description"
              onChange={(t) =>
                setNewTask({ ...newTask, description: t.target.value })
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="note"
              variant="outlined"
              value={newTask ? newTask.note : ""}
              name="note"
              onChange={(t) => setNewTask({ ...newTask, note: t.target.value })}
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="outlined"
              type="submit"
              color="secondary"
            >
              ADD TASK
            </Button>
          </FormControl>
        </form>
      )}
    </Container>
  );
};

export default NewTaskForm;
