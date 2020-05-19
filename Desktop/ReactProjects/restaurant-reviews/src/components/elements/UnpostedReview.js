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

export default function UnpostedReview(props) {
  const classes = useStyles();

  // State
  const [reviewMessage, setReviewMessage] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date("2020-05-05T21:11:54"));
  const [rating, setRating] = React.useState(3.0);

  // State change handlers
  const handleTextChange = message => {
    setReviewMessage(message.target.value);
  };

  const handleRatingChange = rating => {
    setRating(parseFloat(rating.target.value));
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-multiline-static"
        label="Post Your Review....."
        multiline
        rows={4}
        variant="outlined"
        onChange={handleTextChange}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Date picker dialog"
        format="MM/dd/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
      />
    </MuiPickersUtilsProvider>
      <Rating
        name="simple-controlled"
        className={classes.rate}
        value={rating}
        precision={0.5}
        onChange={handleRatingChange}
      />
      <Button variant="contained" color="primary" className={classes.button} onClick={() => props.handleClick(reviewMessage, rating, selectedDate)}>
        POST REVIEW
      </Button>
    </div>
  );
}

// Uses parent component handler
UnpostedReview.propTyes = {
  handleClick: PropTypes.func
};