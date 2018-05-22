import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getCookie} from '../../until/cookies';

function isLogin () {
  if (getCookie('token')) {
    return true
  } else {
    return false
  }
}

class RouteInfo extends Component {
  render() {
    const {routes} = this.props;
    console.log(routes)
    return routes.map((item, idx) => {
      return <Route
        key={idx}
        path={item.path}
        exact={item.exact}
        render={(location) => {
          return !isLogin()?<Redirect to={{pathname: '/login'}}></Redirect>
          :<item.component {...location} routes={item.children}></item.component>
          // return <item.component {...location} routes={item.children}></item.component>
        }}
      ></Route>
    })
  }
}
// item.authorization&&
export default RouteInfo