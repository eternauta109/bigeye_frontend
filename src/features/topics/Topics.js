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

const managers = cinemaDB[11].managers;

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "dateCreation", headerName: "data", width: 90 },

  {
    field: "argomento",
    headerName: "argomento",
    width: 150,
    editable: true,
  },
  {
    field: "tipologia",
    headerName: "tipologia",
    //type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: "ufficio",
    headerName: "ufficio",
    //type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: "priorità",
    headerName: "priorità",
    //type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: "link",
    headerName: "link",
    //type: 'number',
    width: 110,
    editable: true,
  },
  ...managers.map((manager, index) => ({
    field: manager.name,
    headerName: manager.name,
    width: 60,
    renderCell: (params) => (
      <ManagerCheckbox {...params} manager={manager.name} />
    ),
  })),

  {
    field: "note",
    headerName: "note",
    //type: 'number',
    width: 110,
    editable: true,
  },
];

const ManagerCheckbox = ({ row, manager }) => {
  console.log("QUUIII", row, manager);

  return <FormControlLabel control={<Checkbox />} label={null} />;
  {
    /*
        const isChecked = row.managers.includes(manager);
  
    console.log("QUUIII", row,manager)
    const handleChange = () => {
      // Aggiungi o rimuovi il manager dalla lista dei manager della riga
      const updatedManagers = isChecked
        ? row.manager.filter((m) => m !== manager)
        : [...row.manager, manager];
  
      // Chiamata a una funzione per aggiornare la riga con i nuovi manager selezionati
      // Qui devi inserire la tua logica per l'aggiornamento dei dati
    };
  
    return (
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleChange} />}
        label={null}
      />
    );*/
  }
};

console.log(managers);
console.log("topics");

const Topics = () => {
  const { addTopic, totalTopics, emptyTopic, topics } = useEventsStore();
  const [newTopic, setNewTopic] = useState({ ...emptyTopic });

  /*  useEffect(() => {
    console.log(newTopic);

    return () => {};
  }, []); */

  const handleAddRow = () => {
    console.log("nuova topic da inserire", newTopic, totalTopicsd);
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
    </Box>
  );
};

export default Topics;
