import api from './api';

export const postulationService = {
  getAll: () => api.get('/postulations'),
  getOne: (id: number) => api.get(`/postulations/${id}`),
  create: (data: { taskId: number; userId: number }) =>
    api.post('/postulations', data),
  update: (id: number, data: any) => api.patch(`/postulations/${id}`, data),
  delete: (id: number) => api.delete(`/postulations/${id}`),
  getByTask: (taskId: number) => api.get(`/postulations?taskId=${taskId}`),
  getByUser: (userId: number) => api.get(`/postulations?userId=${userId}`),
};