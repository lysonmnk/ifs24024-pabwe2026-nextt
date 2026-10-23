import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import { sendError } from '../utils/response.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 401, 'Akses ditolak', ['Token autentikasi tidak ditemukan. Silakan login terlebih dahulu.']);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, 401, 'Token kedaluwarsa', ['Sesi login Anda telah berakhir. Silakan login kembali.']);
    }
    return sendError(res, 401, 'Token tidak valid', ['Token autentikasi tidak valid atau telah dimodifikasi.']);
  }
};
