import { z } from 'zod';
import { StockMovementType } from '@prisma/client';

export const createStockMovementSchema = z.object({
  body: z.object({
    type: z.nativeEnum(StockMovementType),
    quantity: z.number().int().positive('La quantité doit être positive'),
    reason: z.string().optional(),
    productId: z.string(),
  }),
});

export const getStockMovementsSchema = z.object({
  query: z.object({
    productId: z.string().optional(),
    type: z.nativeEnum(StockMovementType).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
});