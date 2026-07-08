import api from './api';

export const userService = {
  getProfile: () => api.get('/users/profile'),
  getMyTasks: () => api.get('/users/me/tasks'),
};