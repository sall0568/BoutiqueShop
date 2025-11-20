// src/services/categories.service.ts
import { apiClient, ApiResponse } from './api';
import { Category } from '../types';

export interface CreateCategoryPayload {
  name: string;
  description?: string;
}

export const categoriesService = {
  async getAll() {
    const response = await apiClient.get<ApiResponse<Category[]>>('/categories');
    return response.data.data || [];
  },

  async getById(id: string) {
    const response = await apiClient.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.data;
  },

  async create(payload: CreateCategoryPayload) {
    const response = await apiClient.post<ApiResponse<Category>>('/categories', payload);
    return response.data.data;
  },

  async update(id: string, payload: Partial<CreateCategoryPayload>) {
    const response = await apiClient.put<ApiResponse<Category>>(`/categories/${id}`, payload);
    return response.data.data;
  },

  async delete(id: string) {
    await apiClient.delete(`/categories/${id}`);
  },
};