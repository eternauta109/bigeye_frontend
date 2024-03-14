import React from "react";

import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import CelebrationIcon from '@mui/icons-material/Celebration';
import SellIcon from '@mui/icons-material/Sell';
import SchoolIcon from '@mui/icons-material/School';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';


const ToggleEvent = ({ alignment, setAlignment }) => {


    const handleToggleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
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