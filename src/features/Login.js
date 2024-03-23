import React, { useState, useEffect } from "react";
import icoEye from ".././assets/eye-icon-1483-Windows.ico";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import useEventsStore from "../store/EventDataContext";

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

  const { user, setUser } = useEventsStore();
  const navigate = useNavigate();

  const theme = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await setUser({ userName, password });
    console.log("user in handle dopo aver cercato nello store: " + user);
    if (user?.isAuth) {
      console.log("user in handle dopo aver cercato nello store: " + user);
      navigate("./calendar");
    } else {
      console.log("credenziali errate");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          component="h1"
          variant="h3"
          color="secondary"
          fontWeight="bold"
        >
          Big
        </Typography>
        <img src={icoEye} alt="icoEye" />
        <Typography
          component="h1"
          variant="h3"
          color="secondary"
          fontWeight="bold"
        >
          eye
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
