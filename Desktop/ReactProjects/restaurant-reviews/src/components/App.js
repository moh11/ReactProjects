import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../middleware/privateRoutes.js"; 
import NavBar from "./elements/NavBar.js";
import RegisterPage from "./pages/RegisterPage.js";
import LoginPage from "./pages/LoginPage.js";
import UserHomePage from "./pages/UserHomePage.js";
import OwnerHomePage from "./pages/OwnerHomePage.js";
import RestaurantDetailPage from "./pages/RestaurantDetailPage.js";

function App(props) {
  return (
    <div className="app">
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
      <Switch>
        <Route exact path="/" component={RegisterPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/home/user" role={"user"} component={UserHomePage} />
        <PrivateRoute exact path="/home/owner" role={"owner"} component={OwnerHomePage} />
        <PrivateRoute path="/restaurant/details/:id" role={"any"} component={RestaurantDetailPage} />
      </Switch>
      </div>
    </div>
  );
}

export default App;
