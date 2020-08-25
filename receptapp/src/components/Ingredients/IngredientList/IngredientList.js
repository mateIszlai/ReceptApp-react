import React, { Fragment } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import "./IngredientList.css";

export default function IngredientList(props) {
  return (
    <Fragment>
      <Box className="list-container">
        <List className="ingredients-list">
          {props.ingredients.map((item) => (
            <ListItem key={`item-${item.name}`} className="list-item">
              <ListItemText className="list-item-text">
                {`${item.name}: ${item.amount} ${item.unit}`}
              </ListItemText>
              <IconButton
                aria-label="remove-ingredient"
                size="medium"
                onClick={() => {
                  props.setIngredients(
                    props.ingredients.filter((i) => i !== item)
                  );
                }}
              >
                <RemoveCircleIcon
                  fontSize="large"
                  className="remove-ingredient-icon"
                />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Fragment>
  );
}
