import React, { Fragment } from "react";
import { Box, TextField } from "@material-ui/core";

export default function NameInput(props) {
  return (
    <Fragment>
      <Box className="textfield-container">
        <TextField
          className="textfield"
          id="name-input"
          variant="outlined"
          label="Name of the recipe"
          required={props.required}
          onChange={(e) => {
            props.setRecipeName(e.target.value);
          }}
        />
      </Box>
    </Fragment>
  );
}
