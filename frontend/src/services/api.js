const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const request = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const res = await fetch(url, config);
    const result = await res.json().catch(() => null);

    if (!res.ok) {
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
      const netError = new Error('Gagal terhubung ke server backend. Pastikan server sudah aktif.');
      netError.errors = ['Koneksi jaringan terputus atau server backend mati'];
      throw netError;
    }
    throw err;
  }
};
