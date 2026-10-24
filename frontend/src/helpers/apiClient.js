import { API_BASE_URL } from '../lib/config.js';
import { getToken, clearToken } from './tokenStorage.js';

const AUTH_PUBLIC_ENDPOINTS = ['/auth/login', '/auth/register'];

const shouldForceLogout = (endpoint, status) =>
  status === 401 && !AUTH_PUBLIC_ENDPOINTS.includes(endpoint);

export const apiClient = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();
  const { headers: customHeaders, ...restOptions } = options;

  const config = {
    ...restOptions,
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
