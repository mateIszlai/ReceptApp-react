import React, { Fragment, useState, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { UserContext } from "../../context/UserContext";
import axios from "../../axios/axios";
import "./Login.css";
import { NavLink, useHistory } from "react-router-dom";

export default function Login() {
  const USER_NAME = 1;
  const USER_ID = 0;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const setUser = useContext(UserContext)[1];
  const history = useHistory();

  const tryLogin = () => {
    axios
      .post("/login", {
        UserName: userName,
        Password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Logged in!");
          setUser({
            userName: response.data[USER_NAME],
            userId: response.data[USER_ID],
            loggedIn: true,
          });
          setShow(true);
        }
      })
      .catch(() => {
        setShowError(true);
      });
  };

  return (
    <Fragment>
      <div className="page-container">
        <h1>Login</h1>
        <form noValidate autoComplete="off">
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
              color="primary"
              onClick={tryLogin}
              disabled={userName.length === 0 || password.length === 0}
            >
              Login
            </Button>
          </Box>
        </form>
      </div>
      <Dialog
        onClose={() => {
          setShow(false);
          history.push("/");
        }}
        aria-labelledby="add-dialog-title"
        open={show}
        className="navigation-dialog"
      >
        <DialogTitle id="add-dialog-title">
          You are logged in successfully
        </DialogTitle>
        <DialogActions>
          <NavLink to={"/"} exact>
            <Button
              className="dialog-close-btn"
              color="primary"
              onClick={() => setShow(false)}
            >
              Close
            </Button>
          </NavLink>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={() => setShowError(false)}
        aria-labelledby="login-error-dialog-title"
        open={showError}
        className="navigation-dialog"
      >
        <DialogTitle id="login-error-dialog-title">
          Wrong username or password
        </DialogTitle>
        <DialogActions>
          <Button
            className="dialog-close-btn"
            color="primary"
            onClick={() => setShowError(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
