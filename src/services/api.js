import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
});

// Interceptor para tratar erros globalmente (opcional)
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error.response?.data || error.message);
    // Aqui pode mostrar um alerta ou toast
    return Promise.reject(error);
  }
);

export default api;
