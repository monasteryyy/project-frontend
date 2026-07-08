import api from './api';

export const taskService = {
  getAll: (params?: any) => api.get('/tasks', { params }),
  getOne: (id: number) => api.get(`/tasks/${id}`),
  create: (data: any) => api.post('/tasks', data),
  update: (id: number, data: any) => api.patch(`/tasks/${id}`, data),
  delete: (id: number) => api.delete(`/tasks/${id}`),
  getMyTasks: () => api.get('/users/me/tasks'),
  updateStatus: (id: number, status: string) =>
    api.patch(`/tasks/${id}/status`, { status }),
  getHistory: (id: number) => api.get(`/tasks/${id}/history`),
};