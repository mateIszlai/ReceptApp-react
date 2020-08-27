import React, { Fragment } from "react";
import { Card, CardMedia, CardContent } from "@material-ui/core";

export default function MiniRecipe(props) {
  const image = `data:image/png;base64,${props.mainPicture}`;
  return (
    <Fragment>
      <Card className="minirecipe-card">
        {props.mainPicture ? (
          <CardMedia
            className="minirecipe-main-picture"
            title={props.name}
            src={{ uri: image }}
          />
        ) : null}
        <CardContent>
          <p>{props.name}</p>
        </CardContent>
      </Card>
    </Fragment>
  );
}
