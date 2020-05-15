import "date-fns";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "90%"
    }
  },
  button: {
    display: "block",
    marginLeft: "100"
  }
}));

export default function UnpostedReview() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-multiline-static"
        label="Post Your Review....."
        multiline
        rows={4}
        variant="outlined"
      />
      <Button variant="contained" color="primary" className={classes.button}>
        POST REPLY
      </Button>
    </div>
  );
}
