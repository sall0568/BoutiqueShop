import { z } from 'zod';

export const createExpenseSchema = z.object({
  body: z.object({
    description: z.string().min(3, 'La description doit contenir au moins 3 caractères'),
    amount: z.number().positive('Le montant doit être positif'),
    category: z.string().min(2, 'La catégorie est requise'),
    date: z.string().optional(),
  }),
});

export const updateExpenseSchema = z.object({
  body: z.object({
    description: z.string().min(3).optional(),
    amount: z.number().positive().optional(),
    category: z.string().min(2).optional(),
    date: z.string().optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export const getExpensesSchema = z.object({
  query: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    category: z.string().optional(),
  }),
});