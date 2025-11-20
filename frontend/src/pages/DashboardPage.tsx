import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Package, AlertTriangle, DollarSign } from "lucide-react";
import Card from "../components/common/Card";
import { dashboardService } from "../services/dashboard.service";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const { data: overview, isLoading: isLoadingOverview } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: () => dashboardService.getOverview(),
  });

  const { data: chartData, isLoading: isLoadingChart } = useQuery({
    queryKey: ["dashboard-sales-chart"],
    queryFn: () => dashboardService.getSalesChart(7),
  });

  const { data: topProducts, isLoading: isLoadingTopProducts } = useQuery({
    queryKey: ["dashboard-top-products"],
    queryFn: () => dashboardService.getTopProducts(5),
  });

  if (isLoadingOverview) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 font-medium">Revenus (Aujourd'hui)</h3>
            <DollarSign className="text-green-500" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {overview?.today.revenue.toLocaleString("fr-CI", {
              style: "currency",
              currency: "XOF",
            })}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {overview?.today.salesCount} ventes
          </p>
        </Card>

        <Card className="text-center">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 font-medium">Total Revenus</h3>
            <TrendingUp className="text-blue-500" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {overview?.revenue.total.toLocaleString("fr-CI", {
              style: "currency",
              currency: "XOF",
            })}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {overview?.revenue.count} transactions
          </p>
        </Card>

        <Card className="text-center">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 font-medium">Stock Faible</h3>
            <AlertTriangle className="text-orange-500" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {overview?.products.lowStock}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            sur {overview?.products.total} produits
          </p>
        </Card>

        <Card className="text-center">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 font-medium">Bénéfice Net</h3>
            <DollarSign className="text-purple-500" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {overview?.netProfit.toLocaleString("fr-CI", {
              style: "currency",
              currency: "XOF",
            })}
          </p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">
            Ventes (7 derniers jours)
          </h3>
          {isLoadingChart ? (
            <LoadingSpinner />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Top Produits</h3>
          {isLoadingTopProducts ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-3">
              {topProducts?.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.totalQuantity} unités vendues
                    </p>
                  </div>
                  <p className="font-semibold text-blue-600">
                    {item.totalRevenue.toLocaleString("fr-CI", {
                      style: "currency",
                      currency: "XOF",
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
