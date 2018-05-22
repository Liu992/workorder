import React, { Component } from 'react';
import './App.css';
import SiderDemo from './components/SiderDemo';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Login from './view/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Route exact path='/login' component={Login}/>
            <Route path='/manage/all' component={SiderDemo}/>
            {/* <SiderDemo/> */}
        </div>
      </Router>
    );
  }
}

export default App;
