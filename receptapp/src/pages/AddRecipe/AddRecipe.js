import React, { Fragment, useState, useEffect } from "react";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  IconButton,
  Button,
} from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import axios from "../../axios/axios";

export default function AddRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState(0.0);
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [validIngredient, setvalidIngredient] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [servings, setServings] = useState(0);

  useEffect(() => {
    setvalidIngredient(
      ingredientName.length > 0 &&
        ingredientAmount > 0 &&
        ingredientUnit.length > 0
    );
  }, [ingredientAmount, ingredientName.length, ingredientUnit.length]);

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
            <h3>Ingredients:</h3>
            <List className="ingredients-list">
              {ingredients.map((item) => (
                <ListItem key={`item-${item.name}`}>
                  <ListItemText>
                    {`${item.name} ${item.quantity.amount} ${item.quantity.unit}`}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
            <Box className="textfield-with-select-container">
              <TextField
                className="textfield"
                id="ingredient-name-input"
                variant="outlined"
                label="Ingredient name"
                onChange={(e) => {
                  setIngredientName(e.target.value);
                }}
              />
              <TextField
                className="textfield"
                id="ingredient-amount-input"
                variant="outlined"
                label="Amount"
                type="number"
                onChange={(e) => setIngredientAmount(e.target.valueAsNumber)}
              />
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
                <MenuItem value={"c"}>cup</MenuItem>
              </Select>
              <IconButton
                aria-label="add-ingredient"
                disabled={!validIngredient}
                onClick={() => {
                  let ingrs = ingredients.concat({
                    name: ingredientName,
                    quantity: {
                      amount: ingredientAmount,
                      unit: ingredientUnit,
                    },
                  });
                  setIngredients(ingrs);
                }}
              >
                <AddCircleRoundedIcon id="add-icon" size="medium" />
              </IconButton>
            </Box>
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
          <Box className="textfield-container">
            <TextField
              className="textfield"
              id="servings-input"
              variant="outlined"
              label="Servings"
              required
              type="number"
              onChange={(e) => {
                setServings(e.target.valueAsNumber);
              }}
            />
          </Box>
        </form>
      </div>
    </Fragment>
  );
}
