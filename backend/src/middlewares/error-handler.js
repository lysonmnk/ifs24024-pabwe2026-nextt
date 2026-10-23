import { sendError } from '../utils/response.js';
import { AppError } from '../utils/app-error.js';

export const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.message, err.errors);
  }

  // Handle SQLite UNIQUE constraint violation
  if (err.code === 'SQLITE_CONSTRAINT' || (err.message && err.message.includes('UNIQUE constraint failed'))) {
    if (err.message.includes('users.email')) {
      return sendError(res, 409, 'Email sudah terdaftar', ['Email ini sudah digunakan oleh akun lain']);
    }
    return sendError(res, 400, 'Kesalahan integritas database', [err.message]);
  }

  if (err.code && err.code.startsWith('SQLITE_')) {
    return sendError(res, 400, 'Kesalahan pada database', [err.message]);
  }

  console.error('Unhandled Error:', err);
  return sendError(res, 500, 'Terjadi kesalahan pada server', [
    err.message || 'Internal Server Error'
  ]);
};
