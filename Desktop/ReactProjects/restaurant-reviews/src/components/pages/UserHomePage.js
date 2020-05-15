import React, { useState } from "react";
import PropTypes from "prop-types";
import "./RestaurantList.css";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Divider from "@material-ui/core/Divider";
import RestaurantCard from "../../elements/RestaurantCard.js";

const useStyles = makeStyles(theme => ({
  filter_by: {
    display: "flex",
    flexDirection: "row"
  },
  root: {
    width: "90%"
  }
}));

export default function RestaurantList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.filter_by}>
        <label className="filer-by-label"> Filter by: </label>
        <Rating name="half-rating" defaultValue={0.5} precision={0.5} />
      </div>
      <GridList cols={1}>
        {props.restaurants.map((restaurant, index) => (
          <div key={index}>
            <GridListTile>
              <RestaurantCard
                title={restaurant.title}
                description={restaurant.description}
                rating={restaurant.rating}
              />
            </GridListTile>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </GridList>
    </div>
  );
}

RestaurantList.propTypes = {
  restaurants: PropTypes.array
};

RestaurantList.defaultProps = {
  restaurants: []
};
