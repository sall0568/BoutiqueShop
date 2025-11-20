import { create } from 'zustand';
import { User, Store } from '../types';

interface AuthState {
  user: User | null;
  store: Store | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuth: (user: User, store: Store, token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  store: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,

  setAuth: (user, store, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('store', JSON.stringify(store));
    set({ user, store, token, isAuthenticated: true });
  },

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('store');
    set({ user: null, store: null, token: null, isAuthenticated: false });
  },

  loadFromStorage: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const store = localStorage.getItem('store');

    if (token && user && store) {
      try {
        set({
          token,
          user: JSON.parse(user),
          store: JSON.parse(store),
          isAuthenticated: true,
        });
      } catch (error) {
        console.error('Failed to load auth from storage:', error);
      }
    }
  },
}));