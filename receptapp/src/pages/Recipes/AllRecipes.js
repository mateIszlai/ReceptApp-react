import React, { Fragment, useEffect, useState } from "react";
import axios from "../../axios/axios";
import { Box } from "@material-ui/core";
import MiniRecipe from "../../components/MiniRecipe/MiniRecipe";
import { NavLink } from "react-router-dom";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("/Recipes")
      .then((response) => {
        if (response.status === 200) setRecipes(response.data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, []);
  return recipes.length === 0 ? (
    <Fragment>
      <h2>There are no recipes yet, please add one</h2>
    </Fragment>
  ) : (
    <Fragment>
      <div id="recipes-page-container">
        <Box id="recipes-container">
          {recipes.map((recipe) => (
            <Box key={recipe.id} className="minirecipe-container">
              <NavLink to={`/recipes/${recipe.id}`}>
                <MiniRecipe name={recipe.name} />
              </NavLink>
            </Box>
          ))}
        </Box>
      </div>
    </Fragment>
  );
}
