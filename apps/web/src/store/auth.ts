import { create } from 'zustand';

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  setUser: (user: AuthState['user']) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
