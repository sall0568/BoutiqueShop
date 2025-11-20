export interface JWTPayload {
    userId: string;
    email: string;
    role: string;
    storeId: string;
  }
  
  export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
  }