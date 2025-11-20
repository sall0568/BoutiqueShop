import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Mail, Lock, Store, Phone } from 'lucide-react'; // ✅ Supprimé 'User'
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { authService } from '../../services/auth.service';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const { showNotification } = useUIStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    storeName: '',
  });

  const { mutate: register, isPending } = useMutation({
    mutationFn: () => authService.register(formData),
    onSuccess: async (data) => {
      if (!data) {
        showNotification('error', 'Erreur: pas de données reçues');
        return;
      }

      try {
        const userData = await authService.getCurrentUser();
        if (userData?.store) {
          setAuth(data.user, userData.store, data.token);
          showNotification('success', 'Inscription réussie');
          navigate('/');
        } else {
          showNotification('error', 'Erreur lors du chargement des données');
        }
      } catch (error) {
        showNotification('error', 'Erreur lors du chargement des données utilisateur');
      }
    },
    onError: (error: any) => {
      showNotification('error', error.response?.data?.error || "Erreur d'inscription");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">SaaS Gestion</h1>
          <p className="text-gray-600">Créer une nouvelle boutique</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Prénom"
              name="firstName"
              placeholder="Jean"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              label="Nom"
              name="lastName"
              placeholder="Dupont"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="jean@boutique.ci"
            icon={<Mail size={18} />}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Mot de passe"
            type="password"
            name="password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            label="Téléphone"
            name="phone"
            placeholder="+225 07 00 00 00 00"
            icon={<Phone size={18} />}
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            label="Nom de la boutique"
            name="storeName"
            placeholder="Ma Boutique"
            icon={<Store size={18} />}
            value={formData.storeName}
            onChange={handleChange}
            required
          />

          <Button type="submit" isLoading={isPending} className="w-full">
            Créer mon compte
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Déjà inscrit?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
