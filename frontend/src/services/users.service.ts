// src/services/users.service.ts
import { User } from '../types';
import { apiClient, ApiResponse } from './api'; 

export interface CreateUserPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: 'ADMIN' | 'EMPLOYEE';
}

export const usersService = {
  async getAll() {
    const response = await apiClient.get<ApiResponse<User[]>>('/users');
    return response.data.data || [];
  },

  async getById(id: string) {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data;
  },

  async create(payload: CreateUserPayload) {
    const response = await apiClient.post<ApiResponse<User>>('/users', payload);
    return response.data.data;
  },

  async update(id: string, payload: Partial<CreateUserPayload>) {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, payload);
    return response.data.data;
  },

  async delete(id: string) {
    await apiClient.delete(`/users/${id}`);
  },
};