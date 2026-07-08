import { registerSchema, loginSchema } from '../validations/authValidation.js';
import { registerUser, loginUser, getUserById } from '../services/authService.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const register = async (req, res, next) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return sendError(res, 'Validation failed', parsed.error.issues, 400);
  }

  try {
    const { user, token } = await registerUser(parsed.data);
    return sendSuccess(res, 'Registered successfully', { user, token }, 201);
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return sendError(res, 'Validation failed', parsed.error.issues, 400);
  }

  try {
    const { user, token } = await loginUser(parsed.data);
    return sendSuccess(res, 'Logged in successfully', { user, token });
  } catch (error) {
    return next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    return sendSuccess(res, 'Current user', user);
  } catch (error) {
    return next(error);
  }
};
