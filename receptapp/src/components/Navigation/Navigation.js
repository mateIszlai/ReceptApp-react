import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import { IconButton } from "@material-ui/core";

export default function Navigation() {
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
        </nav>
    );
}
