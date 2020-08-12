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
import "./AddRecipe.css";

export default function AddRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState(0.0);
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [validIngredient, setvalidIngredient] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [servings, setServings] = useState(0);
  const [preparationTimeAmount, setPreparationTimeAmount] = useState(0);
  const [preparationTimeUnit, setPreparationTimeUnit] = useState("");
  const [cookTimeAmount, setCookTimeAmount] = useState(0);
  const [cookTimeUnit, setcookTimeUnit] = useState("");
  const [additionalTimeAmount, setadditionalTimeAmount] = useState(0);
  const [additionalTimeUnit, setadditionalTimeUnit] = useState("");
  const [formValid, setFormValid] = useState(false);

  const tryAddRecipe = () => {
    axios
      .post("/Recipes", {
        name: recipeName,
        description: recipeDescription,
        preparationTimeAmount: preparationTimeAmount,
        preparationTimeUnit: preparationTimeUnit,
        cookTimeAmount: cookTimeAmount,
        cookTimeUnit: cookTimeUnit,
        additionalTimeAmount: additionalTimeAmount,
        additionalTimeUnit: additionalTimeUnit,
        servings: servings,
        ingredients: ingredients,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  useEffect(() => {
    setvalidIngredient(
      ingredientName.length > 0 &&
        ingredientAmount > 0 &&
        ingredientUnit.length > 0
    );
  }, [ingredientAmount, ingredientName.length, ingredientUnit.length]);

  useEffect(() => {
    setFormValid(
      recipeName.length > 0 &&
        ingredients.length > 0 &&
        recipeDescription.length > 0 &&
        servings > 0
    );
  }, [
    ingredients.length,
    recipeDescription.length,
    recipeName.length,
    servings,
  ]);

  return (
    <Fragment>
      <div className="add-recipe-page-container">
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
          <Box className="textfield-container ingredients-container">
            <h3>Ingredients:</h3>
            <Box className="list-container">
              <List className="ingredients-list">
                {ingredients.map((item) => (
                  <ListItem key={`item-${item.name}`} className="list-item">
                    <ListItemText className="list-item-text">
                      {`${item.name}: ${item.quantity.amount} ${item.quantity.unit}`}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Box>
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
                  <MenuItem value={"c"}>cup</MenuItem>
                </Select>
              </Box>
              <IconButton
                aria-label="add-ingredient"
                size="medium"
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
                <AddCircleRoundedIcon id="add-icon" fontSize="large" />
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
          <Box className="textfield-with-select-container time-container">
            <Box className="textfield-with-select">
              <TextField
                className="textfield-with-select"
                id="preparation-time-input"
                variant="outlined"
                label="Preparation time"
                type="number"
                onChange={(e) => {
                  setPreparationTimeAmount(e.target.valueAsNumber);
                }}
              />
            </Box>
            <Box className="select-container">
              <Select
                className="time-unit-select"
                value={preparationTimeUnit}
                onChange={(e) => {
                  setPreparationTimeUnit(e.target.value);
                }}
              >
                <MenuItem value={"hour"}>hour</MenuItem>
                <MenuItem value={"min"}>min</MenuItem>
              </Select>
            </Box>
          </Box>
          <Box className="textfield-with-select-container time-container">
            <Box className="textfield-with-select">
              <TextField
                id="cook-time-input"
                variant="outlined"
                label="Cook time"
                type="number"
                onChange={(e) => {
                  setCookTimeAmount(e.target.valueAsNumber);
                }}
              />
            </Box>
            <Box className="select-container">
              <Select
                className="time-unit-select"
                value={cookTimeUnit}
                onChange={(e) => {
                  setcookTimeUnit(e.target.value);
                }}
              >
                <MenuItem value={"hour"}>hour</MenuItem>
                <MenuItem value={"min"}>min</MenuItem>
              </Select>
            </Box>
          </Box>
          <Box className="textfield-with-select-container time-container">
            <Box className="textfield-with-select">
              <TextField
                id="additional-time-input"
                variant="outlined"
                label="Additional time"
                type="number"
                onChange={(e) => {
                  setadditionalTimeAmount(e.target.valueAsNumber);
                }}
              />
            </Box>
            <Box className="select-container">
              <Select
                className="time-unit-select"
                value={additionalTimeUnit}
                onChange={(e) => {
                  setadditionalTimeUnit(e.target.value);
                }}
              >
                <MenuItem value={"hour"}>hour</MenuItem>
                <MenuItem value={"min"}>min</MenuItem>
              </Select>
            </Box>
          </Box>
          <Box>
            <Button
              variant="contained"
              id="add-recipe-btn"
              onClick={tryAddRecipe}
              disabled={!formValid}
            >
              Add recipe
            </Button>
          </Box>
        </form>
      </div>
    </Fragment>
  );
}
