import React from "react";
import PropTypes from "prop-types";
import RestaurantCard from "./elements/RestaurantCard.js";
import Review from "./elements/Review.js";
import UnpostedReview from "./elements/UnpostedReview.js";
import CommentAndReplyList from "./compounds/ReviewAndReplyList.js";

class ReviewAndReplyList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <RestaurantCard />
        <Review />
        <Review />
        <UnpostedReview />
        <>
      </div>
    );
  }
}

ReviewAndReplyList.propTypes = {
  comments: PropTypes.array
}

ReviewAndReplyList.defaultProps = {
  comments: []
}
