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
  