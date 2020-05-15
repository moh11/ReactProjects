import React from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute, PrivateUserRoute, PrivateOwnerRoute, PrivateAdminRoute } from "../middleware/privateRoutes.js"; 
import NavBar from "./elements/NavBar.js";
import RegisterPage from "./pages/RegisterPage.js";
import LoginPage from "./pages/LoginPage.js";
import UserHomePage from "./pages/UserHomePage.js";
import OwnerHomePage from "./pages/OwnerHomePage.js";
import RestaurantDetailPage from "./pages/RestaurantDetailPage.js";

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
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
      <Switch>
        <Route exact path="/" component={RegisterPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <PrivateUserRoute exact path="/home/user" component={UserHomePage} />
        <PrivateOwnerRoute exact path="/home/owner" component={OwnerHomePage} />
        <PrivateRoute exact path="/restaurant/details" component={RestaurantDetailPage} />
      </Switch>
      </div>
    </div>
  );
}

export default App;
