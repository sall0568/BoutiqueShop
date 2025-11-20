import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    description: z.string().optional(),
    sku: z.string().optional(),
    barcode: z.string().optional(),
    price: z.number().positive('Le prix doit être positif'),
    cost: z.number().min(0, 'Le coût ne peut pas être négatif').optional(),
    quantity: z.number().int().min(0, 'La quantité ne peut pas être négative').optional(),
    minQuantity: z.number().int().min(0, 'La quantité minimale ne peut pas être négative').optional(),
    unit: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional(),
    sku: z.string().optional(),
    barcode: z.string().optional(),
    price: z.number().positive().optional(),
    cost: z.number().min(0).optional(),
    quantity: z.number().int().min(0).optional(),
    minQuantity: z.number().int().min(0).optional(),
    unit: z.string().optional(),
    categoryId: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export const searchProductSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    categoryId: z.string().optional(),
    isActive: z.string().optional(),
    lowStock: z.string().optional(),
  }),
});