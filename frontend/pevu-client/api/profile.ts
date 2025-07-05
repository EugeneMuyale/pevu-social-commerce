import api from './axios';

export async function getAllSellers() {
  const res = await api.get('/auth/sellers'); // You may need to add this endpoint
  return res.data;
}

export async function verifySeller(id: number) {
  const res = await api.put(`/auth/seller/${id}/verify`);
  return res.data;
}

export async function rejectSeller(id: number) {
  const res = await api.put(`/auth/seller/${id}/reject`);
  return res.data;
}

export async function suspendUser(id: number) {
  const res = await api.put(`/auth/user/${id}/suspend`);
  return res.data;
}

export async function unsuspendUser(id: number) {
  const res = await api.put(`/auth/user/${id}/unsuspend`);
  return res.data;
}

export interface UserProfile {
  id: number;
  userId: number;
  fullName?: string;
  username?: string;
  role: 'BUYER' | 'SELLER';
  avatarUrl?: string;
  businessName?: string;
  businessDocUrl?: string;
  businessLocation?: string;
  businessType?: string;
  businessDescription?: string;
  shippingAddress?: string;
  preferences?: string;
}

export interface UserProfileRequest {
  userId: number;
  fullName?: string;
  username?: string;
  role: 'BUYER' | 'SELLER';
  avatarUrl?: string;
  businessName?: string;
  businessDocUrl?: string;
  businessLocation?: string;
  businessType?: string;
  businessDescription?: string;
  shippingAddress?: string;
  preferences?: string;
}

export async function getProfile(userId: number): Promise<UserProfile> {
  const res = await api.get(`/user/${userId}`);
  return res.data;
}

export async function createProfile(profile: UserProfileRequest): Promise<UserProfile> {
  const res = await api.post('/user', profile);
  return res.data;
}

export async function updateProfile(userId: number, profile: UserProfileRequest): Promise<UserProfile> {
  const res = await api.put(`/user/${userId}`, profile);
  return res.data;
}