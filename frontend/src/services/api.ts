import axios, { AxiosInstance, AxiosError } from 'axios';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';

// Configuration de l'API
// ✅ APRÈS (fonctionne avec les types)
const API_URL = 
  (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api/v1';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor pour ajouter le token JWT
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor pour gérer les erreurs de réponse
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const { showNotification } = useUIStore.getState();

        if (error.response?.status === 401) {
          // Token expiré ou invalide
          useAuthStore.getState().logout();
          window.location.href = '/login';
          showNotification('error', 'Session expirée. Veuillez vous reconnecter.');
        } else if (error.response?.status === 403) {
          // Accès refusé
          showNotification(
            'error',
            "Vous n'avez pas la permission d'accéder à cette ressource."
          );
        } else if (error.response?.data) {
          // Erreur API
          const data = error.response.data as any;
          showNotification('error', data.error || 'Une erreur est survenue');
        } else if (error.request) {
          // La requête a été faite mais pas de réponse
          showNotification('error', 'Erreur de connexion au serveur');
        } else {
          // Erreur lors de la configuration de la requête
          showNotification('error', 'Une erreur est survenue');
        }

        return Promise.reject(error);
      }
    );
  }

  get<T>(url: string, config?: any) {
    return this.client.get<T>(url, config);
  }

  post<T>(url: string, data?: any, config?: any) {
    return this.client.post<T>(url, data, config);
  }

  put<T>(url: string, data?: any, config?: any) {
    return this.client.put<T>(url, data, config);
  }

  delete<T>(url: string, config?: any) {
    return this.client.delete<T>(url, config);
  }
}

export const apiClient = new ApiClient();