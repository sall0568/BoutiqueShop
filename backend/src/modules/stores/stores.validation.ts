import { z } from 'zod';

export const updateStoreSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    currency: z.string().optional(),
    taxRate: z.number().min(0).max(100).optional(),
  }),
});