import React, { Fragment } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";

export default function MessageDialog(props) {
  return (
    <Fragment>
      <Dialog
        onClose={() => props.setShow(false)}
        aria-labelledby="login-error-dialog-title"
        open={props.show}
        className="navigation-dialog"
      >
        <DialogTitle id="login-error-dialog-title">{props.message}</DialogTitle>
        <DialogActions>
          <Button
            className="dialog-close-btn"
            color="primary"
            onClick={() => props.setShow(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
