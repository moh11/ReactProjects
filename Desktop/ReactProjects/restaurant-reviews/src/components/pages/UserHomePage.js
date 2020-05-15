import React from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  filter_by: {
    display: "flex",
    flexDirection: "row"
  },
  root: {
    width: "90%"
  }
}));

export default class UserHomePage extends React.Component {
  constructor() {
    this.state = {
      filter_rating: 0.5,
      restaurants: []
    }
  }

  componentDidMount() {
    fetchRestaurantList();
  }

  handleFilterByRating() {
    fetchRestaurantList();
  }

  fetchRestaurantList() {
    axios.get(FETCH_ALL_RESTAURANTS_URL).then(response => {
      if(response.data) {
        this.setState = {
          restaurants: response.data.restaurants
        };
      }
    });
  }

  render() {
    const classes = useStyles();
    
    return (
    <div className={classes.root}>
      <div className={classes.filter_by}>
        <label className="filer-by-label"> Filter by: </label>
        <Rating name="half-rating" defaultValue={0.5} precision={0.5} />
      </div>
      <RestaurantList restaurants={this.state.restaurants} />
    </div>
    );
  }
}
