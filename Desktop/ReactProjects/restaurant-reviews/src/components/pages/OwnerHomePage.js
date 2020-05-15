import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import RestaurantList from "../compounds/RestaurantList";
import { API } from "../../utils/config";
import  ReviewAndReplyList from "../compounds/ReviewAndReplyList";
import CreateRestaurant from "../compounds/CreateRestaurant";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
        props.onClick();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default class OwnerHomePage extends React.Component {
  constructor() {
    this.state = {
      pendingReviews: [],
      ownedRestaurants: []
    }
    this.handlePostReply = this.handlePostReply.bind(this);
    this.handleOwnedRestaurantTabClick = this.handleOwnedRestaurantTabClick.bind(this);
    this.handlePendingRepliesTabClick = this.handlePendingRepliesTabClick.bind(this);
  }

  componentDidMount() {
    fetchOwnedRestaurantList();
  }

  fetchOwnedRestaurantList() {
    axios.get(API.FETCH_OWNED_RESTAURANTS_URL).then(response => {
      if(response.data) {
        this.setState = {
          restaurants: response.data.restaurants
        };
      }
    });
  }

  fetchPendingReviewsList() {
    axios.get(API.FETCH_REVIEWS_WITH_PENDING_REPLIES_URL).then(response => {
      if(response.data) {
        this.setState = {
          restaurants: response.data.restaurants
        };
      }
    });
  }

  handlePostReply(reply) {
    await axios.post(API.POST_REPLY, reply).then(response => {
      if(response.data && response.data.success) {
        this.fetchPendingReviewsList()
      } else {
        alert("Posting reply unsuccessful");
      }
    });
  }

  handleOwnedRestaurantTabClick() {
    this.fetchOwnedRestaurantList();
  }

  handlePendingRepliesTabClick() {
    this.fetchPendingReviewsList();
  }

  render() {
    return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="Tabs for owner"
        >
          <LinkTab label="View Your Restaurants" onClick={this.handleOwnedRestaurantTabClick}/>
          <LinkTab label="Replies pending for left comments" onClick={this.handlePendingRepliesTabClick}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <RestaurantList restaurants={restaurants}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ReviewAndReplyList reviews={pendingReviews} showReplied={false} handlePostReply={this.handlePostReply}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateRestaurant />
      </TabPanel>
    </div>
    );
  }
}
