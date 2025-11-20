// src/pages/ExpensesPage.tsx - CORRIGÉ
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Calendar } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ExpensesTable from '../components/tables/ExpensesTable';
import { expensesService } from '../services/expenses.service';
import { useUIStore } from '../store/uiStore';

export default function ExpensesPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const queryClient = useQueryClient();
  const { showNotification } = useUIStore();

  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ['expenses', startDate, endDate],
    queryFn: () => expensesService.getAll({ startDate, endDate }),
  });

  const { mutate: deleteExpense } = useMutation({
    mutationFn: (id: string) => expensesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      showNotification('success', 'Dépense supprimée');
    },
    onError: () => {
      showNotification('error', 'Erreur lors de la suppression');
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dépenses</h1>
          <p className="text-gray-600 mt-1">Suivi de vos dépenses</p>
        </div>
        <Button variant="primary">
          <Plus size={20} />
          Nouvelle dépense
        </Button>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            label="Date de début"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            icon={<Calendar size={18} />}
          />
          <Input
            label="Date de fin"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            icon={<Calendar size={18} />}
          />
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : expenses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucune dépense trouvée</p>
          </div>
        ) : (
          <ExpensesTable expenses={expenses} onDelete={(id) => deleteExpense(id)} />
        )}
      </Card>
    </div>
  );
}
