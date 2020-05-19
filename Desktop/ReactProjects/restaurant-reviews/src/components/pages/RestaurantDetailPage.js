import React from "react";
import axios from "axios";
import RestaurantCard from "../elements/RestaurantCard.js";
import Review from "../elements/Review.js";
import { withStyles } from '@material-ui/styles';
import UnpostedReview from "../elements/UnpostedReview.js";
import ReviewAndReplyList from "../compounds/ReviewAndReplyList.js";
import { API } from "../../utils/config.js";
import { Box } from "@material-ui/core";
import Auth from "../../middleware/auth.js";

const styles = theme => ({
  spacing: [0, 2, 8, 100, 200, 300],
  divider: {
    maxWidth: "70%"
  }, root: {
    marginLeft: "10%"
  }
});

class RestaurantDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {},
      bestReview: {},
      worstReview: {},
      ownReview: {},
      allReviews: [],
      rating: 0.0,
      isOwner: false
    };
    this.handlePostReview = this.handlePostReview.bind(this);
    this.handlePostReply = this.handlePostReply.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    const fetchRestaurantURL =
      API.FETCH_RESTAURANT_DETAILS_URL + "/" + this.props.match.params.id;
    axios.get(fetchRestaurantURL, {
      headers: {
          'authorization': "Bearer " + Auth.getToken(),
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  }).then(response => {
      if (response.data) {
        this.setState({
          restaurant: response.data.restaurant,
          rating: response.data.rating
        }, () => {
          if(this.state.restaurant && this.state.restaurant.ownerId === Auth.getUserId()) {
            this.setState({
              isOwner: true
            });
        }});
      }
    }); 

    const fetchReviewsAndRepliesURL =
      API.FETCH_REVIEWS_AND_REPLIES_URL + "/" + this.props.match.params.id;

    axios.get(fetchReviewsAndRepliesURL, {
      headers: {
          'authorization': "Bearer " + Auth.getToken(),
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  }).then(response => {
      if (response.data && response.data.reviews) {
        this.setState({
          bestReview: response.data.bestReview,
          worstReview: response.data.worstReview,
          ownReview: response.data.ownReview,
          allReviews: response.data.reviews
        });
      }
    }, error => {
      console.log("Could not fetch reviews data");
    });
  }

  handlePostReview(message, rating, selectedDate) {
    const dataToSubmit = {
      message: message,
      rating: rating,
      dateOfReview: selectedDate,
      restaurantId: this.props.match.params.id
    };
    axios.post(API.POST_REVIEW, dataToSubmit, {
      headers: {
          'authorization': "Bearer " + Auth.getToken(),
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  }).then(response => {
      if (response.data && response.data.isSuccess) {
        this.refresh();
      } else {
        alert("Could not post review");
      }
    }, errors => {
      alert("Could not post review")
    });
  }

  handlePostReply(message, reviewId, _restaurantId) {
    const dataToSubmit = {
      message: message,
      reviewId: reviewId,
      restaurantId: this.props.match.params.id
    };
    axios.post(API.POST_REPLY, dataToSubmit, {
      headers: {
          'authorization': "Bearer " + Auth.getToken(),
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  }).then(response => {
      if (response.data && response.data.isSuccess) {
        this.refresh();
      } else {
        alert("Could not post reply");
      }
    }, error => {
      alert("Could not post reply");
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h1 className={classes.heading}> EXPLORE RESTAURANT DETAILS </h1> 
        <RestaurantCard restaurant={this.state.restaurant} rating={this.state.rating} dontShowClickButton={true} />
        <Box m={3} />
        <div> <b><i> Best rated review </i></b></div>
        { this.state.bestReview && this.state.bestReview._id ? 
            <Review review={this.state.bestReview} />:
            <div> No Reviews for this restaurant</div>
        }
        <Box m={2} />
        <div> <b> <i> Worst rated review </i> </b></div>
        { this.state.worstReview && this.state.worstReview._id ?
           <Review review={this.state.worstReview} /> :
           <div> No Reviews for this restaurant</div>
        }
        <Box m={2} />
        { !this.state.isOwner && (!this.state.ownReview || !this.state.ownReview._id) && <div> <b> <i> Your review </i> </b></div> }
        { !this.state.isOwner && (!this.state.ownReview || !this.state.ownReview._id) && <UnpostedReview handleClick={this.handlePostReview}/>}
        <Box m={2} />
        <div> <b> <i> All reviews </i> </b></div>
        <ReviewAndReplyList
          reviews={this.state.allReviews}
          showReplies={true}
          showOnlyPostedReplies={!this.state.isOwner}
          handleClick={this.handlePostReply}
        />
      </div>
    );
  }
}

export default withStyles(styles)(RestaurantDetailPage);
