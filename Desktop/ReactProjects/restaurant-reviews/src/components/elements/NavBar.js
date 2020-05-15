import React from "react";
import "./styles/Navbar.css";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Menu } from "antd";
import { USER_SERVER } from "../Config";
import axios from "axios";

function NavBar(props) {
  const user = useSelector(state => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (true) {
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
            <Menu.Item key="vile">
              <a href="/registerasowner">Register As Owner</a>
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
