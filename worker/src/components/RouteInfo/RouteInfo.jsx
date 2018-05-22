import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class RouteInfo extends Component {
  render() {
    const {routes} = this.props;
    return routes.map((item, idx) => {
      return <Route
        key={idx}
        path={item.path}
        exact={item.exact}
        render={(location) => {
          return <item.component {...location} routes={item.children}></item.component>
        }}
      ></Route>
    })
  }
}

export default RouteInfo