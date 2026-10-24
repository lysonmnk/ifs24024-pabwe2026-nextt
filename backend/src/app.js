import express from 'express';
import cors from 'cors';
import { CORS_ORIGIN } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/error-handler.js';
import { sendError } from './utils/response.js';

const app = express();

const allowedOrigins = CORS_ORIGIN.split(',').map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(new Error('Origin tidak diizinkan oleh CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());

app.use('/api', routes);

app.use((req, res) => {
  return sendError(res, 404, `Endpoint ${req.originalUrl} tidak ditemukan`, [
    'Endpoint yang diminta tidak tersedia'
  ]);
});

app.use(errorHandler);

export default app;
