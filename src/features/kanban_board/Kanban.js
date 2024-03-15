import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import Board from "react-trello";
import useEventsStore from "../.././store/EventDataContext";
import { cinemaDB } from "../.././database/cinemaDB";
import CustomCard from "./CustomCard";
import { convertCompilerOptionsFromJson } from "typescript";

const dataInit = {
  lanes: [
    // Lascia le tue lane iniziali vuote o come preferisci
  ],
};

const Kanban = () => {
  const { events, upDateEvent } = useEventsStore();
  const managers = cinemaDB[11].managers;
  const managerNames = managers.map((manager) => manager.name);

  const [managerData, setManagerData] = useState([]);

  useEffect(() => {
    const updatedManagerData = managerNames.map((manager) => ({
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
          // Aggiungi altre lane qui...
        ],
      },
    }));
    console.log("trello base", updatedManagerData, events)
    setManagerData(updatedManagerData);
  }, [events, managers]);

  const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    const sourceManager = sourceLaneId.split("-")[1];
    const targetManager = targetLaneId.split("-")[1];

    const updatedEvents = events.map((event) => {
      if (event.id === cardId) {
        if (sourceManager !== targetManager) {
          return {
            ...event,
            laneId: targetLaneId,
            manager: targetManager,
          };
        } else {
          return { ...event, laneId: targetLaneId };
        }
      } else {
        return event;
      }
    });

    upDateEvent(updatedEvents);
  };

  return (
    <Container>
      {managerData.map(({ manager, data }) => (
        <Box key={manager} sx={{ mt: "30px" }}>
          <Box component="div" sx={{ p: 2, border: "2px dashed grey" }}>
            <Typography>{manager}</Typography>
          </Box>
          <Board
            style={{ height: "500px", marginTop: "20px" }}
            data={data}
            handleDragEnd={handleDragEnd}
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

