export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: 'ADMIN' | 'EMPLOYEE';
    storeId: string;
    isActive: boolean;
    createdAt: string;
  }
  
  export interface Store {
    id: string;
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    currency: string;
    taxRate: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Category {
    id: string;
    name: string;
    description?: string;
    storeId: string;
    _count?: { products: number };
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Product {
    id: string;
    name: string;
    description?: string;
    sku?: string;
    barcode?: string;
    price: number;
    cost: number;
    quantity: number;
    minQuantity: number;
    unit: string;
    categoryId?: string;
    category?: Category;
    storeId: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface SaleItem {
    id: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    subtotal: number;
    productId: string;
    product: Product;
  }
  
  export interface Sale {
    id: string;
    saleNumber: string;
    totalAmount: number;
    discount: number;
    tax: number;
    finalAmount: number;
    paymentMethod: string;
    customerName?: string;
    customerPhone?: string;
    notes?: string;
    userId: string;
    user: { id: string; firstName: string; lastName: string };
    storeId: string;
    items: SaleItem[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Expense {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    userId: string;
    user: { id: string; firstName: string; lastName: string; email: string };
    storeId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface StockMovement {
    id: string;
    type: 'IN' | 'OUT' | 'ADJUSTMENT';
    quantity: number;
    reason?: string;
    productId: string;
    product: { id: string; name: string; sku?: string };
    userId: string;
    user: { id: string; firstName: string; lastName: string };
    createdAt: string;
  }
  
  export interface DashboardOverview {
    revenue: { total: number; count: number };
    expenses: { total: number; count: number };
    netProfit: number;
    products: { total: number; lowStock: number };
    today: { revenue: number; salesCount: number };
  }
  
  export interface SalesChartData {
    date: string;
    amount: number;
  }
  
  export interface TopProduct {
    product: { id: string; name: string; sku?: string; price: number };
    totalQuantity: number;
    totalRevenue: number;
  }
  
  export interface RecentActivity {
    type: 'sale' | 'expense' | 'stock';
    id: string;
    description: string;
    amount?: number;
    category?: string;
    quantity?: number;
    reason?: string;
    user: string;
    createdAt: string;
  }
  
  export interface StockValue {
    totalCostValue: number;
    totalRetailValue: number;
    potentialProfit: number;
    totalProducts: number;
    totalItems: number;
  }
  
  export interface StockAlerts {
    outOfStock: Product[];
    criticalStock: Product[];
    total: number;
  }