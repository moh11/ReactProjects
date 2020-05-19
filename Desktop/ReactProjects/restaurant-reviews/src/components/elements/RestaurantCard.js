import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  filter_by: {
    display: "flex",
    flexDirection: "row"
  },
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
  detailsButton: {
    backgroundColor: "red",
    float: "right",
    cursor: "pointer"
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

  // state variables
  const [redirect, setRedirect] = useState(false);

  // constants
  const restaurantRating = props.rating ? props.rating : 0.0;
  const restaurantId = (props.restaurant && props.restaurant._id) ? props.restaurant._id : "";
  const redirectLink = "/restaurant/details/" + restaurantId;

  // Go to details page
  const handleClick = () => {
    setRedirect(true);
  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={redirectLink} />
    }
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.rate}>
          <RestaurantRating classes={classes} rating={restaurantRating} />
        </div>
        <Typography variant="h5" component="h4">
        {props.restaurant && props.restaurant.name ? props.restaurant.name : ""}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.restaurant && props.restaurant.address ? props.restaurant.address : ""}
        </Typography>
        <Typography variant="body2" component="p">
        {props.restaurant && props.restaurant.description ? props.restaurant.description : ""}
        </Typography>
      </CardContent>
      <CardActions>
        {renderRedirect()}
        {props.dontShowClickButton ? <div /> :
        <Button size="small" className={classes.detailsButton} onClick={handleClick}>
          RESTAURANT DETAILS
        </Button>}
      </CardActions>
    </Card>
  );
}

RestaurantCard.propTypes = {
  restaurant: PropTypes.object,
  dontShowClickButton: PropTypes.bool
}

RestaurantCard.defaultProps = {
  restaurant: {},
  dontShowClickButton: false
}