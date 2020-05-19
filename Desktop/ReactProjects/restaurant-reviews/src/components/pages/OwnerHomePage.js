import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import axios from "axios";
import Tab from "@material-ui/core/Tab";
import RestaurantList from "../compounds/RestaurantList";
import { API } from "../../utils/config";
import  ReviewAndReplyList from "../compounds/ReviewAndReplyList";
import CreateRestaurant from "../compounds/CreateRestaurant";
import Auth from "../../middleware/auth";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginLeft: "10%"
  }
}));

export default function OwnerHomePage(props) {
  const classes = useStyles();
  
  const [pendingReviews,setPendingReviewsState] = React.useState([]);
  const [ownedRestaurants, setOwnedRestaurants] = React.useState([]);
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  React.useEffect( () => {
    fetchOwnedRestaurantList();
  }, []);

  const fetchOwnedRestaurantList = () => {
    axios.get(API.FETCH_OWNED_RESTAURANTS_URL, {
      headers: {
          'authorization': "Bearer " + Auth.getToken(),
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  }).then(response => {
      if(response.data) {
        setOwnedRestaurants(response.data.restaurants);
      }
    }, error => {
      console.log("Could not fetch restaurants list");
    });
  }

  const fetchPendingReviewsList = () => {
    axios.get(API.FETCH_REVIEWS_WITH_PENDING_REPLIES_URL, {
      headers: {
          'authorization': "Bearer " + Auth.getToken(),
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  }).then(response => {
      if(response.data) {
        setPendingReviewsState(response.data.reviews);
      }
    }, error => {
      console.log("Could not fetch pending reviews");
    });
  }

  const handlePostReply = (reply, reviewId, restaurantId) => {
    const dataToSubmit = {
      reviewId: reviewId,
      message: reply,
      restaurantId: restaurantId
    };

    if(!reply || reply.length === 0) {
      alert("Reply can't be blank");
      return;
    }

    axios.post(API.POST_REPLY, dataToSubmit, {
      headers: {
          'authorization': "Bearer " + Auth.getToken(),
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  }).then(response => {
      if(response.data) {
        fetchPendingReviewsList();
      } else {
        alert("Posting reply unsuccessful");
      }
    }, error => {
      alert("Posting reply unsuccessful");
    });
  }

  const handleTabChange = (event, value) => {
    setActiveTabIndex(value);
    if(value === 0) {
      fetchOwnedRestaurantList();
    } else if(value === 1) {
      fetchPendingReviewsList();
    }
  }

  return (
    <div>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={activeTabIndex}
          onChange={handleTabChange}
          aria-label="Tabs for owner"
        >
          <Tab label="View Your Restaurants" />
          <Tab label="Replies pending for left comments" />
          <Tab label="Create a restaurant" />
        </Tabs>
      </AppBar>
      { activeTabIndex === 0 &&
        <RestaurantList restaurants={ownedRestaurants} className={classes.root}/>
      }
      { activeTabIndex === 1 &&
        <ReviewAndReplyList reviews={pendingReviews} showOnlyPendingReplies={true} showReplies={true} handleClick={handlePostReply}/>
      }
      { activeTabIndex === 2 &&
        <CreateRestaurant props={activeTabIndex}/>
      }
    </div>
  );
}
