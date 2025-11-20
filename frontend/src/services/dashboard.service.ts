import { apiClient, ApiResponse } from './api';
import { DashboardOverview, SalesChartData, TopProduct, RecentActivity } from '../types';

export const dashboardService = {
  async getOverview(startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await apiClient.get<ApiResponse<DashboardOverview>>(
      `/dashboard/overview?${params.toString()}`
    );
    return response.data.data;
  },

  async getSalesChart(days: number = 7) {
    const response = await apiClient.get<ApiResponse<SalesChartData[]>>(
      `/dashboard/sales-chart?days=${days}`
    );
    return response.data.data || [];
  },

  async getTopProducts(limit: number = 10) {
    const response = await apiClient.get<ApiResponse<TopProduct[]>>(
      `/dashboard/top-products?limit=${limit}`
    );
    return response.data.data || [];
  },

  async getRecentActivities(limit: number = 10) {
    const response = await apiClient.get<ApiResponse<RecentActivity[]>>(
      `/dashboard/activities?limit=${limit}`
    );
    return response.data.data || [];
  },
};