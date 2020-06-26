import axios from 'axios';
import {store} from '../store';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL_API}/v1/api`,
});

api.interceptors.request.use(async (config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
