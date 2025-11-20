// src/components/tables/SalesTable.tsx - CORRIGÉ
import { Sale } from '../../types';
import { formatDateTime, formatCurrency } from '../../utils/formatters';

interface SalesTableProps {
  sales: Sale[];
}

export default function SalesTable({ sales }: SalesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">N° Vente</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Vendeur</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Articles</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Montant</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {sales.map((sale) => (
            <tr key={sale.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">{sale.saleNumber}</td>
              <td className="px-6 py-4 text-sm">{formatDateTime(sale.createdAt)}</td>
              <td className="px-6 py-4 text-sm">
                {sale.user.firstName} {sale.user.lastName}
              </td>
              <td className="px-6 py-4 text-sm">{sale.items.length}</td>
              <td className="px-6 py-4 font-medium">{formatCurrency(sale.finalAmount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
