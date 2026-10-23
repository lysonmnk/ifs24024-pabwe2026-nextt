import { sendError } from '../utils/responseHelper.js';
import { AppError } from '../utils/AppError.js';

export const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.message, err.errors);
  }

  // SQLite constraints or syntax errors
  if (err.code && err.code.startsWith('SQLITE_')) {
    return sendError(res, 400, 'Kesalahan pada database', [err.message]);
  }

  // Fallback for unexpected errors
  console.error('Unhandled Error:', err);
  return sendError(res, 500, 'Terjadi kesalahan pada server', [err.message || 'Internal Server Error']);
};
