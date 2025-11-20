// src/services/stores.service.ts
import { Store } from '../types';
import { apiClient, ApiResponse } from './api';

export interface UpdateStorePayload {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  currency?: string;
  taxRate?: number;
}

export const storesService = {
  async getCurrent() {
    const response = await apiClient.get<ApiResponse<Store>>('/stores');
    return response.data.data;
  },

  async update(payload: UpdateStorePayload) {
    const response = await apiClient.put<ApiResponse<Store>>('/stores', payload);
    return response.data.data;
  },
};