import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB_PATH = process.env.DB_PATH || path.resolve('data/catatan.db');
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
