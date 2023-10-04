import axios from 'axios';

const { MY_IP } = process.env;

const api = axios.create({
  // baseURL: `http://${MY_IP}:19003/api/`,
  baseURL: `http://26.152.52.239:19003/api/`,
});

export default api;
