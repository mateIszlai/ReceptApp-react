import React, { Fragment, useState, useEffect } from "react";
import { TextField, Box, Button } from "@material-ui/core";
import axios from "../../axios/axios";
import "./Register.css";
import emailValidator from "email-validator";

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
    const [success, setSuccess] = useState(false);

    const tryRegister = () => {
        let valid =
            userNameError.length === 0 &&
            emailError.length === 0 &&
            passwordError.length === 0;
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
            setPasswordError(
                "Password must contains at least one uppercase letter"
            );
        } else if (!/\d/.test(password)) {
            setPasswordError("Password should contains at least one digit");
        } else {
            setPasswordError("");
        }
    }, [password]);

    return success ? (
        <Fragment>
            <h4 id="register-success-message">You registered successfully!</h4>
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
