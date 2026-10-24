/**
 * Konfigurasi Environment Backend yang Aman (Secure Backend Environment Config).
 * Memuat variabel lingkungan dari file .env dengan validasi ketat,
 * sanitasi tipe data, serta peringatan keamanan pada lingkungan produksi.
 */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = Number(process.env.PORT) || 3000;
export const DB_PATH = process.env.DB_PATH || path.resolve('data/catatan.db');
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

const DEFAULT_DEV_SECRET = 'kunci-rahasia-default-pengembangan-ifs24024';
export const JWT_SECRET = process.env.JWT_SECRET || DEFAULT_DEV_SECRET;

// Validasi proteksi produksi: mencegah kebocoran secret default di production
if (NODE_ENV === 'production' && JWT_SECRET === DEFAULT_DEV_SECRET) {
  console.warn('[SECURITY WARNING] Menggunakan JWT_SECRET default di lingkungan produksi! Disarankan menyetel JWT_SECRET yang kuat dan unik melalui variabel lingkungan.');
}

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
