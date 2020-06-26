import React, {useState, useEffect} from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {useSelector} from 'react-redux';

import ClientLogin from '../../pages/Client/Login';
// import ClientHome from '../../pages/Client/Home';

import getRolePermission from '../../services/getRolePermission';

import LoadingScreen from '../../components/LoadingScreen';

const Routes = (props) => {
  const [client, setClient] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const token = useSelector((state) => state.auth.token);

  let path = useRouteMatch().path;

  const isClient = async () => {
    try {
      let response = await getRolePermission();
      let is_client = response.user.roles.find((value) => value === 'client');
      if (is_client) setClient(true);
      setLoaded(true);
    } catch (error) {
      setClient(false);
      setLoaded(true);
    }
  };
  useEffect(() => {
    if (token) {
      isClient();
    } else {
      setLoaded(true);
    }
  }, [token]);
  return loaded ? (
    token && client ? (
      <div>
        <Switch>
          <Route
            path={`${path}/config`}
            component={() => <h1>Configurações do cliente</h1>}
          />
          <Route
            path={path}
            component={() => <h1>Bem vindo cliente autenticado</h1>}
          />
          <Route
            path={`${path}/*`}
            component={() => <h1>Ops, pagina nao encontrada</h1>}
          />
        </Switch>
      </div>
    ) : (
      <div>
        <Route
          path={`${path}/config`}
          component={() => <h1>Configurações do cliente</h1>}
        />
        <Route path={`${path}/login`} component={ClientLogin} />
        <Route exact path={path} component={() => <h1>Bem vindo cliente</h1>} />
      </div>
    )
  ) : (
    <LoadingScreen open={!loaded} />
  );
};

export default Routes;
