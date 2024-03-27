import React, { useState, useMemo, useEffect } from "react";
import ToggleEvent from "./ToggleEvent";

import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import {
  Typography,
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  Box,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";

//queste sono le funzioni che bho messo dentro i reducer che
// vanno a lavorare con il db Level
import { addNewEvent, deleteEventFromDb } from "../../store/eventsReducer";
import { addNewTask } from "../../store/taskReducer";
import useEventsStore from "../../store/EventDataContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function NewEvent({ handleClose, upDate }) {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const {
    addTask,
    addEvent,
    eventToUpdate,
    totalEvent,
    totalTask,
    upDateEvent,
    emptyEvent,
    initEvent,
    deleteEvent,
    user,
  } = useEventsStore();

  const [event, setEvent] = useState(
    upDate ? { ...eventToUpdate } : { ...emptyEvent }
  );

  //funzione di submit. qua succedono un sacco di cose.
  //primo: se event è nuov lo aggiungo sia sllo store EDC che al db
  //se è solo da aggiornare aggiorno lo store e il db senza aumentare totalEvents
  //devo fare lo stesso con le tasks
  const onSubmit = async (e) => {
    e.preventDefault();
    if (upDate) {
      upDateEvent(event, event.id);
      handleClose();
      await addNewEvent(event, totalEvent);
    } else {
      if (event.manager !== "") {
        const newTask = {
          id: "task" + totalTask,
          createdBy: user.user.userName,
          title: event.title,
          manager: event.manager,
          description: event.description,
          label: event.eventType,
          laneId: `lane-${event.manager}`,
        };

        addTask(newTask);
        await addNewTask(newTask, totalTask);
      }
      const prepareEvent = {
        ...event,
        createdBy: user.user.userName,
        id: "event" + totalEvent,
      };
      addEvent(prepareEvent);
      initEvent();
      handleClose();
      await addNewEvent(prepareEvent, totalEvent);
    }
  };

  //questa funzione andra a cancellare l'event. qui upDate deve essere sicuramente true,
  // e poi devo passare event.id per andare a cancellare l'evento
  //sia dallo store che dal db
  const onDelete = async (e, idToCancel) => {
    e.preventDefault();
    deleteEvent(idToCancel);
    handleClose();
    await deleteEventFromDb(idToCancel);
  };

  //gestisco i cambiamenti del valore della divsions e aggiorno sia
  // lo stato che il colore relativo
  const handleDivisionChange = (e) => {
    let color;
    console.log(e.target.value);
    switch (e.target.value) {
      case "marketing":
        color = "#F39C12";
        break;
      case "operations":
        color = "#7DCEA0";
        break;
      case "pricing":
        color = "#BB8FCE";
        break;
      case "facilities":
        color = "#AAB7B8";
        break;
      case "screencontent":
        color = "#448AFF";
        break;
      case "actionpoint":
        color = "#EF5350";
        break;
      case "brief":
        color = "#90A4AE";
        break;
      default:
        color = "#7B68EE";
    }

    setEvent({ ...event, division: e.target.value, colorDivision: color });
  };

  //funzione che stampa event a pogni modifica
  /* useMemo(() => console.log("useMemo newEvent", event), [event]); */

  useEffect(() => {
    console.log("UPDATE", upDate);
    console.log("user in new events useeffect", user);
    if (upDate) {
      console.log("evento.id esistente questo è l evento da aggiornare", event);
    }

    return () => {
      initEvent();
    };
  }, []);

  return (
    <Container
      sx={{
        height: "600px",
        padding: 2,

        mb: 2,
        overflowY: "auto",
      }}
    >
      {!upDate && (
        <Typography variant="h4" sx={{ mb: 1 }}>
          New Event
        </Typography>
      )}
      {upDate && (
        <Button
          variant="outlined"
          sx={{ m: 2 }}
          onClick={(e) => {
            handleClose();
            initEvent();
          }}
        >
          exit without save
        </Button>
      )}
      <form onSubmit={onSubmit}>
        <ToggleEvent setEventType={setEvent} event={event} />

        <TextField
          fullWidth
          label="eventType"
          disabled
          value={event?.eventType ? event.eventType : ""}
          name="eventType"
          sx={{ mb: 2 }}
        />
        {upDate && (
          <TextField
            fullWidth
            label="created by"
            disabled
            value={event?.createdBy ? event.createdBy : ""}
            name="createdBy"
            sx={{ mb: 2 }}
          />
        )}

        <TextField
          fullWidth
          label="title"
          variant="outlined"
          value={event?.title ? event.title : ""}
          name="title"
          sx={{ mb: 2 }}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
        />

        <TextField
          fullWidth
          label="Describe event"
          variant="filled"
          multiline
          value={event?.description ? event.description : ""}
          name="description"
          rows={4}
          sx={{ mb: 2 }}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />

        <DateTimeRangePicker
          onChange={(newDateRange) => {
            setDateRange(newDateRange);
            console.log(newDateRange);
            setEvent({
              ...event,
              start: newDateRange[0],
              end: newDateRange[1],
            });
          }}
          value={upDate ? [event.start, event.end] : dateRange}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="division">Division</InputLabel>
          <Select
            labelId="division"
            name="division"
            input={<OutlinedInput label="division" />}
            id="demo-simple-select"
            value={event?.division ? event.division : ""}
            onChange={(e) => handleDivisionChange(e)}
            fullWidth
          >
            <MenuItem value={""}>none</MenuItem>
            <MenuItem value={"marketing"}>marketing</MenuItem>
            <MenuItem value={"operations"}>operations</MenuItem>
            <MenuItem value={"pricing"}>pricing</MenuItem>
            <MenuItem value={"facilities"}>facilities</MenuItem>
            <MenuItem value={"screencontent"}>screen conten</MenuItem>
            <MenuItem value={"actionpoint"}>action point</MenuItem>
            <MenuItem value={"brief"}>new brief</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="link egnyte"
          variant="outlined"
          size="small"
          name="egnyte"
          value={event?.link ? event.link : ""}
          onChange={(link) => setEvent({ ...event, link: link.target.value })}
          rows={1}
          sx={{ mt: 2, mb: 2 }}
        />
        <TextField
          fullWidth
          label="some note"
          variant="outlined"
          multiline
          name="note"
          value={event?.note ? event.note : ""}
          onChange={(note) => setEvent({ ...event, note: note.target.value })}
          rows={4}
          sx={{ mt: 2, mb: 2 }}
        />

        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="owner">person in charge</InputLabel>
          <Select
            fullWidth
            labelId="owner"
            value={event?.manager ? event.manager : ""}
            onChange={(manager) =>
              setEvent({ ...event, manager: manager.target.value })
            }
            MenuProps={MenuProps}
            input={<OutlinedInput label="assign this task to.." />}
          >
            <MenuItem value="">None</MenuItem>
            {user?.managersName.map((el, key) => (
              <MenuItem key={key} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/*  
        <FormControl fullWidth sx={{ mt: 2, maxWidth: 400 }}>
          <InputLabel id="cinemaInvolved">Cinema involved </InputLabel>
          <Select
            multiple
            labelId="cinemaInvolved"
            multiline
            value={cinemaSelect}
            onChange={handleChangeCinema}
            MenuProps={MenuProps}
            input={<OutlinedInput label="Cinema involved" />}
          >
            {cinemaDB.map((el, key) => (
              <MenuItem
                key={key}
                value={el.name}
                style={getStyles(el.name, cinemaSelect, theme)}
              >
                {el.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        
         */}

        <Button fullWidth variant="outlined" type="submit" color="secondary">
          {upDate ? "updates" : "save"}
        </Button>
        {upDate && (
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 4 }}
            onClick={(e) => {
              onDelete(e, event.id);
            }}
          >
            Delete This Event
          </Button>
        )}
      </form>
    </Container>
  );
}

export default NewEvent;
