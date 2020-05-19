import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles({
  root: {
    width: "90%",
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  rate: {
    display: "inline",
    float: "right"
  },
  deleteButton: {
    backgroundColor: "red",
    float: "right",
    cursor: "pointer"
  }
});

export default function Review(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.rate}>
          { props.review.rating &&
          <Rating
            name="half-rating-read"
            value={props.review.rating}
            precision={0.5}
            readOnly 
          />}
        </div>
        <Typography variant="h5" component="h4">
          {props.review.name}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Visited <b>{props.review && props.review.restaurantName ? props.review.restaurantName : ""}</b> on: {new Date(props.review.dateOfVisit).toLocaleDateString("en-US")}
        </Typography>
        <Typography variant="body2" component="p">
          {props.review.message}
        </Typography>
      </CardContent>
    </Card>
  );
}

Review.propTyes = {
  review: PropTypes.object
};

Review.defaultProps = {
  review: {}
};
