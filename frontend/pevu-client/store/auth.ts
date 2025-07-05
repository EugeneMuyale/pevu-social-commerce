import { create } from 'zustand';
import { UserProfile } from '../api/profile';

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'BUYER' | 'SELLER' | 'ADMIN';
  jwtToken: string;
  businessRegNo?: string;
  businessDocName?: string;
  businessDocStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
};

type AuthState = {
  user: User | null;
  profile: UserProfile | null;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
};

function getUserFromLocalStorage(): User | null {
  try {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return null;
    // Optionally, decode the JWT to get user info, or fetch user info from backend
    // For now, just return null if not present
    return null;
  } catch {
    return null;
  }
}

export const useAuth = create<AuthState>((set) => ({
  user: getUserFromLocalStorage(),
  profile: null,
  login: (user) => {
    localStorage.setItem('jwt', user.jwtToken);
    set({ user });
  },
  logout: () => {
    localStorage.removeItem('jwt');
    set({ user: null, profile: null });
  },
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
})); 