import React from "react";
import { Route, Switch } from "react-router-dom";
//import { PrivateRoute } from "../middleware/privateRoutes.js"; 
import NavBar from "./elements/NavBar.js";
import RegisterPage from "./pages/RegisterPage.js";
import LoginPage from "./pages/LoginPage.js";
import UserHomePage from "./pages/UserHomePage.js";
import OwnerHomePage from "./pages/OwnerHomePage.js";
import RestaurantDetailPage from "./pages/RestaurantDetailPage.js";

function App() {
  return (
    <div className="app">
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
      <Switch>
        <Route exact path="/" component={RegisterPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/home/user" role={"user"} component={UserHomePage} />
        <Route exact path="/home/owner" role={"owner"} component={OwnerHomePage} />
        <Route exact path="/restaurant/details" role={"admin"} component={RestaurantDetailPage} />
      </Switch>
      </div>
    </div>
  );
}

export default App;
