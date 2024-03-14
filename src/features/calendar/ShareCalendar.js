import { useState } from "react";
import { Button } from "@mui/material";
import ModalEvent from "../event/ModalEvent";

import { Container, Grid } from "@mui/material";

import MyCalendar from "./MyCalendar";
import Promo from "../dashcomp/Promo";

const roundButtonStyle = {
  borderRadius: "10%",
  width: "100px",
  height: "60px",
  margin: "20px",
  minWidth: "unset",
  backgroundColor: "#689F38", // Aggiungi il colore rosso al background
};

const ShareCalendar = () => {
  const [openNewEvent, setOpenNewEvent] = useState(false);

  const handleOpenNewEvent = () => setOpenNewEvent(true);
  const handleCloseNewEvent = () => setOpenNewEvent(false);

  return (
    <Container maxWidth="xl" style={{ maxHeight: "900px" }}>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={11}>
          <MyCalendar handleOpen={handleOpenNewEvent} />
        </Grid>
        <Grid item xs={12} md={1}>
          <Button
            variant="contained"
            style={roundButtonStyle}
            onClick={handleOpenNewEvent}
          >
            Add ITEM
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        <Grid container item xs={12} md={9} sx={{ p: 2 }}>
          <Promo />
        </Grid>
      </Grid>
      <ModalEvent open={openNewEvent} handleClose={handleCloseNewEvent} />
    </Container>
  );
};

export default ShareCalendar;
