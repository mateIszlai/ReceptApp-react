import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import { IconButton, Button } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";

export default function Navigation() {
  const user = useContext(UserContext)[0];
  return (
    <nav>
      <div className="logo"></div>
      <ul className="nav-links nav-links-left">
        <li>
          <div className="link-wrapper">
            <NavLink activeClassName="is-active" to={"/"} exact>
              <IconButton aria-label="nav-to-home">
                <HomeIcon />
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
                  <Button variant="contained">Login</Button>
                </NavLink>
              </div>
            </li>
            <li>
              <div className="link-wrapper">
                <NavLink to={"/register"} exact>
                  <Button variant="contained">Register</Button>
                </NavLink>
              </div>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <div className="link-wrapper">
                <NavLink to={"/logout"} exact>
                  <Button variant="contained">Logout</Button>
                </NavLink>
              </div>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
}
