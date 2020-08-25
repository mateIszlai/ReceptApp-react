import React, { Fragment } from "react";
import { Box, TextField, Select, MenuItem } from "@material-ui/core";

export default function PreparationTimeInput(props) {
  return (
    <Fragment>
      <Box className="textfield-with-select-container time-container">
        <Box className="textfield-with-select">
          <TextField
            className="textfield-with-select"
            id="preparation-time-input"
            variant="outlined"
            label="Preparation time"
            type="number"
            onChange={(e) => {
              props.setPreparationTimeAmount(e.target.valueAsNumber);
            }}
          />
        </Box>
        <Box className="select-container">
          <Select
            className="time-unit-select"
            value={props.preparationTimeUnit}
            onChange={(e) => {
              props.setPreparationTimeUnit(e.target.value);
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
