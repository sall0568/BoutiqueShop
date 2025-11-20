// src/components/tables/UsersTable.tsx - CORRIGÉ
import { User } from '../../types';
import { Shield, Edit2, Trash2 } from 'lucide-react';

interface UsersTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (id: string) => void;
}

export default function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Nom</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Rôle</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Téléphone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                {user.firstName} {user.lastName}
              </td>
              <td className="px-6 py-4 text-sm">{user.email}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                  <Shield size={16} />
                  <span className="text-sm">{user.role}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm">{user.phone}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit?.(user)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete?.(user.id)}
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
