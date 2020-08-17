import React, { Fragment } from "react";
import { Card, CardMedia, CardContent } from "@material-ui/core";

export default function MiniRecipe(props) {
  const image = `data:image/png;base64,${props.mainPicture}`;
  return (
    <Fragment>
      <Card className="minirecipe-card">
        <CardMedia
          className="minirecipe-main-picture"
          title={props.name}
          src={{ uri: image }}
        />
        <CardContent>
          <p>{props.name}</p>
        </CardContent>
      </Card>
    </Fragment>
  );
}
