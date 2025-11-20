import { apiClient, ApiResponse } from './api';
import { Product } from '../types';

export interface CreateProductPayload {
  name: string;
  description?: string;
  sku?: string;
  barcode?: string;
  price: number;
  cost?: number;
  quantity?: number;
  minQuantity?: number;
  unit?: string;
  categoryId?: string;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  isActive?: boolean;
}

export const productsService = {
  async getAll(filters?: {
    search?: string;
    categoryId?: string;
    isActive?: boolean;
    lowStock?: boolean;
  }) {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.categoryId) params.append('categoryId', filters.categoryId);
    if (filters?.isActive !== undefined) params.append('isActive', String(filters.isActive));
    if (filters?.lowStock) params.append('lowStock', 'true');

    const response = await apiClient.get<ApiResponse<Product[]>>(
      `/products?${params.toString()}`
    );
    return response.data.data || [];
  },

  async getById(id: string) {
    const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data;
  },

  async create(payload: CreateProductPayload) {
    const response = await apiClient.post<ApiResponse<Product>>(
      '/products',
      payload
    );
    return response.data.data;
  },

  async update(id: string, payload: UpdateProductPayload) {
    const response = await apiClient.put<ApiResponse<Product>>(
      `/products/${id}`,
      payload
    );
    return response.data.data;
  },

  async delete(id: string) {
    await apiClient.delete(`/products/${id}`);
  },

  async getLowStock() {
    const response = await apiClient.get<ApiResponse<Product[]>>(
      '/products/low-stock'
    );
    return response.data.data || [];
  },
};