import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles(theme => ({
  root: {},
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  rate: {
    marginLeft: "10"
  }
}));

// Child Components
function RestaurantRating(props) {
  if (props.rating > 0) {
    return (
      <div className={props.classes.rate}>
        <Rating
          name="half-rating-read"
          defaultValue={props.rating}
          precision={0.5}
          readOnly
        />
      </div>
    );
  } else {
    return (
      <div className={props.classes.rate}>
        {" "}
        <i>Not Rated yet </i>
      </div>
    );
  }
}

export default function RestaurantCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={props.title} />
      <RestaurantRating rating={props.rating} classes={classes} />
      <CardMedia className={classes.media} image={props.image} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

RestaurantCard.propTyes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  description: PropTypes.string.isRequired,
  rating: PropTypes.float
};

RestaurantCard.defaultProps = {
  image: "/static/images/cards/paella.jpg",
  rating: 0.0
};
