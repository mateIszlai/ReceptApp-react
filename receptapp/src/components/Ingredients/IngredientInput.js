import React, { Fragment, useState, useEffect } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

export default function IngredientInput(props) {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState(0.0);
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [validIngredient, setvalidIngredient] = useState(false);

  useEffect(() => {
    setvalidIngredient(
      ingredientName.length > 0 &&
        ingredientAmount > 0 &&
        ingredientUnit.length > 0
    );
  }, [ingredientAmount, ingredientName.length, ingredientUnit.length]);

  return (
    <Fragment>
      <Box className="textfield-with-select-container">
        <Box className="textfield-with-select">
          <TextField
            id="ingredient-name-input"
            variant="outlined"
            label="Ingredient name"
            onChange={(e) => {
              setIngredientName(e.target.value);
            }}
          />
        </Box>
        <Box className="textfield-with-select">
          <TextField
            id="ingredient-amount-input"
            variant="outlined"
            label="Amount"
            type="number"
            onChange={(e) => setIngredientAmount(e.target.valueAsNumber)}
          />
        </Box>
        <Box className="select-container">
          <Select
            id="ingredient-unit-select"
            value={ingredientUnit}
            onChange={(e) => setIngredientUnit(e.target.value)}
          >
            <MenuItem value={"g"}>gram</MenuItem>
            <MenuItem value={"dkg"}>decagram</MenuItem>
            <MenuItem value={"kg"}>kilogram</MenuItem>
            <MenuItem value={"tbs"}>tablespoon</MenuItem>
            <MenuItem value={"tsp"}>teaspoon</MenuItem>
            <MenuItem value={"pinch"}>pinch</MenuItem>
            <MenuItem value={"l"}>liter</MenuItem>
            <MenuItem value={"dl"}>deciliter</MenuItem>
            <MenuItem value={"cl"}>centiliter</MenuItem>
            <MenuItem value={"ml"}>milliliter</MenuItem>
            <MenuItem value={"cup"}>cup</MenuItem>
            <MenuItem value={"cups"}>cups</MenuItem>
            <MenuItem value={"piece"}>piece</MenuItem>
            <MenuItem value={"pieces"}>pieces</MenuItem>
          </Select>
        </Box>
        <IconButton
          aria-label="add-ingredient"
          size="medium"
          disabled={!validIngredient}
          onClick={() => {
            let ingrs = props.ingredients.concat({
              name: ingredientName,
              amount: ingredientAmount,
              unit: ingredientUnit,
            });
            props.setIngredients(ingrs);
          }}
        >
          <AddCircleRoundedIcon id="add-icon" fontSize="large" />
        </IconButton>
      </Box>
    </Fragment>
  );
}
