import { apiClient, ApiResponse } from './api';
import { User, Store } from '../types';

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  storeName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface UserWithStore extends User {
  store: Store;
}

export const authService = {
  async register(payload: RegisterPayload) {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      payload
    );
    return response.data.data;
  },

  async login(payload: LoginPayload) {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      payload
    );
    return response.data.data;
  },

  async getCurrentUser() {
    const response = await apiClient.get<ApiResponse<UserWithStore>>('/auth/me');
    return response.data.data;
  },

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('store');
  },
};