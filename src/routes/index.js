import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import ClientRoutes from './Client';
import AdminRoutes from './Admin';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={['/estabelecimento', '/admin']} component={AdminRoutes} />
        <Route path={['/', '/client']} component={ClientRoutes} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
