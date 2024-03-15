import React from "react";

import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import CelebrationIcon from '@mui/icons-material/Celebration';
import SellIcon from '@mui/icons-material/Sell';
import SchoolIcon from '@mui/icons-material/School';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';


const ToggleEvent = ({ alignment, setEventType }) => {    


    const handleToggleAlignment = (event, newAlignment) => {
        let color="#F39C12";
        switch (newAlignment) {
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
              throw new Error("no case select division");
          }
        setEventType({eventType:newAlignment,colorEventType:color});
    };

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            sx={{ mb: 2 }}
            onChange={handleToggleAlignment}
            aria-label="text alignment"

        >
            <ToggleButton value="evento" aria-label="centered">
                <Tooltip title="evento">
                    <EventIcon />
                </Tooltip>
            </ToggleButton>

            <ToggleButton value="matineè" aria-label="left aligned" >
                <Tooltip title="matineè">
                    <SchoolIcon />
                </Tooltip>
            </ToggleButton>

            <ToggleButton value="prevendite" aria-label="right aligned">
                <Tooltip title="prevendite">
                    <SellIcon />
                </Tooltip>
            </ToggleButton>

            <ToggleButton value="promo" aria-label="justified">
                <Tooltip title="promo">
                    <DevicesOtherIcon />
                </Tooltip>
            </ToggleButton>

            <ToggleButton value="compleanni" aria-label="justified">
                <Tooltip title="compleanni">
                    <CelebrationIcon />
                </Tooltip>

            </ToggleButton>
            <ToggleButton value="extra" aria-label="justified">
                <Tooltip title="extra">
                    <RocketLaunchIcon />
                </Tooltip>
            </ToggleButton>
        </ToggleButtonGroup>


    )

}

export default ToggleEvent;