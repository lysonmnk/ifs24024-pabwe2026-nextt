import { API_BASE_URL } from '../lib/config.js';
import { getToken, clearToken } from './tokenStorage.js';

/**
 * Daftar endpoint publik yang tidak memerlukan autentikasi
 * dan tidak boleh memicu auto-logout jika menerima status 401 (misal kredensial salah).
 */
const AUTH_PUBLIC_ENDPOINTS = ['/auth/login', '/auth/register'];

/**
 * Menentukan apakah respons 401 harus memicu penghapusan token dan event logout global.
 *
 * @param {string} endpoint - Path endpoint yang diminta
 * @param {number} status - Kode status HTTP respons
 * @returns {boolean} True jika harus memicu force logout
 */
const shouldForceLogout = (endpoint, status) =>
  status === 401 && !AUTH_PUBLIC_ENDPOINTS.includes(endpoint);

/**
 * Klien HTTP Terpusat (Centralized API Client).
 * Membungkus fungsi Fetch API standar dengan fitur otomatis:
 * 1. Base URL Resolution: Menggabungkan base URL konfigurasi dengan endpoint.
 * 2. Automatic Authorization Header & Cookie Handling: Mendukung credentials 'include' (HttpOnly cookie)
 *    dengan fallback Authorization Bearer token dari storage untuk perlindungan ganda.
 * 3. Error Normalization: Memetakan status HTTP error dan payload JSON error ke JavaScript Error object terstruktur.
 * 4. Automatic Session Eviction: Jika menerima 401 Unauthorized pada rute terproteksi, otomatis menghapus token
 *    dan memicu event `auth:logout` untuk membersihkan state React Context.
 * 5. Network Failure Handling: Menangkap kegagalan koneksi TCP/jaringan (fetch TypeError) dan menghasilkan
 *    pesan kesalahan yang informatif dan ramah pengguna.
 *
 * @param {string} endpoint - Path relatif API (misal '/materi')
 * @param {RequestInit} [options={}] - Opsi Fetch API standar (method, headers, body)
 * @returns {Promise<any>} Data hasil parsing JSON dari server
 * @throws {Error} Error terstruktur jika respons tidak ok atau jaringan bermasalah
 */
export const apiClient = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();
  const { headers: customHeaders, ...restOptions } = options;

  const config = {
    ...restOptions,
    // Mendukung HttpOnly Cookie lintas domain secara aman
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...customHeaders
    }
  };

  try {
    const res = await fetch(url, config);
    const result = await res.json().catch(() => null);

    if (!res.ok) {
      if (shouldForceLogout(endpoint, res.status)) {
        clearToken();
        window.dispatchEvent(new Event('auth:logout'));
      }

      const errorMessage =
        result?.message ||
        (result?.errors ? result.errors.join(', ') : `HTTP Error ${res.status}`);
      const error = new Error(errorMessage);
      error.status = res.status;
      error.errors = result?.errors || [errorMessage];
      throw error;
    }

    return result;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const netError = new Error(
        'Gagal terhubung ke server backend. Pastikan server sudah aktif.'
      );
      netError.errors = ['Koneksi jaringan terputus atau server backend mati'];
      throw netError;
    }
    throw err;
  }
};
