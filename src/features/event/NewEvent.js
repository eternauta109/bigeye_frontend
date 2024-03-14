import React, { useState, useMemo, useEffect } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useDispatch } from "react-redux";
import { addEvents, removeEvents, updateEvents } from "../../store/eventsSlice";
import {
  Box,
  Typography,
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  OutlinedInput,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  TextField,
} from "@mui/material";

const initialEvent = {
  id: null,
  color: null,
  description: "",
  division: null,
  start: "2024-03-11T09:21:17.084Z",
  end: "2024-03-11T09:21:17.084Z",
  link: null,
  note: "",
  title: "",
  manager: "",
  laneId: "lane1",
};

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";

import { cinemaDB } from "../../database/cinemaDB";

import useEventsStore from "../../store/EventDataContext";

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function getStylesManager(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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

function NewEvent({ handleClose }) {
  /*  const [cinemaSelect, setCinemaSelect] = useState([]); */

  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [upDate, setUpDate] = useState(false);
  const [alignment, setAlignment] = React.useState("left");
  const dispatch = useDispatch();

  const {
    events,
    addEvent,
    upDateEvent,
    setDate,
    event,
    initEvent,
    addLink,
    setManager,

    addNote,
    addTitleInEvent,
    setDivision,
    addDescriptionInEvent,
  } = useEventsStore();
  const managers = cinemaDB[11].managers[0].name;
  console.log(managers);

  console.log("events", events);
  console.log("event", event);

  /*   useMemo(() => {
    console.log(newEvent);
  }, [newEvent]); */

  /* const handleChangeCinema = (event) => {
    const {
      target: { value },
    } = event;
    setCinemaSelect(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
 */
  const onSubmit = async (e) => {
    e.preventDefault();
    if (upDate) {
      upDateEvent(event, event.id);
      handleClose();
    } else {
      const eventBis = {
        ...event,
        laneId: `lane-${event.manager ? event.manager : managers}`,
        manager: event.manager ? event.manager : managers,
        id: `nota${events.length + 1}`,
      };
      console.log("newevent", event);
      await dispatch(addEvents(eventBis));
      addEvent(eventBis);
    }
    initEvent();
  };

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
        throw new Error("no case select division");
    }
    setDivision({ division: e.target.value, color: color });
  };

  const handleToggleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    console.log("UPDATE", upDate);
    if (event.id !== null) {
      console.log("evento.id nullo");
      setUpDate(true);
    }

    return () => {
      initEvent();
    };
  }, []);

  return (
    <Container
      sx={{
        height: "700px",
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
          variant="contained"
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
        <ToggleButtonGroup
          value={alignment}
          exclusive
          sx={{ mb: 2 }}
          onChange={handleToggleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned">
            1
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered">
            2
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned">
            3
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified">
            4
          </ToggleButton>
        </ToggleButtonGroup>

        <TextField
          fullWidth
          label="title"
          variant="outlined"
          value={event?.title ? event.title : ""}
          name="title"
          sx={{ mb: 2 }}
          onChange={(e) => addTitleInEvent(e.target.value)}
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
          onChange={(e) => addDescriptionInEvent(e.target.value)}
        />

        <DateRange
          editableDateInputs={true}
          onChange={(item) => {
            console.log(
              "datetime",
              item.selection.startDate,
              item.selection.endDate
            );
            setDate(item.selection);
            setDateState([item.selection]);
          }}
          moveRangeOnFirstSelection={false}
          ranges={dateState}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="division">Division</InputLabel>
          <Select
            labelId="division"
            name="division"
            input={<OutlinedInput label="division" />}
            id="demo-simple-select"
            value={event?.division ? event.division : ""}
            onChange={(e) => {
              handleDivisionChange(e);
            }}
            fullWidth
          >
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
          onChange={(link) => addLink(link.target.value)}
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
          onChange={(note) => addNote(note.target.value)}
          rows={4}
          sx={{ mt: 2, mb: 2 }}
        />

        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="owner">person in charge</InputLabel>
          <Select
            fullWidth
            labelId="owner"
            value={event?.manager ? event.manager : managers[0]}
            onChange={(e) => setManager(e.target.value)}
            MenuProps={MenuProps}
            input={<OutlinedInput label="person in charge" />}
          >
            {cinemaDB[11].managers.map((el, key) => (
              <MenuItem key={key} value={el.name}>
                {el.name}
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
      </form>
    </Container>
  );
}

export default NewEvent;
