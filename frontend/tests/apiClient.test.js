import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiClient } from '../src/helpers/apiClient.js';

describe('apiClient helper tests', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('mengembalikan response data saat permintaan berhasil', async () => {
    const mockData = { success: true, message: 'OK', data: { id: 1 } };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const res = await apiClient('/materi');
    expect(res).toEqual(mockData);
  });

  it('melemparkan error saat response not ok (400/500)', async () => {
    const errorData = { success: false, message: 'Validasi gagal', errors: ['Judul wajib diisi'] };
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => errorData
    });

    await expect(apiClient('/materi')).rejects.toThrow('Validasi gagal');
  });

  it('menangani kesalahan koneksi jaringan', async () => {
    fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(apiClient('/materi')).rejects.toThrow(/server backend/i);
  });
});
