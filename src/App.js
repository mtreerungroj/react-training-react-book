import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from './components/HomePage'
import NamePage from './components/NamePage'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/name" component={NamePage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
