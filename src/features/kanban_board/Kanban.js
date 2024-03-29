import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Card } from "@mui/material";
import Board from "react-trello";
import useEventsStore from "../.././store/EventDataContext";
import TaskModal from "./TaskModal";
import CustomCard from "./CustomCard";

import { getTasks, addNewTask } from "../../store/taskReducer";

const dataInit = {
  lanes: [
    // Lascia le tue lane iniziali vuote o come preferisci
  ],
};

const styleLane = {
  width: 270,
  overflowY: "auto",
  backgroundColor: "#B39DDB",
  color: "#fff",
  color: "#fff",
  boxShadow: "2px 2px 4px 0px rgba(0,0,0,0.75)",
};

const Kanban = () => {
  const { tasks, upDateTask, user, setTasks, totalTask } = useEventsStore();
  const [openNewTask, setOpenNewTask] = useState(false);
  const [selectedManager, setSelectedManager] = useState();

  const handleOpenNewTask = () => setOpenNewTask(true);
  const handleCloseNewTask = () => setOpenNewTask(false);

  const [managerData, setManagerData] = useState([]);

  const onhandleDragEnd = async (cardId, sourceLaneId, targetLaneId) => {
    const sourceManager = sourceLaneId.split("-")[1];
    const targetManager = targetLaneId.split("-")[1];
    console.log("spostamenti di lane", sourceManager, targetManager);

    const finder = tasks.find((task) => task.id === cardId);

    if (sourceManager !== targetManager) {
      const newTask = {
        ...finder,
        laneId: targetLaneId,
        manager: targetManager,
      };
      upDateTask(newTask, cardId);
      await addNewTask(newTask, cardId);
    } else {
      const newTask = { ...finder, laneId: targetLaneId };
      upDateTask(newTask, cardId);
      await addNewTask(newTask, cardId);
    }
  };

  //funzione asincrona che prende i task dal db con una funzione
  // sotto taskReducer attenzione ch ein modalita dev
  //task si azzera a ogni ricarica della pagina
  const getTasksFromDb = async () => {
    console.log("getTasksFromDb triggerato");
    await getTasks().then((args) => setTasks(args));
  };

  useEffect(() => {
    getTasksFromDb();

    return () => {};
  }, [tasks.lenght]);

  useEffect(() => {
    const updatedManagerData = user?.managersName.map((manager) => ({
      manager: manager,
      data: {
        lanes: [
          {
            id: `lane-${manager}`,
            title: "to do task",
            label: "",
            style: {
              ...styleLane,
              backgroundColor: "#B39DDB",
            },
            cards: tasks.filter(
              (task) =>
                task.manager === manager && task.laneId === `lane-${manager}`
            ),
          },
          {
            id: `lane-${manager}-in-progress`,
            title: "in progress",
            label: "",
            style: {
              ...styleLane,
              backgroundColor: "#F9A825",
            },

            cards: tasks.filter(
              (task) =>
                task.manager === manager &&
                task.laneId === `lane-${manager}-in-progress`
            ),
          },
          {
            id: `lane-${manager}-completed`,
            title: "Completed",
            label: "",

            style: {
              ...styleLane,
              backgroundColor: "#689F38",
            },
            cards: tasks.filter(
              (task) =>
                task.manager === manager &&
                task.laneId === `lane-${manager}-completed`
            ),
          },
          {
            id: `lane-${manager}-blocked`,
            title: "Blocked",
            label: "",
            style: {
              ...styleLane,
              backgroundColor: "#9E9E9E",
            },

            cards: tasks.filter(
              (task) =>
                task.manager === manager &&
                task.laneId === `lane-${manager}-blocked`
            ),
          },
        ],
      },
    }));
    console.log("mappa lane da kanban", updatedManagerData);
    setManagerData(updatedManagerData);
  }, [tasks.lenght]);

  return (
    <Container>
      {managerData.map(({ manager, data }) => (
        <Box key={manager} sx={{ mt: "30px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              border: "2px dashed grey",
            }}
          >
            <Typography>{manager}</Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: "50%",
                backgroundColor: "orange",
                color: "white",
              }}
              onClick={() => {
                setSelectedManager(manager);
                handleOpenNewTask();
              }}
            >
              +
            </Button>
          </Box>
          <Board
            style={{ height: "500px", marginTop: "20px" }}
            data={data} // Passa direttamente l'oggetto data
            handleDragEnd={onhandleDragEnd}
          />
        </Box>
      ))}
      <TaskModal
        manager={selectedManager}
        open={openNewTask}
        handleClose={handleCloseNewTask}
      />
    </Container>
  );
};

export default Kanban;
