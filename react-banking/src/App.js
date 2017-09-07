import React, { Component } from 'react';
import './App.css';

import { Route } from 'react-router-dom';
import Login from './components/login/Login';
import Private from './components/private/Private';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={ Login } />
        <Route path='/private' component={ Private } />
      </div>
    );
  }
}

export default App;
