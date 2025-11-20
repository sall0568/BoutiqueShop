// src/components/dashboard/TopProducts.tsx
import Card from "../common/Card";
import { TopProduct } from "../../types";
import { formatCurrency } from "../../utils/formatters";

interface TopProductsProps {
  products: TopProduct[];
  isLoading?: boolean;
}

export default function TopProducts({ products, isLoading }: TopProductsProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Top Produits Vendus</h3>
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{item.product.name}</p>
                <p className="text-xs text-gray-500">
                  {item.totalQuantity} unités
                </p>
              </div>
              <p className="font-semibold text-blue-600">
                {formatCurrency(item.totalRevenue)}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
