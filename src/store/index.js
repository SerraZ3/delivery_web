// Config do redux
import {applyMiddleware, createStore} from 'redux';
// Config para persistencia de dados com o redux
import {persistStore} from 'redux-persist';
// Logger para o redux
import {createLogger} from 'redux-logger';
// Importa redux combiner
import reducer from './reducer';
// Array que conterá todos os middlewares
const middlewares = [];
// Logger para redux
const logger = createLogger({});
// Adiciona o logger nos middleware
middlewares.push(logger);
// Criar o store com os reducers
const store = createStore(reducer, applyMiddleware(...middlewares));
// Criar o persistor com a store
const persistor = persistStore(store);

export {store, persistor};
