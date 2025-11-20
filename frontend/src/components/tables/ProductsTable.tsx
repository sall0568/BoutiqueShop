// src/components/tables/ProductsTable.tsx - CORRIGÉ
import { Product } from '../../types';
import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface ProductsTableProps {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

export default function ProductsTable({ products, onEdit, onDelete }: ProductsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Nom</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">SKU</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Prix</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Coût</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{product.sku}</td>
              <td className="px-6 py-4 font-medium">{formatCurrency(product.price)}</td>
              <td className="px-6 py-4 font-medium text-gray-600">
                {formatCurrency(product.cost)}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    product.quantity <= product.minQuantity
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {product.quantity}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit?.(product)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete?.(product.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
