import { Router } from 'express';

import {
  getEvents,
  getMyEvents,
  getEvent,
  postEvent,
  putEvent,
  removeEvent,
} from '../controllers/eventController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/api/events', getEvents);
router.get('/api/events/mine', authMiddleware, requireRole('ORGANISER'), getMyEvents);
router.get('/api/events/:id', getEvent);
router.post('/api/events', authMiddleware, requireRole('ORGANISER'), postEvent);
router.put('/api/events/:id', authMiddleware, requireRole('ORGANISER'), putEvent);
router.delete('/api/events/:id', authMiddleware, requireRole('ORGANISER'), removeEvent);

export default router;
