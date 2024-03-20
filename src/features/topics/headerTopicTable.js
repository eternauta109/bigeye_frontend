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
    width: 220,
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
