import { createEventSchema, updateEventSchema } from '../validations/eventValidation.js';
import {
  listEvents,
  listEventsByOrganiser,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../services/eventService.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const getEvents = async (req, res, next) => {
  try {
    const events = await listEvents();
    return sendSuccess(res, 'Events fetched', events);
  } catch (error) {
    return next(error);
  }
};

export const getMyEvents = async (req, res, next) => {
  try {
    const events = await listEventsByOrganiser(req.user.id);
    return sendSuccess(res, 'Your events fetched', events);
  } catch (error) {
    return next(error);
  }
};

export const getEvent = async (req, res, next) => {
  try {
    const event = await getEventById(Number(req.params.id));
    return sendSuccess(res, 'Event fetched', event);
  } catch (error) {
    return next(error);
  }
};

export const postEvent = async (req, res, next) => {
  const parsed = createEventSchema.safeParse(req.body);

  if (!parsed.success) {
    return sendError(res, 'Validation failed', parsed.error.issues, 400);
  }

  try {
    const event = await createEvent(req.user.id, parsed.data);
    return sendSuccess(res, 'Event created', event, 201);
  } catch (error) {
    return next(error);
  }
};

export const putEvent = async (req, res, next) => {
  const parsed = updateEventSchema.safeParse(req.body);

  if (!parsed.success) {
    return sendError(res, 'Validation failed', parsed.error.issues, 400);
  }

  try {
    const event = await updateEvent(Number(req.params.id), req.user.id, parsed.data);
    return sendSuccess(res, 'Event updated', event);
  } catch (error) {
    return next(error);
  }
};

export const removeEvent = async (req, res, next) => {
  try {
    await deleteEvent(Number(req.params.id), req.user.id);
    return sendSuccess(res, 'Event deleted', null);
  } catch (error) {
    return next(error);
  }
};
