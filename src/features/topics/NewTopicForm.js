import React, { useState, useEffect, useMemo } from "react";

import useEventsStore from "../../store/EventDataContext";
import {
  FormControl,
  Container,
  TextField,
  Button,
  Slider,
} from "@mui/material";

const NewTopicForm = ({ manager, onHandleClose }) => {
  const { addTask, totalTask, emptyTask, } = useEventsStore();
  const [newTask, setNewTask] = useState({ ...emptyTask });

  const handleSubmit = (event) => {

 

  };
  console.log("Form submitted!", newTask, manager);

  useMemo(() => {
    console.log("new task in use memo", newTask)
    return () => {
      setNewTask({ ...emptyTask });
    };

  }, [newTask])
  return (
    <Container
      sx={{
        height: "400px",
        padding: 2,

        mb: 2,
        overflowY: "auto",
      }}


    >
      {newTask && <form onSubmit={handleSubmit}>
        <FormControl fullWidth>

          <TextField
            fullWidth
            variant="filled"
            disabled
            value={`new task for:  ${manager}`}
            name="task for"
            onChange={(t) => setNewTask({ ...newTask, title: t.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="title"
            variant="outlined"
            value={newTask ? newTask.title : ""}
            name="title"
            onChange={(t) => setNewTask({ ...newTask, title: t.target.value })}
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
            onChange={(t) => setNewTask({ ...newTask, description: t.target.value })}
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
          <Button fullWidth variant="outlined" type="submit" color="secondary">
            ADD TASK
          </Button>
        </FormControl>
      </form>}
    </Container>
  );
};

export default NewTopicForm;
