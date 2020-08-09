import React, { Fragment, useState, useContext } from "react";
import { Box, TextField, Button } from "@material-ui/core";
import { UserContext } from "../../context/USerContext";
import axios from "../../axios/axios";

export default function Login() {
  const USER_NAME = 1;
  const USER_ID = 0;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [setUser] = useContext(UserContext)[1];

  const tryLogin = () => {
    axios
      .post("/login", {
        UserName: userName,
        Password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Logged in!");
          console.log(response);
          setUser({
            userName: response.data[USER_NAME],
            userId: response.data[USER_ID],
            loggedIn: true,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <div className="page-container">
        <form novalidate autoComplete="off">
          <Box className="textfield-container">
            <TextField
              className="textfield"
              id="username-input"
              autoComplete="off"
              label="Username"
              variant="outlined"
              required
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </Box>
          <Box className="textfield-container">
            <TextField
              className="textfield"
              id="password-input"
              autoComplete="off"
              label="Password"
              variant="outlined"
              required
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              className="login-btn"
              onClick={tryLogin}
            >
              Login
            </Button>
          </Box>
        </form>
      </div>
    </Fragment>
  );
}
