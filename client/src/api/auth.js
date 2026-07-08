import apiClient from './client';

export const registerRequest = async (payload) => {
  const response = await apiClient.post('/api/auth/register', payload);
  return response.data;
};

export const loginRequest = async (payload) => {
  const response = await apiClient.post('/api/auth/login', payload);
  return response.data;
};

export const getMe = async () => {
  const response = await apiClient.get('/api/auth/me');
  return response.data;
};
