import axios from 'axios';

const instance = axios.create();
instance.interceptors.request.use(function(config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;

}, function(err) {
  return Promise.reject(err);
});

export default instance;
