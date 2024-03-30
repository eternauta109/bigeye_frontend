import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Switch, Select, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

import {
  addNewTopic,
  deleteTopicFromDb,
  getTopics,
} from "../../store/topicsReducer";

import useEventsStore from "../../store/EventDataContext";

import ManagerCheckbox from "./ManagerCheckBox";

// qui creo la struttura delle selct
const topicTypes = [
  { value: "none", label: "none" },
  { value: "cascading", label: "cascading" },
  { value: "suggest", label: "abitudini" },
  { value: "tutorial", label: "Tutorial" },
  { value: "procedur", label: "procedura interna" },
  { value: "brief", label: "brief" },
  { value: "internalComunication", label: "comunicazione da sede" },
];

const docTypes = [
  { value: "none", label: "none" },
  { value: "presentazione", label: "presentazione" },
  { value: "pdf", label: "pdf" },
  { value: "office", label: "office" },
];

const priorityTypes = [
  { value: "none", label: "none" },
  { value: "high", label: "high" },
  { value: "low", label: "low" },
  { value: "medium", label: "medium" },
];

const officeTypes = [
  { value: "none", label: "none" },
  { value: "marketing", label: "marketing" },
  { value: "hr", label: "hr" },
  { value: "operations", label: "operations" },
  { value: "pricing", label: "pricing" },
  { value: "filmcontent", label: "Film Content" },
  { value: "it", label: "it" },
  { value: "finance", label: "finance" },
];

function EditToolbar(props) {
  const { setRowModesModel } = props;
  const { totalTopics, emptyTopic, addTopic, user, setTopics } =
    useEventsStore();

  const handleClick = async (e) => {
    console.log("inserisco nuovo topic vuoto", totalTopics);
    e.preventDefault();
    const id = totalTopics;
    console.log("id con new topic: ", id);
    const newTopic = { ...emptyTopic, id, createdBy: user.user.userName };
    if (process.env.NODE_ENV === "development") {
      addTopic(newTopic);
    } else {
      const newTopicsAfterAddTopic = await addNewTopic(newTopic, totalTopics);

      console.log("added topic in DB: ", newTopicsAfterAddTopic);
      setTopics(newTopicsAfterAddTopic);
      /* const getTopicsFromDB = await getTopics();
      console.log("getTopicsFromDb result:", getTopicsFromDB);
      setTopics(getTopicsFromDB); */
    }

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "topicType" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={(e) => handleClick(e)}
      >
        Add Topic
      </Button>
    </GridToolbarContainer>
  );
}

const Topics = () => {
  const { topics, upDateTopic, deleteTopic, setTopics, user, totalTopics } =
    useEventsStore();

  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    console.log("che succede", id, rowModesModel);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    if (process.env.NODE_ENV === "development") {
      deleteTopic(id);
    } else {
      console.log("cancello un topic", id);
      const topicsAfterDelete = await deleteTopicFromDb({ topicId: id });
      setTopics(topicsAfterDelete);
    }
  };

  const handleCancelClick = (id) => async () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = async (newRow) => {
    console.log("processRowUpDate", newRow);
    const updatedRow = { ...newRow, isNew: false };
    upDateTopic(updatedRow, newRow.id);
    await addNewTopic(updatedRow);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // Funzione per gestire l'evento di cambio di stato dei checkbox
  const handleCheckboxChange = (rowId, managerName) => {
    // Troviamo la riga corrispondente a rowId
    const updatedRow = topics.find((row) => row.id === rowId);

    if (updatedRow) {
      const updatedManagers = updatedRow.managers.includes(managerName)
        ? updatedRow.managers.filter((manager) => manager !== managerName)
        : [...updatedRow.managers, managerName];
      const upTopic = { ...updatedRow, managers: updatedManagers };
      // Aggiorna lo stato dell'elemento con la funzione upDateTopic
      upDateTopic(upTopic, rowId);
      return upTopic;
    }
  };

  // COLUMNS ================================================
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "dateStart",
      headerName: "data",
      type: "date",
      width: 90,
      editable: true,
    },

    {
      field: "topicType",
      headerName: "topic type",
      type: "singleSelect",
      valueOptions: topicTypes,
      width: 110,
      editable: true,
    },
    {
      field: "topicArgument",
      headerName: "argomento",
      width: 420,
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
      type: "number",
      width: 110,
      editable: true,
      type: "singleSelect",
      valueOptions: officeTypes,
    },

    {
      field: "typeDocument",
      headerName: "documento",
      //type: 'number',
      width: 110,
      editable: true,
      type: "singleSelect",
      valueOptions: docTypes,
    },

    {
      field: "priority",
      headerName: "priorità",
      //type: 'number',
      width: 110,
      editable: true,
      type: "singleSelect",
      valueOptions: priorityTypes,
    },
    {
      field: "link",
      headerName: "link",
      //type: 'number',
      width: 110,
      editable: true,
    },

    ...user.managersName.map((manager, index) => ({
      field: manager,
      headerName: manager,
      width: 60,
      renderCell: (params) => (
        console.log(params.row.managers.includes(manager)),
        (
          <ManagerCheckbox
            row={params.row}
            manager={manager}
            onCheckboxChange={(managerName) =>
              handleCheckboxChange(params.row.id, managerName)
            }
          />
        )
      ),
    })),

    {
      field: "tmVeto",
      headerName: "Tm Veto",
      renderCell: (params) => (
        <Switch
          checked={params.row.tmVeto}
          onChange={(e) => {
            console.log("switch", params.row);
            const newVetoState = { ...params.row, tmVeto: e.target.checked };
            upDateTopic(newVetoState, params.row.id);
          }}
        />
      ),
    },

    {
      field: "note",
      headerName: "note",
      //type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    ,
  ];

  //funzione asincrona che prende i topics dal db con una funzione
  // sotto topicsReducer attenzione ch in modalita dev
  //topics si azzera a ogni ricarica della pagina
  const getTopicsFromDb = async () => {
    console.log("getTopicsFromDb triggerato");
    await getTopics(topics, totalTopics).then((args) => {
      /*  for (const element in args.topics) {
        console.log("element: ", element);
      } */
      console.log("getTopicsFromDb result:", args);
      setTopics(args);
    });
  };

  useMemo(() => {
    console.log("usememo di topics", topics, rowModesModel);
    getTopicsFromDb();
  }, []);

  return (
    <Box
      sx={{
        height: 800,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={topics}
        columns={columns}
        editMode="row"
        onProcessRowUpdateError={(error) =>
          console.error("Errore durante l'aggiornamento della riga:", error)
        }
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        getRowHeight={() => "auto"}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRowModesModel },
        }}
      />
    </Box>
  );
};

export default Topics;
