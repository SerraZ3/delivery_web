import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import {isAuthenticated} from './services/auth';

import ClientLogin from './pages/Client/Login';
import ClientRoutes from './pages/Client/Routes';

import AdminLogin from './pages/Admin/Login';
import AdminEstablishment from './pages/Admin/Establishment';
import AdminRoutes from './pages/Admin/Routes';

const PrivateRoute = ({component: Component, redirect, ...rest}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{pathname: redirect, state: {from: props.location}}} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      {/* <PrivateRoute path="/app/" component={ClientLogin} /> */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/estabelecimento/cadastro" component={AdminEstablishment} />
      <Route path="/login" component={ClientLogin} />
      <PrivateRoute
        path="/admin"
        component={AdminRoutes}
        redirect="/admin/login"
      />
      <PrivateRoute path="/client" component={ClientRoutes} redirect="/login" />
      <Route exact path="/" component={ClientLogin} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
