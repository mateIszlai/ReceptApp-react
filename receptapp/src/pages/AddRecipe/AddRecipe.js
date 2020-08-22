import React, { Fragment, useState, useEffect, useContext } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import axios from "../../axios/axios";
import "./AddRecipe.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import NameInput from "../../components/NameInput";
import IngredientList from "../../components/IngredientList/IngredientList";
import IngredientInput from "../../components/IngredientInput/IngredientInput";
import DescriptionList from "../../components/DescriptionList/DescriptionList";

export default function AddRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [description, setDescription] = useState([]);

  const [ingredients, setIngredients] = useState([]);
  const [servings, setServings] = useState(0);
  const [preparationTimeAmount, setPreparationTimeAmount] = useState(0);
  const [preparationTimeUnit, setPreparationTimeUnit] = useState("");
  const [cookTimeAmount, setCookTimeAmount] = useState(0);
  const [cookTimeUnit, setcookTimeUnit] = useState("");
  const [additionalTimeAmount, setadditionalTimeAmount] = useState(0);
  const [additionalTimeUnit, setadditionalTimeUnit] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [show, setShow] = useState(false);
  const [recipeId, setRecipeId] = useState("");
  const user = useContext(UserContext)[0];

  const tryAddRecipe = () => {
    axios
      .post("/Recipes", {
        name: recipeName,
        description: description,
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
        if (response.status === 200) {
          setShow(true);
          setRecipeId(response.data);
        }
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  useEffect(() => {
    setFormValid(
      recipeName.length > 0 &&
        ingredients.length > 0 &&
        description.length > 0 &&
        servings > 0
    );
  }, [
    description.length,
    ingredients.length,
    recipeDescription.length,
    recipeName.length,
    servings,
  ]);

  return (
    <Fragment>
      <div className="add-recipe-page-container">
        <h1>Add a new recipe</h1>
        <form noValidate autoComplete="off">
          <NameInput setRecipeName={setRecipeName} />
          <Box className="textfield-container ingredients-container">
            <h3>Ingredients:</h3>
            <IngredientList
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
            <IngredientInput
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          </Box>
          <Box className="textfield-container" id="description-container">
            <h3>Description:</h3>
            <DescriptionList
              description={description}
              setDescription={setDescription}
            />
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
                  let desc = description.concat(recipeDescription);
                  setDescription(desc);
                }}
              >
                <AddCircleRoundedIcon id="add-icon" fontSize="large" />
              </IconButton>
            </Box>
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
      <Dialog
        onClose={() => setShow(false)}
        aria-labelledby="add-dialog-title"
        open={show}
        className="navigation-dialog"
      >
        <DialogTitle id="add-dialog-title">
          Your recipe has been added successfully
        </DialogTitle>
        <DialogActions>
          <NavLink to={`/recipes/${recipeId}`} exact>
            <Button
              variant="contained"
              className="dialog-close-btn"
              onClick={() => setShow(false)}
            >
              Close
            </Button>
          </NavLink>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
