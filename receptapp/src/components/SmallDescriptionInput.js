import React, { Fragment } from "react";
import { Box, TextField } from "@material-ui/core";

export default function SmallDescriptionInput(props) {
  return (
    <Fragment>
      <Box className="textfield-container">
        <TextField
          className="textfield"
          id="small-description-input"
          variant="outlined"
          label="Small description"
          required
          onChange={(e) => {
            props.setSmallDescription(e.target.value);
          }}
        />
      </Box>
    </Fragment>
  );
}
