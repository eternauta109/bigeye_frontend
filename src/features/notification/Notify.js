import React from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Notify = ({ onHandleClose, open, notify }) => {
  return (
    <>
      ciao
      <Modal
        open={open}
        onClose={() => {
          onHandleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {notify?.map((value, key) => (
            <Card sx={{ minWidth: 275, mb: 1 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  hai ricevuto la seguente notifica:
                </Typography>

                <Typography>{value.notify}</Typography>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Modal>
    </>
  );
};
