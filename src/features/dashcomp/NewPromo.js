import React, { useState, useMemo, useEffect } from "react";

import {
  Box,
  Container,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import usePromoStore from "../../store/PromoDataContext";
import { useTheme } from "@mui/material/styles";
import { cinemaDB } from "../../database/cinemaDB";

function NewPromo({ handleClose, upDate }) {
  /*  const [cinemaSelect, setCinemaSelect] = useState([]); */

  
  const {addPromo, setDate, promo, totalPromo, setFilm, setGadget, setModalita, setWhere, initPromo,updatePromo} =usePromoStore()

  const theme = useTheme();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("UPDATE", upDate)
    if (upDate) {
       //qui update promo
       updatePromo(promo.id, promo)
    } else {
      const promoBis = {
        ...promo,
        id:totalPromo
      };
      addPromo(promoBis);     
    }
    initPromo();
    handleClose(false)
  };

  useEffect(() => {console.log(promo)}, []);

  return (
    <Container
      sx={{
        height: "500px",
        padding: 2,

        mb: 2,
        overflowY: "auto",
      }}
    >
      <Typography variant="h4" sx={{mb:2}}>
        Insert new promo/initiative
      </Typography>
      {upDate && (
        <Button
          variant="contained"
          sx={{ m: 2 }}
          onClick={(e) => {
            handleClose();
           
          }}
        >
          exit without save
        </Button>
      )}

  <Box sx={{mb:2}}>
    <LocalizationProvider  dateAdapter={AdapterDateFns}>
        <DatePicker value={promo.date} onChange={(e)=>setDate(e)}/>
    </LocalizationProvider>
  </Box>

  

      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          label="film"
          variant="outlined"
          value={promo.film? promo.film : ""}
          onChange={(e)=>{setFilm(e.target.value)}}
          name="film"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="gadget"
          variant="outlined"
          value={promo.gadget? promo.gadget : ""}
          onChange={(e)=>{setGadget(e.target.value)}}
          name="gadget"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="modalita"
          variant="outlined"
          value={promo.modalita? promo.modalita : ""}
          onChange={(e)=>{setModalita(e.target.value)}}
          name="modalita"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="where"
          variant="outlined"
          value={promo.where? promo.where : ""}
          onChange={(e)=>{setWhere(e.target.value)}}
          name="where"
          sx={{ mb: 2 }}
        />

        {/*  <FormControl fullWidth sx={{ mt: 2 }}>
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
        </FormControl> */}

        <Button fullWidth variant="outlined" type="submit" color="secondary">
          {upDate ? "updates" : "save"}
        </Button>
      </form>
    </Container>
  );
}

export default NewPromo;
