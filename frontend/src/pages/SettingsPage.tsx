// src/pages/SettingsPage.tsx - CORRIGÉ
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { storesService } from '../services/stores.service';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';

export default function SettingsPage() {
  const { showNotification } = useUIStore();
  const { store } = useAuthStore();

  const [formData, setFormData] = useState({
    name: store?.name || '',
    address: store?.address || '',
    phone: store?.phone || '',
    email: store?.email || '',
    taxRate: store?.taxRate || 0,
  });

  const { mutate: updateStore, isPending } = useMutation({
    mutationFn: () => storesService.update(formData),
    onSuccess: () => {
      showNotification('success', 'Paramètres mis à jour avec succès');
    },
    onError: () => {
      showNotification('error', 'Erreur lors de la mise à jour');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'taxRate' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStore();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-1">Configurez votre boutique</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations de la boutique</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nom de la boutique"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Adresse"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <Input
                label="Téléphone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                label="Taux de TVA (%)"
                type="number"
                name="taxRate"
                value={formData.taxRate}
                onChange={handleChange}
                step="0.1"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" isLoading={isPending}>
              <Save size={20} />
              Enregistrer les modifications
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
