import api from './axios';
import { User } from '../store/auth';

export interface LoginRequest {
  emailOrPhone: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'BUYER' | 'SELLER';
}

export const loginUser = async (credentials: LoginRequest): Promise<User> => {
  const response = await api.post<User>('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData: RegisterRequest): Promise<User> => {
  const response = await api.post<User>('/auth/register', userData);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post('/auth/logout');
}; 