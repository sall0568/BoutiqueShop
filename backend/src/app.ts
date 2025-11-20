import express, { Application } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { env } from './config/env';
import { errorMiddleware } from './middlewares/error.middleware';

// Routes
import authRoutes from './modules/auth/auth.routes';
import usersRoutes from './modules/users/users.routes';
import storesRoutes from './modules/stores/stores.routes';
import categoriesRoutes from './modules/categories/categories.routes';
import productsRoutes from './modules/products/products.routes';
import salesRoutes from './modules/sales/sales.routes';
import expensesRoutes from './modules/expenses/expenses.routes';
import stockRoutes from './modules/stock/stock.routes';
import dashboardRoutes from './modules/dashboard/dashboard.routes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        origin: env.CORS_ORIGIN,
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Security headers
    this.app.use((req, res, next) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      next();
    });

    // Request logging in development
    if (env.NODE_ENV === 'development') {
      this.app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
      });
    }
  }

  private initializeRoutes() {
    // Health check
    this.app.get('/health', (req, res) => {
      res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
      });
    });

    // API Routes
    const apiPrefix = '/api/v1';
    this.app.use(`${apiPrefix}/auth`, authRoutes);
    this.app.use(`${apiPrefix}/users`, usersRoutes);
    this.app.use(`${apiPrefix}/stores`, storesRoutes);
    this.app.use(`${apiPrefix}/categories`, categoriesRoutes);
    this.app.use(`${apiPrefix}/products`, productsRoutes);
    this.app.use(`${apiPrefix}/sales`, salesRoutes);
    this.app.use(`${apiPrefix}/expenses`, expensesRoutes);
    this.app.use(`${apiPrefix}/stock`, stockRoutes);
    this.app.use(`${apiPrefix}/dashboard`, dashboardRoutes);

    // 404 handler
    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        error: 'Route not found',
      });
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default new App().app;