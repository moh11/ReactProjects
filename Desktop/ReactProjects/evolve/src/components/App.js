import React from 'react';
import Login from './Login/Login';
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;