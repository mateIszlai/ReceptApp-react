import React, { Fragment } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

export default function DescriptionList(props) {
  return (
    <Fragment>
      <Box className="list-container">
        <List className="description-list">
          {props.description.map((item, index) => (
            <ListItem key={`item-${item}`} className="list-item">
              <ListItemText className="list-item-text">
                {`${index + 1}. ${item}`}
              </ListItemText>
              {index === props.description.length - 1 ? (
                <IconButton
                  aria-label="remove-ingredient"
                  size="medium"
                  onClick={() => {
                    props.setDescription(
                      props.description.filter((i) => i !== item)
                    );
                  }}
                >
                  <RemoveCircleIcon
                    fontSize="large"
                    className="remove-ingredient-icon"
                  />
                </IconButton>
              ) : null}
            </ListItem>
          ))}
        </List>
      </Box>
    </Fragment>
  );
}
