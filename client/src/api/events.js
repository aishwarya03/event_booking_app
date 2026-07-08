import apiClient from './client';

export const getEvents = async () => {
  const response = await apiClient.get('/api/events');
  return response.data;
};

export const getEvent = async (id) => {
  const response = await apiClient.get(`/api/events/${id}`);
  return response.data;
};

export const getMyEvents = async () => {
  const response = await apiClient.get('/api/events/mine');
  return response.data;
};

export const createEvent = async (payload) => {
  const response = await apiClient.post('/api/events', payload);
  return response.data;
};
