import React, { Fragment, useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import axios from "../../axios/axios";
import "./AddRecipe.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import NameInput from "../../components/NameInput";
import IngredientList from "../../components/Ingredients/IngredientList/IngredientList";
import IngredientInput from "../../components/Ingredients/IngredientInput";
import DescriptionList from "../../components/Description/DescriptionList";
import DescriptionInput from "../../components/Description/DescriptionInput";
import ServingsInput from "../../components/Servings/ServingsInput";
import PreparationTimeInput from "../../components/TimeInputs/PreparationTimeInput";
import CookTimeInput from "../../components/TimeInputs/CookTimeInput";
import AdditionalTimeInput from "../../components/TimeInputs/AdditionalTimeInput";

export default function AddRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState([]);

  const [ingredients, setIngredients] = useState([]);
  const [servings, setServings] = useState(0);
  const [preparationTimeAmount, setPreparationTimeAmount] = useState(0);
  const [preparationTimeUnit, setPreparationTimeUnit] = useState("");
  const [cookTimeAmount, setCookTimeAmount] = useState(0);
  const [cookTimeUnit, setcookTimeUnit] = useState("");
  const [additionalTimeAmount, setAdditionalTimeAmount] = useState(0);
  const [additionalTimeUnit, setAdditionalTimeUnit] = useState("");
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
  }, [description.length, ingredients.length, recipeName.length, servings]);

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
            <DescriptionInput
              description={description}
              setDescription={setDescription}
            />
          </Box>
          <ServingsInput servings={servings} setServings={setServings} />
          <PreparationTimeInput
            setPreparationTimeAmount={setPreparationTimeAmount}
            preparationTimeUnit={preparationTimeUnit}
            setPreparationTimeUnit={setPreparationTimeUnit}
          />
          <CookTimeInput
            setCookTimeAmount={setCookTimeAmount}
            cookTimeUnit={cookTimeUnit}
            setcookTimeUnit={setcookTimeUnit}
          />
          <AdditionalTimeInput
            setAdditionalTimeAmount={setAdditionalTimeAmount}
            additionalTimeUnit={additionalTimeUnit}
            setAdditionalTimeUnit={setAdditionalTimeUnit}
          />
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
