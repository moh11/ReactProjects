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
    },
    marginLeft: "10%"
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

export default function UnpostedReply(props) {
  const classes = useStyles();

  // State
  const [reviewMessage, setReviewMessage] = React.useState("");

  // State change handlers
  const handleTextChange = message => {
    setReviewMessage(message.target.value);
  };

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-multiline-static"
        label="Post Your Reply....."
        multiline
        rows={4}
        variant="outlined"
        onChange={handleTextChange}
      />
      <Button variant="contained" color="primary" className={classes.button} onClick={() => props.handleClick(reviewMessage, props.reviewId, props.restaurantId)}>
        POST REPLY
      </Button>
    </div>
  );
}

UnpostedReply.propTyes = {
  reviewId: PropTypes.string,
  restaurantId: PropTypes.string
};

UnpostedReply.defaultProps = {
  reviewId: "",
  restaurantId: ""
};
