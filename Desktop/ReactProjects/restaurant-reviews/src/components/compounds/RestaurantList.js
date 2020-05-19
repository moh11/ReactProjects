import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import RestaurantCard from "../elements/RestaurantCard.js";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  spacing: [0, 2, 8, 100, 200, 300],
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
  deleteButton: {
    backgroundColor: "red",
    float: "right",
    cursor: "pointer"
  },
  divider: {
    maxWidth: "70%"
  }
}));

export default function RestaurantList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.restaurants && props.restaurants.length > 0 ?
      <div>
      <GridList cols={1}>
        {props.restaurants.map((restaurant, index) => (
          <div key={index}>
            <GridListTile>
              <RestaurantCard
                restaurant={restaurant.restaurant}
                rating={restaurant.ratingAvg}
              />
            </GridListTile>
            <Box m={3} />
          </div>
        ))}
      </GridList>
      <div styles={{align: "center" }}> ~~~~ End of results ~~~~</div></div> :
      <h1> No restaurants to show</h1>
      }
    </div>
  );
}

RestaurantList.propTypes = {
  restaurants: PropTypes.array
};

RestaurantList.defaultProps = {
  restaurants: []
};
