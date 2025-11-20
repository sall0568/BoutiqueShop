// src/services/expenses.service.ts
import { Expense } from '../types';

export interface CreateExpensePayload {
  description: string;
  amount: number;
  category: string;
  date?: string;
}

export const expensesService = {
  async getAll(filters?: {
    startDate?: string;
    endDate?: string;
    category?: string;
  }) {
    const params = new URLSearchParams();
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.category) params.append('category', filters.category);

    const response = await apiClient.get<ApiResponse<Expense[]>>(
      `/expenses?${params.toString()}`
    );
    return response.data.data || [];
  },

  async getById(id: string) {
    const response = await apiClient.get<ApiResponse<Expense>>(`/expenses/${id}`);
    return response.data.data;
  },

  async create(payload: CreateExpensePayload) {
    const response = await apiClient.post<ApiResponse<Expense>>('/expenses', payload);
    return response.data.data;
  },

  async update(id: string, payload: Partial<CreateExpensePayload>) {
    const response = await apiClient.put<ApiResponse<Expense>>(`/expenses/${id}`, payload);
    return response.data.data;
  },

  async delete(id: string) {
    await apiClient.delete(`/expenses/${id}`);
  },

  async getStats(startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await apiClient.get<ApiResponse<any>>(
      `/expenses/stats?${params.toString()}`
    );
    return response.data.data;
  },

  async getCategories() {
    const response = await apiClient.get<ApiResponse<string[]>>('/expenses/categories');
    return response.data.data || [];
  },
};