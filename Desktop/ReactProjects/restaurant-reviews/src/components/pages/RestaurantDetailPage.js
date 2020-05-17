import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import RestaurantCard from "./elements/RestaurantCard.js";
import Review from "./elements/Review.js";
import UnpostedReview from "./elements/UnpostedReview.js";
import ReviewAndReplyList from "./compounds/ReviewAndReplyList.js";
import { API } from "../../utils/config.js";

function PostedOrUnpostedReview(props) {
  if (props.review && props.review.id) {
    return <Review review={this.props.review} />;
  } else {
    return <UnpostedReview handlePostReview={this.props.handlePostReview} />;
  }
}

class RestaurantDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantDetails: {},
      bestReview: {},
      worstReview: {},
      ownReview: {},
      allReviews: []
    };
    this.handlePostReview = this.handlePostReview.bind(this);
    this.handlePostReply = this.handlePostReply.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    const fetchRestaurantURL =
      API.FETCH_RESTAURANT_DETAILS_URL + "?id=" + this.props.id;
    const fetchReviewsAndRepliesURL =
      API.FETCH_REVIEWS_AND_REPLIES_URL + "?id=" + this.props.id;

    Promise.all([
      axios.get(fetchRestaurantURL),
      axios.get(fetchReviewsAndRepliesURL)
    ]).then((restaurantsResponse, reviewsAndRepliesResponse) => {
      if (restaurantsResponse.data) {
        this.setState({
          restaurantDetails: restaurantsResponse.data.restaurantDetails
        });
      }
      if (restaurantsResponse.data) {
        this.setState({
          bestReview: restaurantsResponse.data.bestReview,
          worstReview: restaurantsResponse.data.worstReview,
          ownReview: restaurantsResponse.data.ownReview,
          allReviews: restaurantsResponse.data.allReviews
        });
      }
    });
  }

  handlePostReview() {
    this.refresh();
  }

  handlePostReply() {
    this.refresh();
  }

  render() {
    return (
      <div>
        <RestaurantCard restaurantDetails={this.state.restaurantDetails} />
        <Review review={this.state.bestReview} />
        <Review review={this.state.bestReview} />
        <PostedOrUnpostedReview
          review={this.state.ownReview}
          handlePostReview={this.handlePostReview}
        />
        <ReviewAndReplyList
          reviews={this.state.allReviews}
          handlePostReply={this.handlePostReply}
        />
      </div>
    );
  }
}

RestaurantDetailPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default RestaurantDetailPage;
