import React, { Fragment, useState, useContext, useEffect } from "react";
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
import emailValidator from "email-validator";

export default function EditProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sameError, setSameError] = useState("");
  const [modified, setModified] = useState(false);
  const [passwordsCorrect, setPasswordsCorrect] = useState(false);
  const [dataChangeShow, setDataChangeShow] = useState(false);
  const [passwordChangeShow, setPasswordChangeShow] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
    email: "",
  });

  const user = useContext(UserContext)[0];

  const tryModifyData = () => {
    axios
      .put(`/users/${user.userId}`, {
        firstName: firstName,
        lastName: lastName,
        nickName: nickName,
        email: email,
        oldPassword: "",
        newPassword: "",
      })
      .then((response) => {
        if (response.status === 200) setDataChangeShow(true);
      })
      .catch((error) => console.log(error));
  };

  const tryModifyPassword = () => {
    axios
      .put(`/users/${user.userId}`, {
        firstName: "",
        lastName: "",
        nickName: "",
        email: "",
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      .then((response) => {
        if (response.status === 200) setPasswordChangeShow(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`/users/${user.userId}`)
      .then((response) => {
        if (response.status === 200) setData(response.data);
      })
      .catch((error) => console.log(error));
  }, [user.userId]);

  useEffect(() => {
    setModified(
      email.length === 0 &&
        nickName.length === 0 &&
        firstName.length === 0 &&
        lastName.length === 0
    );
  }, [email.length, firstName.length, lastName.length, nickName.length]);

  useEffect(() => {
    setPasswordsCorrect(
      newPassword.length > 0 &&
        oldPassword.length > 0 &&
        confirmPassword.length > 0 &&
        sameError === ""
    );
  }, [
    confirmPassword.length,
    newPassword.length,
    oldPassword.length,
    sameError,
  ]);

  useEffect(() => {
    setSameError(
      confirmPassword === newPassword
        ? ""
        : "The given two passwords don't match"
    );
  }, [confirmPassword, newPassword]);

  useEffect(() => {
    emailValidator.validate(email)
      ? setEmailError("")
      : setEmailError("Has to be a valid email address");
  }, [email]);

  // validate password
  useEffect(() => {
    if (newPassword.length < 8) {
      setPasswordError("Password has to be at least 8 character");
    } else if (!/[A-Z]/.test(newPassword)) {
      setPasswordError("Password must contains at least one uppercase letter");
    } else if (!/\d/.test(newPassword)) {
      setPasswordError("Password should contains at least one digit");
    } else {
      setPasswordError("");
    }
  }, [newPassword]);

  return !user.loggedIn ? (
    <Fragment>
      <h2>Please login to this action</h2>
    </Fragment>
  ) : (
    <Fragment>
      <div className="page-container">
        <h1>Edit profile</h1>
        <form noValidate autoComplete="off">
          <Box className="textfield-container">
            <TextField
              className="textfield"
              id="firstName-input"
              label="First Name"
              variant="outlined"
              autoComplete="off"
              defaultValue={data.firstName}
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
              defaultValue={data.lastName}
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
              defaultValue={data.nickName}
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
              id="email-input"
              label="Email"
              defaultValue={data.email}
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
          <Box>
            <Button
              variant="contained"
              id="modify-data-btn"
              disabled={modified}
              onClick={tryModifyData}
            >
              Edit profile
            </Button>
          </Box>
        </form>
        <form>
          <Box className="textfield-container">
            <TextField
              className="textfield"
              required
              id="oldPassword-input"
              label="Actual password"
              type="password"
              variant="outlined"
              autoComplete="off"
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              onFocus={(e) => {
                setOldPassword(e.target.value);
              }}
            />
          </Box>
          <Box className="textfield-container">
            <TextField
              className="textfield"
              required
              id="newPassword-input"
              label="New password"
              type="password"
              variant="outlined"
              autoComplete="off"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              onFocus={(e) => {
                setNewPassword(e.target.value);
              }}
              helperText={passwordError}
            />
          </Box>
          <Box className="textfield-container">
            <TextField
              className="textfield"
              id="confirmPassword-input"
              label="Confirm password"
              type="password"
              variant="outlined"
              autoComplete="off"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              onFocus={(e) => {
                setConfirmPassword(e.target.value);
              }}
              helperText={sameError}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              id="modify-password-btn"
              disabled={!passwordsCorrect}
              onClick={tryModifyPassword}
            >
              Change password
            </Button>
          </Box>
        </form>
      </div>
      <Dialog
        onClose={() => setDataChangeShow(false)}
        aria-labelledby="modify-dialog-title"
        open={dataChangeShow}
        className="navigation-dialog"
      >
        <DialogTitle id="modify-dialog-title">
          Your changes saved successfully
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            className="dialog-close-btn"
            onClick={() => setDataChangeShow(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={() => setDataChangeShow(false)}
        aria-labelledby="modify-dialog-title"
        open={passwordChangeShow}
        className="navigation-dialog"
      >
        <DialogTitle id="modify-dialog-title">
          Your password changed successfully
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            className="dialog-close-btn"
            onClick={() => setPasswordChangeShow(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
