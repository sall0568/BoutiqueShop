import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../common/Card";
import { SalesChartData } from "../../types";

interface SalesChartProps {
  data: SalesChartData[];
  isLoading?: boolean;
}

export default function SalesChart({ data, isLoading }: SalesChartProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Ventes - 7 derniers jours</h3>
      {isLoading ? (
        <div className="h-80 flex items-center justify-center text-gray-500">
          Chargement...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data || []}>
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
  );
}
