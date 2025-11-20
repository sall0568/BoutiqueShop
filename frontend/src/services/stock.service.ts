// src/services/stock.service.ts
import { StockMovement, StockValue, StockAlerts } from '../types';

export interface CreateMovementPayload {
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  reason?: string;
  productId: string;
}

export const stockService = {
  async getMovements(filters?: {
    productId?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const params = new URLSearchParams();
    if (filters?.productId) params.append('productId', filters.productId);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);

    const response = await apiClient.get<ApiResponse<StockMovement[]>>(
      `/stock/movements?${params.toString()}`
    );
    return response.data.data || [];
  },

  async createMovement(payload: CreateMovementPayload) {
    const response = await apiClient.post<ApiResponse<StockMovement>>(
      '/stock/movements',
      payload
    );
    return response.data.data;
  },

  async getValue() {
    const response = await apiClient.get<ApiResponse<StockValue>>('/stock/value');
    return response.data.data;
  },

  async getAlerts() {
    const response = await apiClient.get<ApiResponse<StockAlerts>>('/stock/alerts');
    return response.data.data;
  },
};