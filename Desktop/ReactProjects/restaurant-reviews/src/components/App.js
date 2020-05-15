import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
// import LandingPage from "./views/LandingPage/LandingPage.js";
// import SignUp from "./start/Signup.js";
// import Login from "./start/Login.js";
import NavBar from "./elements/NavBar.js";
import RestaurantList from "./home/list/RestaurantList.js";
import RegisterPage from "./pages/RegisterPage/RegisterPage.js";
// import MovieDetail from "./views/MovieDetail/MovieDetail";
// import FavoritePage from "./views/FavoritePage/FavoritePage";
// import SignUpAsOwner from "./start/SignupAsOwner";
// import OwnerHome from "./home/OwnerHome";

function App() {
  const restaurants = [
    {
      title: "Restaurant 1",
      rating: 2,
      description: "SOme ddedsd here"
    },
    {
      title: "Restaurant 2",
      rating: 4,
      description: "SOme ddedsd here"
    }
  ];

  return (
    <div className="app">
      <NavBar />
      <Switch>
        <Route
          exact
          path="/"
          component={() => <RestaurantList restaurants={restaurants} />}
        />
      </Switch>
    </div>
  );
}

export default App;
