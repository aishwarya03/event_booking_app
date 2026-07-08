import apiClient from './client';

export const createBooking = async (payload) => {
  const response = await apiClient.post('/api/bookings', payload);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await apiClient.get('/api/bookings/me');
  return response.data;
};
