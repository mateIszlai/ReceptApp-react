import React, { Fragment } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";
import { NavLink, useHistory } from "react-router-dom";

export default function SuccessNavDialog(props) {
  const history = useHistory();
  return (
    <Fragment>
      <Dialog
        onClose={() => {
          props.setShow(false);
          history.push(props.url);
        }}
        aria-labelledby="add-dialog-title"
        open={props.show}
        className="navigation-dialog"
      >
        <DialogTitle id="add-dialog-title">{props.message}</DialogTitle>
        <DialogActions>
          <NavLink to={props.url} exact>
            <Button
              variant="contained"
              className="dialog-close-btn"
              onClick={() => props.setShow(false)}
            >
              Close
            </Button>
          </NavLink>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
