import { z } from 'zod';

export const createBookingSchema = z.object({
  ticketTierId: z.number().int().positive(),
  quantity: z.number().int().positive('Quantity must be at least 1'),
});
