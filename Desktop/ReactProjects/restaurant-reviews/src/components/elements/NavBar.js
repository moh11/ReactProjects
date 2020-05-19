import "./styles/Navbar.css";
import React from "react";
import { withRouter } from "react-router-dom";
import { Menu } from "antd";
import Auth from "../../middleware/auth";

function NavBar(props) {

  const logoutHandler = () => {
    Auth.signout();
    props.history.push("/login");
  };

  if (!Auth.isAuthenticated()) {
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

    const role = Auth.getRole();

    return (
      <div className="menu__container">
        <div className="menu_left">
        <Menu mode="horizontal">
          <Menu.Item key="home">
            { role === "owner" &&
            <a href="/home/owner">Home</a>
            }
            { role === "user" &&
             <a href="/home/user">Home</a>
            }
          </Menu.Item>
        </Menu>
        </div>
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
