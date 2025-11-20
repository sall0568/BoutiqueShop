import { create } from 'zustand';
import { Product } from '../types';

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  filters: {
    search?: string;
    categoryId?: string;
    isActive?: boolean;
    lowStock?: boolean;
  };
  isLoading: boolean;

  // Actions
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  setFilters: (filters: Partial<ProductsState['filters']>) => void;
  setIsLoading: (isLoading: boolean) => void;
  clearFilters: () => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  selectedProduct: null,
  filters: {},
  isLoading: false,

  setProducts: (products) => set({ products }),
  
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  
  setIsLoading: (isLoading) => set({ isLoading }),
  
  clearFilters: () =>
    set({
      filters: {},
      selectedProduct: null,
    }),
}));