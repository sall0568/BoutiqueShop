// src/components/dashboard/StockChart.tsx - CRÉÉ (était vide)
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Card from '../common/Card';

interface StockChartProps {
  data: Array<{ name: string; stock: number; minStock: number }>;
  isLoading?: boolean;
}

export default function StockChart({ data, isLoading }: StockChartProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Niveau de stock</h3>
      {isLoading ? (
        <div className="h-80 flex items-center justify-center text-gray-500">Chargement...</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stock" fill="#0ea5e9" />
            <Bar dataKey="minStock" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
