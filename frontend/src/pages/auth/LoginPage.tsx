import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Mail, Lock } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { authService } from '../../services/auth.service';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const { showNotification } = useUIStore();
  const [email, setEmail] = useState('admin@demo.ci');
  const [password, setPassword] = useState('admin123');

  const { mutate: login, isPending } = useMutation({
    mutationFn: () => authService.login({ email, password }),
    onSuccess: async (data) => {
      if (!data) {
        showNotification('error', 'Erreur: pas de données reçues');
        return;
      }

      try {
        const userData = await authService.getCurrentUser();
        if (userData?.store) {
          setAuth(data.user, userData.store, data.token);
          showNotification('success', 'Connexion réussie');
          navigate('/');
        } else {
          showNotification('error', 'Erreur lors du chargement des données');
        }
      } catch (error) {
        showNotification('error', 'Erreur lors du chargement des données utilisateur');
      }
    },
    onError: (error: any) => {
      showNotification('error', error.response?.data?.error || 'Erreur de connexion');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">SaaS Gestion</h1>
          <p className="text-gray-600">Gestion Boutiques & Petits Commerce</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="votre@email.com"
            icon={<Mail size={18} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={18} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" isLoading={isPending} className="w-full">
            Se connecter
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Pas encore de compte?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              S'inscrire
            </Link>
          </p>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-gray-600">
          <p className="font-semibold mb-1">Comptes de démonstration:</p>
          <p>👤 Admin: admin@demo.ci / admin123</p>
          <p>👤 Employé: employee@demo.ci / admin123</p>
        </div>
      </Card>
    </div>
  );
}
