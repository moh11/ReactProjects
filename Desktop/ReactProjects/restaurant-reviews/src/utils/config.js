const ENVIRONMENT = "DEV";
var SERVER_URL = "";
if (ENVIRONMENT === "DEV") {
  SERVER_URL = "http://localhost:5000";
} else {
  SERVER_URL = "http://localhost:5000";
}

export const API = {
  AUTH_USER_URL: SERVER_URL + "/auth",
  REGISTER_USER_URL: SERVER_URL + "/user/register",
  LOGIN_USER_URL: SERVER_URL + "/user/login",
  FETCH_ALL_RESTAURANTS_URL: SERVER_URL + "/restaurantswithrating",
  FETCH_OWNED_RESTAURANTS_URL: SERVER_URL + "/restaurantsowned",
  FETCH_RESTAURANT_DETAILS_URL: SERVER_URL + "/restaurant/details",
  FETCH_REVIEWS_AND_REPLIES_URL: SERVER_URL + "/restaurant/reviews",
  FETCH_REVIEWS_WITH_PENDING_REPLIES_URL: SERVER_URL + "/user/pendingreviews",
  POST_REVIEW: SERVER_URL + "/reviews",
  POST_REPLY: SERVER_URL + "/replies",
  CREATE_RESTAURANT_URL: SERVER_URL + "/restaurants"
};
