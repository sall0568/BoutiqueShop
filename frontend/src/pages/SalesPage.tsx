import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Calendar } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SalesTable from '../components/tables/SalesTable';
import { salesService } from '../services/sales.service';
import { useUIStore } from '../store/uiStore';

export default function SalesPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const queryClient = useQueryClient();
  const { showNotification } = useUIStore();

  const { data: sales = [], isLoading } = useQuery({
    queryKey: ['sales', startDate, endDate],
    queryFn: () => salesService.getAll({ startDate, endDate }),
  });

  const { mutate: deleteSale } = useMutation({
    mutationFn: (id: string) => salesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      showNotification('success', 'Vente annulée');
    },
    onError: () => {
      showNotification('error', "Erreur lors de l'annulation");
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ventes</h1>
          <p className="text-gray-600 mt-1">Historique de toutes les ventes</p>
        </div>
        <Button variant="primary">
          <Plus size={20} />
          Nouvelle vente
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
        ) : sales.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucune vente trouvée</p>
          </div>
        ) : (
          <SalesTable sales={sales} />
        )}
      </Card>
    </div>
  );
}
