import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import Board from "react-trello";
import useEventsStore from "../.././store/EventDataContext";
import { cinemaDB } from "../.././database/cinemaDB";
import CustomCard from "./CustomCard";

const dataInit = {
  lanes: [
    // Lascia le tue lane iniziali vuote o come preferisci
  ],
};

const Kanban = () => {
  const { events, upDateEvent } = useEventsStore();
  const managers = cinemaDB[11].managers;

  const [managerData, setManagerData] = useState([]);

  useEffect(() => {
    const updatedManagerData = managers.map((manager) => ({
      manager: manager,
      data: {
        lanes: [
          {
            id: `lane-${manager}`,
            title: "to do task",
            label: "",
            style: {
              width: 270,
              backgroundColor: "#B39DDB",
              color: "#fff",
              boxShadow: "2px 2px 4px 0px rgba(0,0,0,0.75)",
            },
            cards: events.filter(
              (event) =>
                event.manager === manager && event.laneId === `lane-${manager}`
            ),
          },
          {
            id: `lane-${manager}-in-progress`,
            title: "in progress",
            label: "",
            style: {
              width: 270,
              backgroundColor: "#F9A825",
              color: "#fff",
              boxShadow: "2px 2px 4px 0px rgba(0,0,0,0.75)",
            },
            cards: events.filter(
              (event) =>
                event.manager === manager &&
                event.laneId === `lane-${manager}-in-progress`
            ),
          },
          {
            id: `lane-${manager}-completed`,
            title: "Completed",
            label: "",
            style: {
              width: 270,
              backgroundColor: "#689F38",
              color: "#fff",
              boxShadow: "2px 2px 4px 0px rgba(0,0,0,0.75)",
            },
            cards: events.filter(
              (event) =>
                event.manager === manager &&
                event.laneId === `lane-${manager}-completed`
            ),
          },
          {
            id: `lane-${manager}-blocked`,
            title: "Blocked",
            label: "",
            style: {
              width: 270,
              backgroundColor: "#9E9E9E",
              color: "#fff",
              boxShadow: "2px 2px 4px 0px rgba(0,0,0,0.75)",
            },
            cards: events.filter(
              (event) =>
                event.manager === manager &&
                event.laneId === `lane-${manager}-blocked`
            ),
          },
        ],
      },
    }));

    setManagerData(updatedManagerData);
  }, [events, managers]);

  return (
    <Container>
      {managerData.map(({ manager, data }) => (
        <Box key={manager} sx={{ mt: "30px" }}>
          <Box component="div" sx={{ p: 2, border: "2px dashed grey" }}>
            <Typography>{manager}</Typography>
          </Box>
          <Board
            style={{ height: "500px", marginTop: "20px" }}
            data={data} // Passa direttamente l'oggetto data
            handleDragEnd={(cardId, sourceLaneId, targetLaneId) => {
              const sourceManager = sourceLaneId.split("-")[1];
              const targetManager = targetLaneId.split("-")[1];

              const finder = events.find((event) => event.id === cardId);

              if (sourceManager !== targetManager) {
                const newEvent = {
                  ...finder,
                  laneId: targetLaneId,
                  manager: targetManager,
                };
                upDateEvent(newEvent, cardId);
              } else {
                const newEvent = { ...finder, laneId: targetLaneId };
                upDateEvent(newEvent, cardId);
              }
            }}
            laneStyle={{
              maxHeight: "450px",
              overflowY: "auto",
            }}
          />
        </Box>
      ))}
    </Container>
  );
};

export default Kanban;
