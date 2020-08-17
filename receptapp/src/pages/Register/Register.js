import React, { Fragment, useState, useEffect } from "react";
import {
  TextField,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import axios from "../../axios/axios";
import "./Register.css";
import emailValidator from "email-validator";
import { NavLink, useHistory } from "react-router-dom";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [show, setShow] = useState(false);
  const [valid, setValid] = useState(false);

  const history = useHistory();

  const tryRegister = () => {
    axios
      .post("/register", {
        firstName,
        lastName,
        nickName,
        userName,
        email,
        password,
      })
      .then((response) => {
        if (response.status === 201) setShow(true);
      })
      .catch((err) => console.log(err));
  };

  // validate username
  useEffect(
    () =>
      userName.length < 4
        ? setUserNameError("Username has to be at least 4 characters")
        : setUserNameError(""),
    [userName]
  );

  // validate email
  useEffect(() => {
    emailValidator.validate(email)
      ? setEmailError("")
      : setEmailError("Has to be a valid email address");
  }, [email]);

  // validate password
  useEffect(() => {
    if (password.length < 8) {
      setPasswordError("Password has to be at least 8 character");
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contains at least one uppercase letter");
    } else if (!/\d/.test(password)) {
      setPasswordError("Password should contains at least one digit");
    } else {
      setPasswordError("");
    }
  }, [password]);

  useEffect(() => {
    setValid(
      userNameError.length === 0 &&
        emailError.length === 0 &&
        passwordError.length === 0
    );
  }, [emailError, passwordError, userNameError, valid]);

  return (
    <Fragment>
      <div className="page-container">
        <form noValidate autoComplete="off">
          <Box className="textfield-container">
            <TextField
              className="textfield"
              id="firstName-input"
              label="First Name"
              variant="outlined"
              autoComplete="off"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Box>
          <Box className="textfield-container">
            <TextField
              className="textfield"
              id="lastName-input"
              label="Last Name"
              variant="outlined"
              autoComplete="off"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Box>
          <Box className="textfield-container">
            <TextField
              className="textfield"
              id="nickName-input"
              label="Nick Name"
              variant="outlined"
              autoComplete="off"
              onChange={(e) => {
                setNickName(e.target.value);
              }}
            />
          </Box>
          <Box className="textfield-container">
            <TextField
              className="textfield"
              required
              id="username-input"
              label="User Name"
              variant="outlined"
              autoComplete="off"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              onFocus={(e) => {
                setUserName(e.target.value);
              }}
              helperText={userNameError}
            />
          </Box>
          <Box className="textfield-container">
            <TextField
              className="textfield"
              required
              id="email-input"
              label="Email"
              variant="outlined"
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onFocus={(e) => {
                setEmail(e.target.value);
              }}
              helperText={emailError}
            />
          </Box>
          <Box className="textfield-container">
            <TextField
              className="textfield"
              required
              id="password-input"
              label="Password"
              type="password"
              variant="outlined"
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onFocus={(e) => {
                setPassword(e.target.value);
              }}
              helperText={passwordError}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              className="register-btn"
              disabled={!valid}
              color="primary"
              onClick={tryRegister}
            >
              Register
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
          You registered successfully
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
    </Fragment>
  );
}
