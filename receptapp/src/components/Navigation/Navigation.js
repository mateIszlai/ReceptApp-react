import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import { IconButton } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";
import "./Navigation.css";

export default function Navigation() {
  const user = useContext(UserContext)[0];
  return (
    <nav>
      <ul className="nav-links nav-links-left">
        <li>
          <div className="link-wrapper">
            <NavLink to={"/"} exact>
              <IconButton aria-label="nav-to-home">
                <HomeIcon
                  id="home-icon"
                  size="medium"
                  style={{ color: "white" }}
                />
              </IconButton>
            </NavLink>
          </div>
        </li>
      </ul>
      <ul className="nav-links nav-links-right">
        {!user.loggedIn ? (
          <Fragment>
            <li>
              <div className="link-wrapper">
                <NavLink to={"/login"} exact>
                  Login
                </NavLink>
              </div>
            </li>
            <li>
              <div className="link-wrapper">
                <NavLink to={"/register"} exact>
                  Register
                </NavLink>
              </div>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <div className="link-wrapper">
                <NavLink to={`/profile/${user.userName}`} exact>
                  Profile
                </NavLink>
              </div>
            </li>
            <li>
              <div className="link-wrapper">
                <NavLink to={"/logout"} exact>
                  Logout
                </NavLink>
              </div>
            </li>
            <li>
              <div className="link-wrapper">
                <NavLink to={"/recipes/add"} exact>
                  Add recipe
                </NavLink>
              </div>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
}
