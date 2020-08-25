import React, { Fragment } from "react";
import { Box, TextField, Select, MenuItem } from "@material-ui/core";

export default function CookTimeInput(props) {
  return (
    <Fragment>
      <Box className="textfield-with-select-container time-container">
        <Box className="textfield-with-select">
          <TextField
            id="cook-time-input"
            variant="outlined"
            label="Cook time"
            type="number"
            onChange={(e) => {
              props.setCookTimeAmount(e.target.valueAsNumber);
            }}
          />
        </Box>
        <Box className="select-container">
          <Select
            className="time-unit-select"
            value={props.cookTimeUnit}
            onChange={(e) => {
              props.setcookTimeUnit(e.target.value);
            }}
          >
            <MenuItem value={"hour"}>hour</MenuItem>
            <MenuItem value={"min"}>min</MenuItem>
          </Select>
        </Box>
      </Box>
    </Fragment>
  );
}
