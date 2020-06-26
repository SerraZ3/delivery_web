import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Container, DivInput, ContainerBox, Input} from './styles';
import {useHistory} from 'react-router-dom';
import login from '../../../services/login';
import image from '../../../assets/login.png';
import {
  Typography,
  Avatar,
  Icon,
  Button,
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    // backgroundColor: '#000',
  },
}));
function Login() {
  // Declara uma nova variável de state, que chamaremos de "count"
  const [email, setEmail] = useState('luiz1@gmail.com');
  const [password, setPassword] = useState('henrique123');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  let history = useHistory();
  function addAuth(refresh_token, token, type) {
    dispatch({type: 'ADD_AUTH', auth: {refresh_token, token, type}});
  }
  function addUser(user) {
    dispatch({type: 'ADD_USER', user});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await login(email, password);

      let auth = response.data;
      let user = response.user;
      addAuth(auth.refreshToken, auth.token, auth.type);
      addUser({
        email: user.email,
        name: user.name,
        id: user.id,
      });
      history.push('/client');
      // addAuth(data.refreshToken, data.token, data.type);
      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
      alert('Email ou senha inválido');
    }
  };
  return (
    <Container>
      <ContainerBox container justify="center" alignItems="center">
        <form className="col s10 offset-s1" style={{height: 400}}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center">
            <Avatar alt="Remy Sharp" src={image} className={classes.large} />
            <Typography color="primary">Client</Typography>
          </Grid>
          <DivInput>
            <Input
              id="outlined-search"
              label="E-mail"
              type="email"
              variant="outlined"
              value={email}
              onChange={({target: {value}}) => setEmail(value)}
            />
          </DivInput>
          <DivInput>
            <Input
              id="outlined-search"
              label="Senha"
              type="password"
              variant="outlined"
              value={password}
              onChange={({target: {value}}) => setPassword(value)}
            />
          </DivInput>
          <DivInput>
            <Button
              endIcon={<Icon>login</Icon>}
              onClick={(e) => handleSubmit(e)}
              variant="outlined">
              Entrar
            </Button>
          </DivInput>
        </form>
      </ContainerBox>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

export default Login;
