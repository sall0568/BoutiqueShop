import { useState } from 'react';
import { Mail, Lock, Store, Phone } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

interface RegisterFormProps {
  onSubmit: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    storeName: string;
  }) => void;
  isLoading?: boolean;
}

export default function RegisterForm({ onSubmit, isLoading }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    storeName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Effacer l'erreur du champ quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validation email
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    // Validation mot de passe
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    // Validation confirmation mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmez le mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    // Validation prénom
    if (!formData.firstName) {
      newErrors.firstName = 'Le prénom est requis';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'Le prénom doit contenir au moins 2 caractères';
    }

    // Validation nom
    if (!formData.lastName) {
      newErrors.lastName = 'Le nom est requis';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Le nom doit contenir au moins 2 caractères';
    }

    // Validation nom de la boutique
    if (!formData.storeName) {
      newErrors.storeName = 'Le nom de la boutique est requis';
    } else if (formData.storeName.length < 2) {
      newErrors.storeName = 'Le nom doit contenir au moins 2 caractères';
    }

    // Validation téléphone (optionnel mais si renseigné, doit être valide)
    if (
      formData.phone &&
      !/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/.test(formData.phone)
    ) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      storeName: formData.storeName,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Prénom et Nom en deux colonnes */}
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Prénom"
          name="firstName"
          placeholder="Jean"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
        />
        <Input
          label="Nom"
          name="lastName"
          placeholder="Dupont"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          required
        />
      </div>

      {/* Email */}
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="jean@boutique.ci"
        icon={<Mail size={18} />}
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      {/* Mot de passe */}
      <Input
        label="Mot de passe"
        type="password"
        name="password"
        placeholder="••••••••"
        icon={<Lock size={18} />}
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        helperText="Minimum 6 caractères"
        required
      />

      {/* Confirmation mot de passe */}
      <Input
        label="Confirmer le mot de passe"
        type="password"
        name="confirmPassword"
        placeholder="••••••••"
        icon={<Lock size={18} />}
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
      />

      {/* Téléphone */}
      <Input
        label="Téléphone"
        type="tel"
        name="phone"
        placeholder="+225 07 00 00 00 00"
        icon={<Phone size={18} />}
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        helperText="Optionnel"
      />

      {/* Nom de la boutique */}
      <Input
        label="Nom de la boutique"
        name="storeName"
        placeholder="Ma Boutique"
        icon={<Store size={18} />}
        value={formData.storeName}
        onChange={handleChange}
        error={errors.storeName}
        required
      />

      {/* Bouton de soumission */}
      <Button type="submit" isLoading={isLoading} className="w-full">
        Créer mon compte
      </Button>

      {/* Avertissement sur les données */}
      <p className="text-xs text-gray-500 text-center">
        En créant un compte, vous acceptez nos conditions d'utilisation.
      </p>
    </form>
  );
}
