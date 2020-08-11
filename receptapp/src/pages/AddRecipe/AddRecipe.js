import React, { Fragment, useState } from "react";
import { Box, TextField } from "@material-ui/core";

export default function AddRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");

  return (
    <Fragment>
      <div className="page-container">
        <form noValidate autoComplete="off">
          <Box className="textfield-container">
            <TextField
              className="textfield"
              id="name-input"
              variant="outlined"
              label="Name of the recipe"
              required
              onChange={(e) => {
                setRecipeName(e.target.value);
              }}
            />
          </Box>
          <Box className="textfield-container">
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
        </form>
      </div>
    </Fragment>
  );
}
