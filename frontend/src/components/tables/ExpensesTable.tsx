// src/components/tables/ExpensesTable.tsx - CORRIGÉ
import { Expense } from '../../types';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { Trash2 } from 'lucide-react';

interface ExpensesTableProps {
  expenses: Expense[];
  onDelete?: (id: string) => void;
}

export default function ExpensesTable({ expenses, onDelete }: ExpensesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Catégorie</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Montant</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{expense.description}</td>
              <td className="px-6 py-4 text-sm">{expense.category}</td>
              <td className="px-6 py-4 font-medium text-red-600">
                {formatCurrency(expense.amount)}
              </td>
              <td className="px-6 py-4 text-sm">{formatDate(expense.date)}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onDelete?.(expense.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
