import axios from 'axios';

const api = axios.create({
  // baseURL: "https://padariabackend.1.us-1.fl0.io/api/",
  baseURL: 'http://127.0.0.1:8000/api/',
});

export default api;
