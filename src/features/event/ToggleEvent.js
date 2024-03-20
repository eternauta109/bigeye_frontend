import React from "react";

import {
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Button,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import CelebrationIcon from "@mui/icons-material/Celebration";
import SellIcon from "@mui/icons-material/Sell";
import SchoolIcon from "@mui/icons-material/School";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const ToggleEvent = ({ setEventType, event }) => {
  const handleToggleAlignment = (alignment) => {
    console.log("Toggle event", alignment);
    let color = "#F39C12";
    switch (alignment) {
      case "evento":
        color = "#F39C12";
        break;
      case "matineè":
        color = "#7DCEA0";
        break;
      case "prevendite":
        color = "#BB8FCE";
        break;
      case "promo":
        color = "#AAB7B8";
        break;
      case "compleanni":
        color = "#448AFF";
        break;
      case "extra":
        color = "#EF5350";
        break;
      default:
        console.error("Valore del toggle non previsto:", alignment);
        // Gestire il caso imprevisto, ad esempio impostando un valore di default
        break;
    }
    setEventType({
      ...event,
      eventType: alignment,
      colorEventType: color,
    });
  };

  return (
    <ToggleButtonGroup
      value={event?.eventType ? event.eventType : "evento"}
      exclusive
      sx={{ mb: 2 }}
      aria-label="text alignment"
    >
      <ToggleButton
        value="evento"
        aria-label="centered"
        onClick={() => handleToggleAlignment("evento")}
      >
        <Tooltip title="evento">
          <EventIcon value="evento" />
        </Tooltip>
      </ToggleButton>

      <ToggleButton
        value="matineè"
        aria-label="left aligned"
        onClick={() => handleToggleAlignment("matineè")}
      >
        <Tooltip title="matineè">
          <SchoolIcon />
        </Tooltip>
      </ToggleButton>

      <ToggleButton
        value="prevendite"
        aria-label="right aligned"
        onClick={() => handleToggleAlignment("prevendite")}
      >
        <Tooltip title="prevendite">
          <SellIcon />
        </Tooltip>
      </ToggleButton>

      <ToggleButton
        value="promo"
        aria-label="justified"
        onClick={() => handleToggleAlignment("promo")}
      >
        <Tooltip title="promo">
          <DevicesOtherIcon />
        </Tooltip>
      </ToggleButton>

      <ToggleButton
        value="compleanni"
        aria-label="justified"
        onClick={() => handleToggleAlignment("compleanni")}
      >
        <Tooltip title="compleanni">
          <CelebrationIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton
        value="extra"
        aria-label="justified"
        onClick={() => handleToggleAlignment("extra")}
      >
        <Tooltip title="extra">
          <RocketLaunchIcon />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleEvent;
