const ENVIRONMENT = "DEV";
var SERVER_URL = "";
if (ENVIRONMENT === "DEV") {
  SERVER_URL = "http://localhost:5000";
} else {
  SERVER_URL = "http://localhost:5000";
}

export const API = {
  AUTH_URL: SERVER_URL + "/auth",
  REGISTER_USER_URL: SERVER_URL + "/register",
  LOGIN_USER_URL: SERVER_URL + "/login",
  FETCH_ALL_RESTAURANTS_URL: SERVER_URL + "/restaurants/all",
  FETCH_RESTAURANT_DETAILS_URL: SERVER_URL + "/restaurant/details",
  FETCH_REVIEWS_AND_REPLIES_URL: SERVER_URL + "/restaurant/reviewsandreplies",
  CREATE_RESTAURANT_URL: SERVER_URL + "/restaurant/create"
};
