import { z } from 'zod';

const ticketTierSchema = z.object({
  name: z.string().min(1, 'Tier name is required'),
  price: z.number().nonnegative('Price must be 0 or more'),
  totalQuantity: z.number().int().positive('Quantity must be at least 1'),
});

export const createEventSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  location: z.string().min(1, 'Location is required'),
  startsAt: z.coerce.date(),
  ticketTiers: z.array(ticketTierSchema).min(1, 'At least one ticket tier is required'),
});

export const updateEventSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  startsAt: z.coerce.date().optional(),
});
