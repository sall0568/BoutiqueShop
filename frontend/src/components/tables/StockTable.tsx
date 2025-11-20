// src/components/tables/StockTable.tsx - CORRIGÉ
import { StockMovement } from '../../types';
import { formatDateTime } from '../../utils/formatters';
import { ArrowUp, ArrowDown, Settings } from 'lucide-react';

interface StockTableProps {
  movements: StockMovement[];
}

export default function StockTable({ movements }: StockTableProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'IN':
        return <ArrowDown size={16} className="text-green-600" />;
      case 'OUT':
        return <ArrowUp size={16} className="text-red-600" />;
      case 'ADJUSTMENT':
        return <Settings size={16} className="text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Produit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Quantité</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Raison</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {movements.map((movement) => (
            <tr key={movement.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{movement.product.name}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                  {getIcon(movement.type)}
                  <span className="text-sm">{movement.type}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-medium">{movement.quantity}</td>
              <td className="px-6 py-4 text-sm">{movement.reason}</td>
              <td className="px-6 py-4 text-sm">{formatDateTime(movement.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
