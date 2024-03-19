import {
  Box,
  Typography,
  Button,
  Switch,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { cinemaDB } from "../../database/cinemaDB";
const managers = cinemaDB[11].managers;

export const columnsBase = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "dataStart",
    headerName: "data",
    type: "date",
    width: 90,
    editable: true,
  },
  {
    field: "topycType",
    headerName: "topic type",
    //type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: "topicArgument",
    headerName: "argomento",
    width: 150,
    editable: true,
    renderCell: (params) => (
      <Typography
        variant="body2"
        sx={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
      >
        {params.value}
      </Typography>
    ),
  },

  {
    field: "office",
    headerName: "office",
    //type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: "typeDocument",
    headerName: "documento",
    //type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: "priority",
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
    field: "tmVeto",
    headerName: "Tm Veto",
    renderCell: (params) => <Switch />,
  },

  {
    field: "note",
    headerName: "note",
    //type: 'number',
    width: 110,
    editable: true,
  },
];

const ManagerCheckbox = ({ row, manager }) => {
  /* console.log("QUUIII", row, manager); */

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
