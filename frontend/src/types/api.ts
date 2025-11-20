export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
  }
  
  export interface ApiError {
    response?: {
      status: number;
      data: {
        error?: string;
        message?: string;
      };
    };
    message: string;
  }
  
  export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }