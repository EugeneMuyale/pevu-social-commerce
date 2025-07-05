import api from './axios';

export type Notification = {
  id: number;
  userId: number;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export async function getNotifications(userId: number): Promise<Notification[]> {
  const res = await api.get<Notification[]>('/notification', { params: { userId } });
  return res.data;
}

export async function markNotificationAsRead(id: number, userId: number): Promise<Notification> {
  const res = await api.put<Notification>(`/notification/${id}/read`, undefined, { params: { userId } });
  return res.data;
} 