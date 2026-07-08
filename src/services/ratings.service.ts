import api from './api';

export const ratingsService = {
  create: (data: { score: number; comments?: string; taskId: number; receiverUserId: number }) =>
    api.post('/ratings', data),

  getByUser: (userId: number) =>
    api.get(`/ratings/user/${userId}`),

  getAverage: (userId: number) =>
    api.get(`/ratings/user/${userId}/average`),
};