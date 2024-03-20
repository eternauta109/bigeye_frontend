import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Switch } from "@mui/material";
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

import useEventsStore from "../../store/EventDataContext";
import { columnsBase } from "./headerTopicTable";
import ManagerCheckbox from "./ManagerCheckBox";

import { cinemaDB } from "../../database/cinemaDB";
const managers = cinemaDB[11].managers;

function EditToolbar(props) {
  const { setRowModesModel } = props;
  const { topics, totalTopics, emptyTopic, updateTopic, addTopic } =
    useEventsStore();

  const handleClick = () => {
    const id = totalTopics;
    console.log("id con new topic: " + id);
    const newTopic = { ...emptyTopic, id };
    addTopic(newTopic);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "topicType" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Topic
      </Button>
    </GridToolbarContainer>
  );
}

const Topics = () => {
  const { topics, totalTopics, emptyTopic, upDateTopic, deleteTopic } =
    useEventsStore();

  const [rowModesModel, setRowModesModel] = React.useState({});

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

  const handleDeleteClick = (id) => () => {
    deleteTopic(id);
    /* setRows(rows.filter((row) => row.id !== id)); */
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow) => {
    console.log("processRowUpDate", newRow);
    const updatedRow = { ...newRow, isNew: false };
    upDateTopic(updatedRow, newRow.id);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // Funzione per gestire l'evento di cambio di stato dei checkbox
  const handleCheckboxChange = (rowId, managerName) => {
    // Troviamo la riga corrispondente a rowId
    const updatedRows = topics.map((row) => {
      if (row.id === rowId) {
        console.log("handle chek", rowId, managerName, row);
        // Aggiorniamo lo stato dei checkbox associato al manager
        return {
          ...row,
          managers: topics[row.id].managers.includes(managerName)
            ? topics[row.id].managers.filter(
                (manager) => manager !== managerName
              )
            : [...topics[row.id].managers, managerName],
        };
      }
      return row;
    });
  };

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
        /* console.log(params), */
        <ManagerCheckbox
          row={params.row}
          manager={manager.name}
          onCheckboxChange={(managerName) =>
            handleCheckboxChange(params.row.id, managerName)
          }
        />
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
  ];

  useMemo(() => {
    console.log("usememo di topics", topics, rowModesModel);

    return () => {};
  }, [topics]);

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
        /* getRowId={(row) => {
          console.log("getRawId", row.id);
          row?.id;
        }} */
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
