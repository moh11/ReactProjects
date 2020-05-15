import "date-fns";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "90%"
    }
  },
  rate: {
    marginTop: "10px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "row"
  },
  button: {
    display: "block",
    marginLeft: "100"
  }
}));

export default function UnpostedReview() {
  const classes = useStyles();

  // State
  const [reviewMessage, setReviewMessage] = React.useState("");
  const [dateOfVisit, setDateOfVisit] = React.useState(new Date());
  const [rating, setRating] = React.useState(3.0);

  // State change handlers
  const handleRatingChange = givenRating => {
    setRating(givenRating);
  };

  const handleDateChange = date => {
    setDateOfVisit(date);
  };

  const handlePostReviewClick = e => {
    console.log(e);
  };

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-multiline-static"
        label="Post Your Review....."
        multiline
        rows={4}
        variant="outlined"
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-inline"
          label="Date of visit"
          format="MM/dd/yyyy"
          value={dateOfVisit}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
          maxDate={new Date()}
        />
      </MuiPickersUtilsProvider>
      <Rating
        name="simple-controlled"
        className={classes.rate}
        value={rating}
        precision={0.5}
        onChange={handleRatingChange}
      />
      <Button variant="contained" color="primary" className={classes.button}>
        POST REVIEW
      </Button>
    </div>
  );
}
