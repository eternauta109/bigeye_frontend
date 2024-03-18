import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useEventsStore from "../../store/EventDataContext";
import { cinemaDB } from "../../database/cinemaDB";
import {columns} from "./headerTopicTable"

const managers = cinemaDB[11].managers;

console.log(managers);


const Topics = () => {
  const { addTopic, totalTopics, emptyTopic, topics } = useEventsStore();
  const [newTopic, setNewTopic] = useState({ ...emptyTopic });
  const { tasks, upDateTask } = useEventsStore();
  const [openNewTask, setOpenNewTask] = useState(false);

   useEffect(() => {
    console.log("topics da useeffect",topics);

    return () => {};
  }, []); 

  const handleAddRow = () => {
    console.log("nuova topic da inserire", newTopic, totalTopics);
    const sendNewTopic = {
      ...newTopic,
      id: totalTopics,
    };
    addTopic(sendNewTopic); // Aggiungi la nuova riga ai dati della tabella
    setNewTopic({ ...emptyTopic }); // Reimposta il nuovo argomento dopo l'aggiunta
  };

  return (
    <Box sx={{ height: 700, width: "100%" }}>
      <Button
        onClick={handleAddRow}
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
      >
        Aggiungi
      </Button>
      {managers.length > 1 ? (
        <DataGrid
          rows={topics}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
          
        />
      ) : (
        <Box>carico</Box>
      )}
      <Modal
        open={open}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewTaskForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default Topics;
