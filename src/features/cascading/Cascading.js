import React, { useMemo, useState } from "react";

import {Box, Typography, Checkbox, FormControlLabel} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { cinemaDB } from "../../database/cinemaDB";

const managers = cinemaDB[11].managers;

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'anno', headerName: 'anno', width: 90 },
    {
        field: 'mese',
        headerName: 'mese',
        width: 90,
        editable: true,
    },
    {
        field: 'argomento',
        headerName: 'argomento',
        width: 150,
        editable: true,
    },
    {
        field: 'tipologia',
        headerName: 'tipologia',
        //type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'ufficio',
        headerName: 'ufficio',
        //type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'priorità',
        headerName: 'priorità',
        //type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'link',
        headerName: 'link',
        //type: 'number',
        width: 110,
        editable: true,
    },
    ...managers.map((manager, index) => ({
        field: manager.name,
        headerName: (
            <Typography component="div" sx={{  fontSize:10 }}>
            {manager.name}
          </Typography>
        ),
        width: 60,
        renderCell: (params) => <ManagerCheckbox {...params} manager={manager.name} />
    })),
   

    {
        field: 'note',
        headerName: 'note',
        //type: 'number',
        width: 110,
        editable: true,
    },


];

const ManagerCheckbox = ({ row, manager }) => {

    console.log("QUUIII", row,manager)

    return (
        <FormControlLabel
        control={<Checkbox  />}
        label={null}
      />
    )
    {/*
        const isChecked = row.managers.includes(manager);
  
    console.log("QUUIII", row,manager)
    const handleChange = () => {
      // Aggiungi o rimuovi il manager dalla lista dei manager della riga
      const updatedManagers = isChecked
        ? row.manager.filter((m) => m !== manager)
        : [...row.manager, manager];
  
      // Chiamata a una funzione per aggiornare la riga con i nuovi manager selezionati
      // Qui devi inserire la tua logica per l'aggiornamento dei dati
    };
  
    return (
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleChange} />}
        label={null}
      />
    );*/}
  };


const rows = [
    {
        id: 1,
        anno: "2024",
        mese: "gennaio",
        argomento: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ",
        tipologia: "presentazione",
        ufficio: "marketing",
        priorità: "alta",
        link: "link",
        note: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis",
        mangers: []
    }]   

console.log(managers)
console.log("cascading")

const Cascading = () => {
    return (
        <Box sx={{ height: 700, width: '100%' }}>
            {managers.length > 1 
            ? <DataGrid
                rows={rows}
                components={{
                    Header: (props) => (
                      <div style={{ height: '200px' }}>
                        <DataGrid components={{ Toolbar: props.Toolbar }} {...props} />
                      </div>
                    ),
                  }}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
            /> 
            : <Box>carico</Box>}
        </Box>
    )
}

export default Cascading;