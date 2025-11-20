import { z } from 'zod';

export const createSaleSchema = z.object({
  body: z.object({
    items: z
      .array(
        z.object({
          productId: z.string(),
          quantity: z.number().int().positive('La quantité doit être positive'),
          unitPrice: z.number().positive('Le prix unitaire doit être positif'),
          discount: z.number().min(0).optional(),
        })
      )
      .min(1, 'Au moins un article est requis'),
    discount: z.number().min(0).optional(),
    tax: z.number().min(0).optional(),
    paymentMethod: z.string().optional(),
    customerName: z.string().optional(),
    customerPhone: z.string().optional(),
    notes: z.string().optional(),
  }),
});

export const getSalesSchema = z.object({
  query: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    paymentMethod: z.string().optional(),
  }),
});