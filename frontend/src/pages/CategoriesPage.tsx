// src/pages/CategoriesPage.tsx - CORRIGÉ (Sans export function)
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { categoriesService } from '../services/categories.service';

export default function CategoriesPage() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesService.getAll(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Catégories</h1>
          <p className="text-gray-600 mt-1">Organisez vos produits par catégorie</p>
        </div>
        <Button variant="primary">
          <Plus size={20} />
          Nouvelle catégorie
        </Button>
      </div>

      <Card>
        {isLoading ? (
          <LoadingSpinner />
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucune catégorie trouvée</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
              >
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {category._count?.products || 0} produits
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
