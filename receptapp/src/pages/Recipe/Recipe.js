import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "../../axios/axios";
import "./Recipe.css";
import { UserContext } from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import { Button, Card, Box, CardHeader, CardContent } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

export default function Recipe() {
  const [recipeData, setRecipeData] = useState(null);
  const [mins, setMins] = useState(0);
  const [hours, setHours] = useState(0);
  const { recipeId } = useParams();
  const user = useContext(UserContext)[0];

  useEffect(() => {
    axios
      .get(`/Recipes/${recipeId}`)
      .then((response) => {
        if (response.status === 200) {
          let min = 0;
          let hour = 0;
          setRecipeData(response.data);
          if (response.data.preparationTimeAmount !== 0) {
            response.data.preparationTimeUnit === "min"
              ? (min += response.data.preparationTimeAmount)
              : (hour = +response.data.preparationTimeAmount);
          }
          if (response.data.cookTimeAmount !== 0) {
            response.data.cookTimeUnit === "min"
              ? (min += response.data.cookTimeAmount)
              : (hour += response.data.cookTimeAmount);
          }
          if (response.data.additionalTimeAmount !== 0) {
            response.data.additionalTimeUnit === "min"
              ? (min += response.data.additionalTimeAmount)
              : (hour += response.data.additionalTimeAmount);
          }
          while (min > 59) {
            min -= 60;
            hour += 1;
          }
          setMins(min);
          setHours(hour);
        }
      })
      .catch((error) => console.log(`Error: ${error}`));
  }, [hours, mins, recipeId]);
  return recipeData ? (
    <Fragment>
      <h2>{recipeData.name}</h2>
      <p id="small-description">{recipeData.smallDescription}</p>
      <p id="by-user">By {recipeData.userName}</p>
      {hours > 0 || mins > 0 ? (
        <Box className="card-container">
          <Card variant="outlined" id="time-card">
            <CardHeader
              id="time-card-header"
              avatar={<AccessTimeIcon fontSize="large" />}
            />
            <CardContent id="time-card-content">
              <Box className="time-card-text">
                <h4>Prep:</h4>
                <p>
                  {recipeData.preparationTimeAmount}{" "}
                  {recipeData.preparationTimeUnit}
                </p>
              </Box>
              <Box className="time-card-text">
                <h4>Cook:</h4>
                <p>
                  {recipeData.cookTimeAmount} {recipeData.cookTimeUnit}
                </p>
              </Box>
              <Box className="time-card-text">
                <h4>Additional:</h4>
                <p>
                  {recipeData.additionalTimeAmount}{" "}
                  {recipeData.additionalTimeUnit}
                </p>
              </Box>
              <Box className="time-card-text">
                <h4>Total:</h4>
                <p>
                  {hours > 0 ? `${hours} hours ` : null}
                  {mins} mins
                </p>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ) : null}
      {user.userName === recipeData.userName ? (
        <NavLink to={`/recipes/${recipeId}/edit`}>
          <Button id="nav-to-edit-recipe" variant="contained" color="primary">
            Edit Recipe
          </Button>
        </NavLink>
      ) : null}
    </Fragment>
  ) : null;
}
