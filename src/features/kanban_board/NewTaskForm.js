import React, { useState, useEffect } from "react";

import useEventsStore from "../../store/EventDataContext";
import {
  FormControl,
  Container,
  TextField,
  FormLabel,
  FormHelperText,
} from "@mui/material";

const NewTaskForm = ({ onHandleClose }) => {
  const { addTask, totalTask, initialTask } = useEventsStore();
  const [newTask, setNewTask] = useState({ initialTask });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aggiungi qui la logica per gestire il submit del form
    console.log("Form submitted!");
  };

  return (
    <Container
      sx={{
        height: "400px",
        padding: 2,

        mb: 2,
        overflowY: "auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            fullWidth
            label="title"
            variant="outlined"
            value={""}
            name="title"
            sx={{ mb: 2 }}
          />
        </FormControl>
      </form>
    </Container>
  );
};

export default NewTaskForm;
