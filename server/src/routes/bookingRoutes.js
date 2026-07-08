import { Router } from 'express';

import { postBooking, getMyBookings } from '../controllers/bookingController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/api/bookings', authMiddleware, postBooking);
router.get('/api/bookings/me', authMiddleware, getMyBookings);

export default router;
