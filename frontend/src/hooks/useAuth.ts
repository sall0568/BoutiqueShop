// src/hooks/useAuth.ts
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { user, store, token, isAuthenticated, setAuth, logout } = useAuthStore();

  return {
    user,
    store,
    token,
    isAuthenticated,
    isAdmin: user?.role === 'ADMIN',
    setAuth,
    logout,
  };
};