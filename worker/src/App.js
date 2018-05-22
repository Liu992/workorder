import React, { Component } from 'react';
import './App.css';
import SiderDemo from './components/SiderDemo';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './view/Login';


import routes from './router/config.js'
import RouteInfo from './components/RouteInfo'

class App extends Component {
  render() {
    return (
      <Router>
        
        <div className="App">
        <Switch>
            <RouteInfo routes={routes}/>
            </Switch>
            {/* <Route exact path='/login' component={Login}/>
            <Route path='/manage/all' component={SiderDemo}/> */}
            {/* <SiderDemo/> */}
        </div>
       
      </Router>
    );
  }
}

export default App;
