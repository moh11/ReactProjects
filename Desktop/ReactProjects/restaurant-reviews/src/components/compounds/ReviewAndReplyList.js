import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Review from "../elements/Review.js";
import Reply from "../elements/Reply.js";
import UnpostedReply from "../elements/UnpostedReply.js";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  spacing: [0, 2, 8, 100, 200, 300],
  filter_by: {
    display: "flex",
    flexDirection: "row"
  },
  root: {
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

function UsedReply(props) {
  if(props.showReplies) {
    if(props.showOnlyPendingReplies && !props.review.reply) {
      return <UnpostedReply handleClick={props.handleClick} reviewId={props.review.review._id} restaurantId={props.review.review.restaurantId}/>;
    }
    if(props.showOnlyPostedReplies) {
      return (props.review.reply && props.review.reply._id) ? <Reply reply={props.review.reply} /> : <div />;
    }
    return (props.review.reply && props.review.reply._id) ? <Reply reply={props.review.reply} /> : 
    <UnpostedReply handleClick={props.handleClick} reviewId={props.review.review._id} restaurantId={props.review.review.restaurantId}/>;
  }
  return <div />;
}


export default function ReviewAndReplyList(props) {
  const classes = useStyles();

  console.log(props);

    return(
      <div className={classes.root}>
        {props.reviews && props.reviews.length > 0 ? 
          props.reviews.map((review, index) => (
          <div key={index}>
              <Review review={review.review} />
              <Box m={2} />
              <UsedReply showReplies={props.showReplies} showOnlyPendingReplies={props.showOnlyPendingReplies} showOnlyPostedReplies={props.showOnlyPostedReplies} review={review} handleClick={props.handleClick} />
              <Box m={2} />
          </div>
        )): <div />}
    </div>
  );
};

ReviewAndReplyList.propTypes = {
  reviews: PropTypes.array,
  showReplies: PropTypes.bool,
  showOnlyPendingReplies: PropTypes.bool,
  showOnlyPostedReplies: PropTypes.bool,
  handleClick: PropTypes.func
}

ReviewAndReplyList.defaultProps = {
  reviews: [],
  showReplies: false,
  showOnlyPendingReplies: false,
  showOnlyPostedReplies: false
}
