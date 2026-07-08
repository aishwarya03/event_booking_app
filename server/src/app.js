import express from 'express';
import cors from 'cors';

import healthRoutes from './routes/healthRoutes.js';
import pingRoutes from './routes/pingRoutes.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Built-in Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(healthRoutes);
app.use(pingRoutes);
app.use(authRoutes);
app.use(eventRoutes);
app.use(bookingRoutes);

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;