// src/utils/constants.ts
export const API_BASE_URL = 
  (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api/v1';  // ✅ Ajouté cast

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

