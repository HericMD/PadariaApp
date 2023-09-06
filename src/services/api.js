import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.10:19003',
  // baseUrl: 'http://191.52.55.35:19003',
});

export default api;