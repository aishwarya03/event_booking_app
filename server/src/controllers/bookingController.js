import { createBookingSchema } from '../validations/bookingValidation.js';
import { createBooking, listBookingsForUser } from '../services/bookingService.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const postBooking = async (req, res, next) => {
  const parsed = createBookingSchema.safeParse(req.body);

  if (!parsed.success) {
    return sendError(res, 'Validation failed', parsed.error.issues, 400);
  }

  try {
    const booking = await createBooking(req.user.id, parsed.data);
    return sendSuccess(res, 'Ticket booked', booking, 201);
  } catch (error) {
    return next(error);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await listBookingsForUser(req.user.id);
    return sendSuccess(res, 'Your bookings fetched', bookings);
  } catch (error) {
    return next(error);
  }
};
