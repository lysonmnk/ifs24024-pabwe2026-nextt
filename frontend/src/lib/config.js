/**
 * Konfigurasi Lingkungan Frontend yang Aman (Secure Environment Configuration).
 * Menggunakan prioritas resolusi:
 * 1. Environment variable eksplisit `VITE_API_URL`.
 * 2. Pada mode produksi (`import.meta.env.PROD`), gunakan relative path '/api' untuk
 *    menghindari kebocoran URL localhost dan mengatasi masalah mixed-content HTTPS.
 * 3. Pada mode development, gunakan fallback local development server 'http://localhost:3000/api'.
 */
const resolveApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/+$/, '');
  }
  return import.meta.env.PROD ? '/api' : 'http://localhost:3000/api';
};

export const API_BASE_URL = resolveApiBaseUrl();

export const APP_NAME = 'Catatan Belajar Ngoding';
export const STUDENT_NAME = 'Lyson Paulus Esar Manik';
export const STUDENT_NIM = '11S24024';

