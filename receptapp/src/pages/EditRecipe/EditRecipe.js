import React, { Fragment, useEffect, useState, useContext } from "react";
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
import SmallDescriptionInput from "../../components/SmallDescriptionInput";
import "./EditRecipe.css";
import { UserContext } from "../../context/UserContext";
import { DropzoneDialog } from "material-ui-dropzone";
import DeleteDialog from "../../components/Dialogs/DeleteDialog";

export default function EditRecipe() {
  const { recipeId } = useParams();
  const [recipeName, setRecipeName] = useState("");
  const [oldRecipeName, setOldRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [description, setDescription] = useState([]);
  const [servings, setServings] = useState(0);
  const [oldServings, setOldServings] = useState(0);
  const [preparationTimeAmount, setPreparationTimeAmount] = useState(0.0);
  const [preparationTimeUnit, setPreparationTimeUnit] = useState("");
  const [oldPreparationTime, setOldPreparationTime] = useState("");
  const [cookTimeAmount, setCookTimeAmount] = useState(0.0);
  const [cookTimeUnit, setCookTimeUnit] = useState("");
  const [oldCookTime, setOldCookTime] = useState("");
  const [additionalTimeAmount, setAdditionalTimeAmount] = useState(0.0);
  const [additionalTimeUnit, setAdditionalTimeUnit] = useState("");
  const [oldAdditionalTime, setOldAdditionalTime] = useState("");
  const [smallDescription, setSmallDescription] = useState("");
  const [oldSmallDescription, setOldSmallDescription] = useState("");
  const [mainPicture, setMainPicture] = useState(null);
  const [mainPictureUploadOpen, setMainPictureUploadOpen] = useState(false);
  const [uploadSuccessOpen, setUploadSuccessOpen] = useState(false);
  const [deleteRecipeShow, setDeleteRecipeShow] = useState(false);
  const [deleteSuccessShow, setDeleteSuccessShow] = useState(false);
  const [show, setShow] = useState(false);
  const user = useContext(UserContext)[0];

  const tryEditRecipe = () => {
    axios
      .put(`/Recipes/${recipeId}`, {
        name: recipeName,
        smallDescription: smallDescription,
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

  const tryUploadMainImage = (files) => {
    const data = new FormData();
    data.append("file", files[0]);
    data.append("recipeId", recipeId);
    data.append("fileName", files[0].name);
    axios.post("/Images", data).then((response) => {
      if (response.status === 200) {
        uploadSuccessOpen(true);
      }
    });
    setMainPictureUploadOpen(false);
  };

  const tryDelete = () => {
    axios.delete(`/Recipes/${recipeId}`).then((response) => {
      if (response.status === 200) {
        setDeleteSuccessShow(true);
      }
    });
  };

  useEffect(() => {
    axios.get(`/Recipes/${recipeId}`).then((response) => {
      setOldRecipeName(response.data.name);
      setRecipeName(response.data.name);
      setIngredients(response.data.ingredients);
      setDescription(response.data.description);
      setOldServings(response.data.servings);
      setServings(response.data.servings);
      setSmallDescription(response.data.smallDescription);
      setOldSmallDescription(response.data.smallDescription);
      setOldPreparationTime(
        `${response.data.preparationTimeAmount} ${response.data.preparationTimeUnit}`
      );
      setPreparationTimeAmount(response.data.preparationTimeAmount);
      setPreparationTimeUnit(response.data.preparationTimeUnit);
      setCookTimeAmount(response.data.cookTimeAmount);
      setCookTimeUnit(response.data.cookTimeUnit);
      setOldCookTime(
        `${response.data.cookTimeAmount} ${response.data.cookTimeUnit}`
      );
      setAdditionalTimeAmount(response.data.additionalTimeAmount);
      setAdditionalTimeUnit(response.data.additionalTimeUnit);
      setOldAdditionalTime(
        `${response.data.additionalTimeAmount} ${response.data.additionalTimeUnit}`
      );
      setMainPicture(response.data.mainPicture);
    });
  }, [recipeId]);

  return !user.loggedIn ? (
    <Fragment>
      <h2>Please login to this action</h2>
    </Fragment>
  ) : (
    <Fragment>
      <div className="edit-page-container">
        <h1>Edit recipe</h1>
        <form noValidate autoComplete="off">
          <Box className="edit-container">
            <Box>Recipe name: {oldRecipeName}</Box>
            <NameInput setRecipeName={setRecipeName} required={false} />
          </Box>
          <Box className="edit-container">
            <Box>Small Description: {oldSmallDescription}</Box>
            <SmallDescriptionInput
              setSmallDescription={setSmallDescription}
              required={false}
            />
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
            <Box>Servings: {oldServings}</Box>
            <ServingsInput
              servings={servings}
              setServings={setServings}
              required={false}
            />
          </Box>
          <Box className="edit-container">
            <Box>Preparation time: {oldPreparationTime}</Box>
            <PreparationTimeInput
              setPreparationTimeAmount={setPreparationTimeAmount}
              preparationTimeUnit={preparationTimeUnit}
              setPreparationTimeUnit={setPreparationTimeUnit}
            />
          </Box>
          <Box className="edit-container">
            <Box>Cook time: {oldCookTime}</Box>
            <CookTimeInput
              setCookTimeAmount={setCookTimeAmount}
              cookTimeUnit={cookTimeUnit}
              setcookTimeUnit={setCookTimeUnit}
            />
          </Box>
          <Box className="edit-container">
            <Box>Additional time: {oldAdditionalTime}</Box>
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
              disabled={description.length === 0 || ingredients.length === 0}
              color="primary"
            >
              Edit recipe
            </Button>
          </Box>
        </form>
        <Box className="btn-container">
          <Button
            variant="contained"
            id="add-main-image-btn"
            disabled={mainPicture !== null}
            color="primary"
            onClick={() => setMainPictureUploadOpen(true)}
          >
            Upload Main Image
          </Button>
        </Box>
        <Box className="btn-container">
          <Button
            variant="contained"
            id="delete-recipe-btn"
            onClick={() => setDeleteRecipeShow(true)}
            color="secondary"
          >
            Delete recipe
          </Button>
        </Box>
        <MessageNavDialog
          show={show}
          setShow={setShow}
          url={`/recipes/${recipeId}`}
          message="Your recipe has been edited successfully"
        />
        <MessageNavDialog
          show={uploadSuccessOpen}
          setShow={setUploadSuccessOpen}
          url={`/recipes/${recipeId}`}
          message="Your picture has been added successfully"
        />
        <DeleteDialog
          show={deleteRecipeShow}
          setShow={setDeleteRecipeShow}
          toDelete="this recipe"
          tryDelete={tryDelete}
        />
        <MessageNavDialog
          show={deleteSuccessShow}
          setShow={setDeleteSuccessShow}
          url="/recipes"
          message="The recipe deleted successfully"
        />
        <DropzoneDialog
          acceptedFiles={["image/png", "image/jpg", "image/bmp", "image/jpeg"]}
          cancelButtonText={"cancel"}
          submitButtonText={"submit"}
          maxFileSize={5000000}
          open={mainPictureUploadOpen}
          onClose={() => setMainPictureUploadOpen(false)}
          onSave={tryUploadMainImage}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
      </div>
    </Fragment>
  );
}
