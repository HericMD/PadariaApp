import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://gympie-wallaby-hpfr.1.us-1.fl0.io/api/',
  baseURL: 'http://127.0.0.1:8000/api/',
  // baseURL: `http://${MY_IP}:19003/api/`,
  // baseURL: 'http://26.152.52.239:19003/api/',
});

export default api;
