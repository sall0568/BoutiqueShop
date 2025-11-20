import { apiClient, ApiResponse } from './api';
import { Sale } from '../types';

export interface SaleItemPayload {
  productId: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
}

export interface CreateSalePayload {
  items: SaleItemPayload[];
  discount?: number;
  tax?: number;
  paymentMethod?: string;
  customerName?: string;
  customerPhone?: string;
  notes?: string;
}

export interface SalesStatsResponse {
  totalSales: number;
  totalRevenue: number;
  salesByPaymentMethod: Array<{
    paymentMethod: string;
    _count: number;
    _sum: { finalAmount: number };
  }>;
}

export const salesService = {
  async getAll(filters?: {
    startDate?: string;
    endDate?: string;
    paymentMethod?: string;
  }) {
    const params = new URLSearchParams();
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.paymentMethod) params.append('paymentMethod', filters.paymentMethod);

    const response = await apiClient.get<ApiResponse<Sale[]>>(
      `/sales?${params.toString()}`
    );
    return response.data.data || [];
  },

  async getById(id: string) {
    const response = await apiClient.get<ApiResponse<Sale>>(`/sales/${id}`);
    return response.data.data;
  },

  async create(payload: CreateSalePayload) {
    const response = await apiClient.post<ApiResponse<Sale>>(
      '/sales',
      payload
    );
    return response.data.data;
  },

  async delete(id: string) {
    await apiClient.delete(`/sales/${id}`);
  },

  async getStats(startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await apiClient.get<ApiResponse<SalesStatsResponse>>(
      `/sales/stats?${params.toString()}`
    );
    return response.data.data;
  },
};