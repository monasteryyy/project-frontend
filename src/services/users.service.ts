import api from './api';

export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.patch('/users/profile', data),
  getMyTasks: () => api.get('/users/me/tasks'),
};