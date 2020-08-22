import React, { Fragment } from "react";
import { Box, TextField } from "@material-ui/core";

export default function ServingsInput(props) {
  return (
    <Fragment>
      <Box className="textfield-container">
        <TextField
          className="textfield"
          id="servings-input"
          variant="outlined"
          label="Servings"
          required
          type="number"
          onChange={(e) => {
            props.setServings(e.target.valueAsNumber);
          }}
        />
      </Box>
    </Fragment>
  );
}
