import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
// Para armazenamento dos dados no celular
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import user from './user';
import auth from './auth';

// Cria uma config com chave para a persistencia de dados
const authPersistConfig = {
  key: 'auth',
  storage: storage,
  timeout: null,
};

const allReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  user: user,
});

export default allReducer;
