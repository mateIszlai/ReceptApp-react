import React, { Fragment, useEffect, useState } from "react";
import axios from "../../axios/axios";
import { useParams } from "react-router";
import { Box, Button } from "@material-ui/core";
import NameInput from "../../components/NameInput";
import IngredientList from "../../components/Ingredients/IngredientList/IngredientList";
import IngredientInput from "../../components/Ingredients/IngredientInput";
import DescriptionList from "../../components/Description/DescriptionList";
import DescriptionInput from "../../components/Description/DescriptionInput";
import ServingsInput from "../../components/Servings/ServingsInput";
import PreparationTimeInput from "../../components/TimeInputs/PreparationTimeInput";
import CookTimeInput from "../../components/TimeInputs/CookTimeInput";
import AdditionalTimeInput from "../../components/TimeInputs/AdditionalTimeInput";
import MessageNavDialog from "../../components/Dialogs/MessageNavDialog";

export default function EditRecipe() {
  const { recipeId } = useParams();
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [description, setDescription] = useState([]);
  const [servings, setServings] = useState(0);
  const [preparationTimeAmount, setPreparationTimeAmount] = useState(0.0);
  const [preparationTimeUnit, setPreparationTimeUnit] = useState("");
  const [cookTimeAmount, setCookTimeAmount] = useState(0.0);
  const [cookTimeUnit, setCookTimeUnit] = useState("");
  const [additionalTimeAmount, setAdditionalTimeAmount] = useState(0.0);
  const [additionalTimeUnit, setAdditionalTimeUnit] = useState("");
  const [show, setShow] = useState(false);

  const tryEditRecipe = () => {
    axios
      .put(`/Recipes/${recipeId}`, {
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
        if (response.status === 204) setShow(true);
      });
  };

  useEffect(() => {
    axios.get(`/Recipes/${recipeId}`).then((response) => {
      setRecipeName(response.data.name);
      setIngredients(response.data.ingredients);
      setDescription(response.data.description);
      setServings(response.data.servings);
    });
  }, [recipeId]);

  return (
    <Fragment>
      <div className="edit-page-container">
        <h1>Edit recipe</h1>
        <form noValidate autoComplete="off">
          <Box className="edit-container">
            <Box>Recipe name: {recipeName}</Box>
            <NameInput setRecipeName={setRecipeName} />
          </Box>
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
          <Box className="edit-container">
            <Box>Servings: {servings}</Box>
            <ServingsInput servings={servings} setServings={setServings} />
          </Box>
          <Box className="edit-container">
            <Box>
              Preparation time: {preparationTimeAmount} {preparationTimeUnit}
            </Box>
            <PreparationTimeInput
              setPreparationTimeAmount={setPreparationTimeAmount}
              preparationTimeUnit={preparationTimeUnit}
              setPreparationTimeUnit={setPreparationTimeUnit}
            />
          </Box>
          <Box className="edit-container">
            <Box>
              Cook time: {cookTimeAmount} {cookTimeUnit}
            </Box>
            <CookTimeInput
              setCookTimeAmount={setCookTimeAmount}
              cookTimeUnit={cookTimeUnit}
              setcookTimeUnit={setCookTimeUnit}
            />
          </Box>
          <Box className="edit-container">
            <Box>
              Additional time: {additionalTimeAmount} {additionalTimeUnit}
            </Box>
            <AdditionalTimeInput
              setAdditionalTimeAmount={setAdditionalTimeAmount}
              additionalTimeUnit={additionalTimeUnit}
              setAdditionalTimeUnit={setAdditionalTimeUnit}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              id="edit-recipe-btn"
              onClick={tryEditRecipe}
            >
              Edit recipe
            </Button>
          </Box>
        </form>
        <MessageNavDialog
          show={show}
          setShow={setShow}
          url={`/recipes/${recipeId}`}
          message="Your recipe has been added successfully"
        />
      </div>
    </Fragment>
  );
}
