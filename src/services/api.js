import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://atividades/api/',
  baseURL: 'http://atividades.proandre.com.br/api',
});

export default api;
