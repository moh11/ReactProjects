import React from "react";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import { withStyles } from '@material-ui/styles';
import { API } from "../../utils/config";
import RestaurantList from "../compounds/RestaurantList";
import Auth from "../../middleware/auth";

const styles = theme => ({
  filter_by: {
    display: "flex",
    flexDirection: "row"
  },
  root: {
    width: "90%",
    marginLeft: "10%"
  },
  results: {
    marginLeft: "5px"
  }
});

class UserHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0.0,
      restaurants: []
    }
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }

  handleRatingChange(rating) {
    this.setState({ rating: parseFloat(rating.target.value)}, () => { this.fetchRestaurantList(); });
  }

  componentDidMount() {
    this.fetchRestaurantList();
  }

  fetchRestaurantList() {
    console.log("fetching list");
    axios.get(API.FETCH_ALL_RESTAURANTS_URL + "?minRating=" + this.state.rating,{
      headers: {
          'authorization': "Bearer " + Auth.getToken(),
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  }).then(response => {
      if(response.data) {
        this.setState({restaurants: response.data.restaurants});
      }
    });
  }

  render() {
    const { classes } = this.props;
    
    return (
    <div className={classes.root}>
      <div className={classes.filter_by}>
        <label className="filer-by-label"> Filter by: </label>
        <Rating name="half-rating" defaultValue={this.state.rating} precision={0.5} onChange={this.handleRatingChange}/>
        <div className={classes.results}> Showing results for {this.state.rating} + rating </div>
      </div>
      <RestaurantList restaurants={this.state.restaurants} history={this.props.history} />
    </div>
    );
  }
}

export default withStyles(styles)(UserHomePage);
