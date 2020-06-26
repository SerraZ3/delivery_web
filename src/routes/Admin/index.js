import React, {useState, useEffect} from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {useSelector} from 'react-redux';

import AdminLogin from '../../pages/Admin/Login';
import AdminOrder from '../../pages/Admin/Order';

import getRolePermission from '../../services/getRolePermission';

import LoadingScreen from '../../components/LoadingScreen';

const Routes = (props) => {
  const [admin, setAdmin] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const token = useSelector((state) => state.auth.token);

  let path = useRouteMatch().path;

  const isAdmin = async () => {
    try {
      let response = await getRolePermission();
      let is_admin = response.user.roles.find(
        (value) => value === 'admin' || value === 'manager',
      );
      if (is_admin) setAdmin(true);
      setLoaded(true);
    } catch (error) {
      setAdmin(false);
      setLoaded(true);
    }
  };
  useEffect(() => {
    if (token) {
      isAdmin();
    } else {
      setLoaded(true);
    }
  }, [token]);
  return loaded ? (
    token && admin ? (
      <div>
        <Switch>
          <Route
            path={`${path}/config`}
            component={() => <h1>Configurações do Admin</h1>}
          />
          <Route
            path={[path, `${path}/pedidos`, `${path}/pedido`]}
            component={AdminOrder}
          />
          <Route
            exact
            path={`${path}/*`}
            component={() => <h1>Ops, pagina nao encontrada</h1>}
          />
        </Switch>
      </div>
    ) : (
      <div>
        <Route path={`${path}/cadastro`} component={() => <h1>Cadastro</h1>} />
        <Route exact path={[path, `${path}/login`]} component={AdminLogin} />
      </div>
    )
  ) : (
    <LoadingScreen open={!loaded} />
  );
};

export default Routes;
