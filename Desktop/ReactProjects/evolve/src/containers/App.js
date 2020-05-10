import React from 'react';
import './App.css';
import Login from '../components/Login/Login';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Route exact path='/login'>
        <Login />
      </Route>  
    </div>
  );
}

export default App;
