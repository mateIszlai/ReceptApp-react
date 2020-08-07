import React, { Fragment, useState, useEffect } from "react";
import { Box, TextField } from "@material-ui/core";

export default function Login() {
  const [userName, setUserName] = useState("");

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
        </form>
      </div>
    </Fragment>
  );
}
