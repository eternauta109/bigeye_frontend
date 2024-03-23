import React, { useState, useEffect } from "react";
import favicon from ".././assets/favicon.ico";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userSlice";

import {
  Container,
  Typography,
  Box,
  Link,
  TextField,
  Button,
  Avatar,
} from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="white"
      marginBottom="40px"
      borderRadius="5px"
      align="center"
      {...props}
      sx={{ bgcolor: "gray", opacity: 0.9, width: "300px", fontSize: "10px" }}
    >
      {"Dev By  "}
      <Link color="inherit" href="#">
        Fabio Conti
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const theme = useTheme();
  const { ipcRenderer } = window.require("electron");

  const handleSubmit = async (event) => {
    console.log("handle submit login", ipcRenderer);
    event.preventDefault();
    // Ottieni il manager corrispondente alle credenziali
    /* const manager = await getManagerByCredentials(userName, password);
    console.log("quando vedrai questa scritta molto sarà avvenuto", manager); */
    ipcRenderer.send("login", { userName, password });
    ipcRenderer.on("returnManager", (event, returnManager) => {
      console.log("inizia un era", returnManager);
    });
    dispatch(loginUser({ username: userName, password }));
    /* if (manager) {
      dispatch(loginUser({ username: userName, password }));
      // Naviga alla pagina successiva dopo il login
    } else {
      console.log("Credenziali non valide");
    } */
  };

  useEffect(() => {
    console.log("version?", window.versions);
    console.log("login", user.isAuthenticated);
    if (user.isAuthenticated) {
      navigate("/calendar");
    }
  }, [user, navigate]);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src={favicon} alt="Favicon" />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          component="h1"
          variant="h3"
          color="secondary"
          fontWeight="bold"
        >
          incident report web app
        </Typography>
      </Box>

      <Container component="main" maxWidth="xs" sx={theme.formStyle}>
        <Box
          sx={{
            mb: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              sx={{ input: { backgroundColor: "white" } }}
              id="userName"
              onChange={(e) => setUserName(e.target.value)}
              label="user"
              name="userName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              sx={{ input: { backgroundColor: "white" } }}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              label="Password"
              type="password" /* {showPassword ? "text" : "password"} */
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      <Box sx={{ mt: "auto", display: "flex", justifyContent: "center" }}>
        <Copyright />
      </Box>
    </Box>
  );
}
