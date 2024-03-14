import React, { useState } from "react";
import {
  Paper,
  Button,
  Grid,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import PromoModal from "./PromoModal";

import usePromoStore from "../.././store/PromoDataContext";


export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { addPromo, promoInitiative, deletePromo, updatePromo, setPromo } = usePromoStore();
  const [openNewPromo, setOpenNewPromo] = useState(false);
  const [upDate, setUpDate] = useState(false);

  const columns = [
    {
      id: "id",
      label: "id",
      minWidth: 50,
    },
    {
      id: "date",
      label: "Data",
      minWidth: 100,
      format: (row) => {
        const dateStr = row.date; // Assumi che la chiave sia "date"
        const dateObj = new Date(dateStr);
        return dateObj.toLocaleDateString();
      },
     
    },
    { id: "film", label: "Film", minWidth: 100 },
    {
      id: "gadget",
      label: "Gadget",
      minWidth: 170,
      align: "right",
    },
    {
      id: "modalita",
      label: "Modalità",
      minWidth: 170,
      align: "right",
    },
    {
      id: "where",
      label: "dove si trova",
      minWidth: 170,
      align: "right",
    },
    { 
      id: "edit",   
      minWidth: 50,
      format: (row) => (
        <Button variant="outlined" onClick={() => handleEdit(row)}>╬</Button>
      ),
    },
    {
      id: "delete", 
      minWidth: 50,
      format: (row) => (
        <Button variant="contained" color="error"  onClick={() => handleDelete(row)}>X</Button>
      ),
    },
  ];
  

  const handleOpenNewPromo = () => setOpenNewPromo(true);
  const handleCloseNewPromo = () => setOpenNewPromo(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (row) => {


    setUpDate(true)
    handleOpenNewPromo();

  // Implementa l'azione di modifica qui, utilizzando i dati della riga (row)
  // Ad esempio, puoi aprire un modulo di modifica con i dati della riga.
  setPromo(row)
  console.log(`Modifica la riga con ID: ${row.id}`);
};

const handleDelete = (row) => {
  // Implementa l'azione di cancellazione qui, utilizzando i dati della riga (row)
  // Ad esempio, puoi chiedere conferma all'utente prima di cancellare la riga.
  
  deletePromo(row.id)
  console.log(`Cancella la riga con ID: ${row.id}`);
};

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h4">Promo e iniziative</Typography>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ textAlign: "right", mb: 1 }}>
          <Button variant="contained" onClick={handleOpenNewPromo}>
            Add a promo
          </Button>
        </Box>
      </Grid>
      <Paper sx={{ width: "100%", overflow: "hidden", p: 1 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, key) => (
                  <TableCell
                    key={key}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              
            {promoInitiative.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                         {column.format ? column.format(row) : row[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          rows={promoInitiative}
          component="div"
          count={promoInitiative.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <PromoModal open={openNewPromo} upDate={upDate} handleClose={handleCloseNewPromo} />
      </Paper>
    </Grid>
  );
}
