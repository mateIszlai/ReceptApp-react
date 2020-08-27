import React, { Fragment } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";

export default function DeleteDialog(props) {
  return (
    <Fragment>
      <Dialog
        onClose={() => props.setShow(false)}
        aria-labelledby="delete-dialog-title"
        open={props.show}
        className="navigation-dialog"
      >
        <DialogTitle id="delete-dialog-title">
          Are you sure you want to delete {props.toDelete}?
        </DialogTitle>
        <DialogActions>
          <Button
            className="dialog-close-btn"
            color="primary"
            onClick={() => props.setShow(false)}
          >
            Close
          </Button>
          <Button
            id="dialog-delete-btn"
            color="secondary"
            onClick={props.tryDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
