import React from 'react';
import {Route, Switch, Redirect, useRouteMatch} from 'react-router-dom';

import {isAuthenticated} from '../../../services/auth';

import AdminLogin from '../Login';

const ValidateSwitch = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{pathname: '/', state: {from: props.location}}} />
      )
    }
  />
);

const Routes = (props) => {
  let match = useRouteMatch();
  return (
    // <h1>asdas</h1>
    <Switch>
      <Route
        path={`${match.path}/config`}
        component={() => <h1>Configurações do admin</h1>}
      />
      <Route path={`${match.path}/*`} component={() => <Redirect to="/" />} />
      <Route path={match.path} component={() => <h1>Bem vindo admin</h1>} />
    </Switch>
  );
};

export default Routes;
