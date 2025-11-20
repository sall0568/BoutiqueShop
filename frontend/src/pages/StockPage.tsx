// src/pages/StockPage.tsx - CORRIGÉ
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import KPICard from '../components/dashboard/KPICard';
import { stockService } from '../services/stock.service';
import { formatCurrency } from '../utils/formatters';

export default function StockPage() {
  const { data: value, isLoading: isLoadingValue } = useQuery({
    queryKey: ['stock-value'],
    queryFn: () => stockService.getValue(),
  });

  const { data: alerts, isLoading: isLoadingAlerts } = useQuery({
    queryKey: ['stock-alerts'],
    queryFn: () => stockService.getAlerts(),
  });

  if (isLoadingValue || isLoadingAlerts) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion du Stock</h1>
        <p className="text-gray-600 mt-1">Suivi complet de votre inventaire</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          title="Valeur PA"
          value={formatCurrency(value?.totalCostValue || 0)}
          icon={<TrendingUp size={24} />}
          subtitle="Valeur d'achat totale"
        />
        <KPICard
          title="Valeur PV"
          value={formatCurrency(value?.totalRetailValue || 0)}
          icon={<TrendingUp size={24} />}
          subtitle="Valeur de vente totale"
        />
        <KPICard
          title="Stock Critique"
          value={alerts?.criticalStock.length || 0}
          icon={<AlertTriangle size={24} />}
          subtitle="Produits à réapprovisionner"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-semibold text-red-900 mb-2">Rupture de stock</h3>
          <p className="text-3xl font-bold text-red-600">{alerts?.outOfStock.length || 0}</p>
          <p className="text-xs text-red-700 mt-1">Produits en rupture</p>
        </div>

        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="font-semibold text-orange-900 mb-2">Stock minimum atteint</h3>
          <p className="text-3xl font-bold text-orange-600">{alerts?.criticalStock.length || 0}</p>
          <p className="text-xs text-orange-700 mt-1">Produits à surveiller</p>
        </div>
      </div>
    </div>
  );
}
