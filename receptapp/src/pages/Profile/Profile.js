import React, { Fragment, useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "../../axios/axios";
import { Button, Box } from "@material-ui/core";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const user = useContext(UserContext)[0];

  useEffect(() => {
    axios
      .get(`/users/${user.userId}`)
      .then((response) => setUserData(response.data))
      .catch((error) => console.log(`Error: ${error}`));
  }, [user.userId]);

  return !user.loggedIn ? (
    <Fragment>
      <h2>Please login to this action</h2>
    </Fragment>
  ) : userData != null ? (
    <Fragment>
      <div id="profile-page-container">
        <h1>Profile</h1>
        <Box id="user-data-container">
          <h3>First name: {userData.firstName}</h3>
          <h3>Last name: {userData.lastName}</h3>
          <h3>Nick name: {userData.nickName}</h3>
          <h3>Email: {userData.email}</h3>
        </Box>
        <Box id="edit-profile-btn-container">
          <NavLink to={`/profile/${user.userName}/edit`}>
            <Button variant="contained" color="primary" id="edit-profile-btn">
              Edit profile
            </Button>
          </NavLink>
        </Box>
      </div>
    </Fragment>
  ) : (
    <Fragment></Fragment>
  );
}
