// src/hooks/useApi.ts
// import { AxiosError } from 'axios';
// import { useMutation, useQuery, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { useUIStore } from '../store/uiStore';

export const useApi = () => {
  const { showNotification } = useUIStore();

  const handleError = (error: any) => {
    const message =
      error.response?.data?.error ||
      error.response?.statusText ||
      'Une erreur est survenue';
    showNotification('error', message);
  };

  return {
    handleError,
    showNotification,
  };
};