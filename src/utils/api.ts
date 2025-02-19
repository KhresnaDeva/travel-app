import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-endpoint.com',
});

export const login = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const register = async (userData: { username: string; email: string; password: string }) => {
  const response = await api.post('/register', userData);
  return response.data;
};

export const fetchArticles = async (params: { 
    page?: number; 
    limit?: number; 
    // Tambahkan query parameters lain sesuai kebutuhan
  }) => {
    const response = await api.get('/articles', { params });
    return response.data;
  };