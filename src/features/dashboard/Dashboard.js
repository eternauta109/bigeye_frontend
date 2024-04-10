import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  TextField,
  FormControl,
  ListItem,
  Stack,
  List,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import useEventsStore from "../../store/EventDataContext";
import { v4 as uuidv4 } from "uuid";
import { addNewUser, getAllManagers } from "../../store/userReducer";

const Dashboard = () => {
  const [newUser, setNewUser] = useState({
    userName: "",
    role: "",
    notification: [],
    password: "",
    isAuth: false,
    id: "",
    cinema: "",
  });
  const [managersList, setManagersList] = useState([]);

  const { user, setUsersName } = useEventsStore();

  const onHandleSubmit = async (e) => {
    const insertNewUser = {
      ...newUser,
      id: `manager-${uuidv4()}`,
      cinema: user.user.cinema,
    };
    e.preventDefault();
    console.log(insertNewUser);
    const cinemaNamesReturn = await addNewUser(insertNewUser);

    setUsersName(cinemaNamesReturn);
  };

  useMemo(() => {
    console.log("user modificato", newUser);
  }, [newUser]);

  const awaytGetAllManagers = async () => {
    const managersList = await getAllManagers();
    console.log("dashboard lista managers", managersList);
    setManagersList([...managersList]);
  };

  useEffect(() => {
    awaytGetAllManagers();

    return () => {};
  }, [managersList.length]);

  return (
    <Container
      sx={{
        height: "600px",
        padding: 2,
        justifyContent: "center",
      }}
    >
      <form onSubmit={onHandleSubmit}>
        <Stack spacing={3} sx={{ width: "300px" }}>
          <Typography>Inserisci un manager</Typography>

          <TextField
            label="user name"
            variant="outlined"
            name="useName"
            value={newUser.userName}
            onChange={(user) =>
              setNewUser({ ...newUser, userName: user.target.value })
            }
            helperText="nome+iniziale cognome. Es marioc, francof, iolandar"
          />
          <FormControl>
            <InputLabel id="role">Ruolo</InputLabel>
            <Select
              labelId="role"
              name="role"
              input={<OutlinedInput label="role" />}
              value={newUser?.role ? newUser.role : ""}
              onChange={(role) =>
                setNewUser({ ...newUser, role: role.target.value })
              }
            >
              <MenuItem value={""}>none</MenuItem>
              <MenuItem value="am">am</MenuItem>
              <MenuItem value="jm">jm</MenuItem>
              <MenuItem value="tl">tl</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="pin"
            variant="outlined"
            name="password"
            value={newUser.password}
            onChange={(psw) =>
              setNewUser({ ...newUser, password: psw.target.value })
            }
            helperText="consiglio: 4 cifre sono piu che sufficenti"
          />
          <TextField disabled label="cinema" value={user.user.cinema} />
          <Button variant="outlined" type="submit" color="secondary">
            Inserisci user
          </Button>
        </Stack>
      </form>
      <List>
        {managersList?.map((manager, key) => (
          <ListItem value={manager.userName} key={key}>
            {manager.userName}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Dashboard;
