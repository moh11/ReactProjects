import "./styles/Navbar.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Menu } from "antd";
import { logoutUser } from "../../state/authActions.js";

function NavBar(props) {
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser()).then(response => {
      if (!response.isAuth) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (!userData || !userData.isAuth) {
    return (
      <div className="menu__container">
        <div className="menu_right">
          <Menu mode="horizontal">
            <Menu.Item key="mail">
              <a href="/login">Log in</a>
            </Menu.Item>
            <Menu.Item key="app">
              <a href="/register">Register</a>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  } else {
    return (
      <div className="menu__container">
        <div className="menu_right">
          <Menu mode="horizontal">
            <Menu.Item key="logout">
              <button onClick={logoutHandler}>Logout</button>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
