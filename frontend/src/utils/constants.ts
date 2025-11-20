// src/utils/constants.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const PAYMENT_METHODS = [
  { value: 'CASH', label: 'Espèces' },
  { value: 'CARD', label: 'Carte' },
  { value: 'MOBILE_MONEY', label: 'Mobile Money' },
  { value: 'CHECK', label: 'Chèque' },
  { value: 'TRANSFER', label: 'Virement' },
];

export const STOCK_MOVEMENT_TYPES = [
  { value: 'IN', label: 'Entrée' },
  { value: 'OUT', label: 'Sortie' },
  { value: 'ADJUSTMENT', label: 'Ajustement' },
];

export const EXPENSE_CATEGORIES = [
  'Salaires',
  'Loyer',
  'Électricité',
  'Eau',
  'Téléphone',
  'Internet',
  'Fournitures',
  'Transport',
  'Maintenance',
  'Publicité',
  'Assurances',
  'Autre',
];

// src/utils/formatters.ts
export const formatCurrency = (value: number, currency = 'XOF') => {
  return value.toLocaleString('fr-CI', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  });
};

export const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat('fr-CI', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const formatDateTime = (date: string | Date) => {
  return new Intl.DateTimeFormat('fr-CI', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const formatPercent = (value: number) => {
  return `${value.toFixed(2)}%`;
};

// src/utils/validation.ts
export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 6;
};

export const validatePhone = (phone: string) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return re.test(phone);
};