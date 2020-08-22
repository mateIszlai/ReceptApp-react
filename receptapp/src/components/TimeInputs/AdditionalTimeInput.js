import React, { Fragment } from "react";
import { Box, TextField, Select, MenuItem } from "@material-ui/core";

export default function AdditionalTimeInput(props) {
  return (
    <Fragment>
      <Box className="textfield-with-select-container time-container">
        <Box className="textfield-with-select">
          <TextField
            id="additional-time-input"
            variant="outlined"
            label="Additional time"
            type="number"
            onChange={(e) => {
              props.setAdditionalTimeAmount(e.target.valueAsNumber);
            }}
          />
        </Box>
        <Box className="select-container">
          <Select
            className="time-unit-select"
            value={props.additionalTimeUnit}
            onChange={(e) => {
              props.setAdditionalTimeUnit(e.target.value);
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
