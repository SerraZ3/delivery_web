import React, {useState, useEffect} from 'react';

// import { Container } from './styles';

function Login() {
  // Declara uma nova variável de state, que chamaremos de "count"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Similar ao componentDidMount e componentDidUpdate:
  useEffect(() => {});
  return (
    <div className="row">
      <form className="col s10 offset-s1">
        <div className="col s6">
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e)}
          />
        </div>
        <div className="col s6">
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setEmail(e)}
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
