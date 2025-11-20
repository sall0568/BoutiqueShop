// src/pages/UsersPage.tsx - CORRIGÉ
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import UsersTable from '../components/tables/UsersTable';
import { usersService } from '../services/users.service';

export default function UsersPage() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.getAll(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-600 mt-1">Gérez votre équipe</p>
        </div>
        <Button variant="primary">
          <Plus size={20} />
          Nouvel utilisateur
        </Button>
      </div>

      <Card>
        {isLoading ? (
          <LoadingSpinner />
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucun utilisateur trouvé</p>
          </div>
        ) : (
          <UsersTable users={users} />
        )}
      </Card>
    </div>
  );
}
