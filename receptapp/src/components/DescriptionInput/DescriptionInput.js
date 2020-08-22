import React, { Fragment, useState } from "react";
import { Box, TextField, IconButton } from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

export default function DescriptionInput(props) {
  const [recipeDescription, setRecipeDescription] = useState("");

  return (
    <Fragment>
      <Box className="textfield-with-select-container">
        <Box>
          <TextField
            className="textfield"
            id="description-input"
            variant="outlined"
            label=" Description"
            required
            multiline
            onChange={(e) => {
              setRecipeDescription(e.target.value);
            }}
          />
        </Box>
        <IconButton
          aria-label="add-description-step"
          disabled={recipeDescription.length === 0}
          onClick={() => {
            let desc = props.description.concat(recipeDescription);
            props.setDescription(desc);
          }}
        >
          <AddCircleRoundedIcon id="add-icon" fontSize="large" />
        </IconButton>
      </Box>
    </Fragment>
  );
}
