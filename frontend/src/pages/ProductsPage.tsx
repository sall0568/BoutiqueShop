// src/pages/ProductsPage.tsx (correction export)
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProductsTable from '../components/tables/ProductsTable';
import { productsService } from '../services/products.service';
import { useUIStore } from '../store/uiStore';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();
  const { showNotification } = useUIStore();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', search],
    queryFn: () => productsService.getAll({ search: search || undefined }),
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: (id: string) => productsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      showNotification('success', 'Produit supprimé');
    },
    onError: () => {
      showNotification('error', 'Erreur lors de la suppression');
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produits</h1>
          <p className="text-gray-600 mt-1">Gérez votre catalogue de produits</p>
        </div>
        <Button variant="primary">
          <Plus size={20} />
          Nouveau produit
        </Button>
      </div>

      <Card>
        <div className="mb-6">
          <Input
            placeholder="Rechercher un produit..."
            icon={<Search size={18} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucun produit trouvé</p>
          </div>
        ) : (
          <ProductsTable products={products} onDelete={(id) => deleteProduct(id)} />
        )}
      </Card>
    </div>
  );
}
