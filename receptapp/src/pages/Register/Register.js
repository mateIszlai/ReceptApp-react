import React, { Fragment, useState, useEffect } from "react";
import { TextField, Box, Button } from "@material-ui/core";
import axios from "../../axios/axios";
import "./Register.css";

export default function Register() {
    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nickName, setNickName] = useState("");
    const [success, setSuccess] = useState(false);

    const tryRegister = () => {
        let valid = userNameError.length === 0;
        if (valid) {
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
                    console.log(response);
                    if (response.status === 201) setSuccess(true);
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(
        () =>
            userName.length < 4
                ? setUserNameError("Username has to be at least 4 characters")
                : setUserNameError(""),
        [userName]
    );

    return success ? (
        <Fragment>
            <h4>You registered successfully!</h4>
        </Fragment>
    ) : (
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
                        />
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            className="register-btn"
                            onClick={tryRegister}
                        >
                            Register
                        </Button>
                    </Box>
                </form>
            </div>
        </Fragment>
    );
}
