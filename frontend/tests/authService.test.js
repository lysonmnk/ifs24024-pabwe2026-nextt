import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { login, register, getMe } from '../src/features/auth/services/authService.js';

describe('authService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('mengembalikan token saat login berhasil', async () => {
    const payload = {
      success: true,
      data: { token: 'jwt', user: { id: 1, nama: 'Lyson', email: 'lyson@example.com' } }
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => payload
    });

    const data = await login({ email: 'lyson@example.com', password: 'rahasia123' });
    expect(data.token).toBe('jwt');
    expect(data.user.email).toBe('lyson@example.com');
  });

  it('mengirim data registrasi', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: { id: 1, nama: 'Lyson' } })
    });

    const data = await register({
      nama: 'Lyson',
      email: 'lyson@example.com',
      password: 'rahasia123'
    });
    expect(data.id).toBe(1);
  });

  it('mengambil profil pengguna', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data: { id: 1, nama: 'Lyson' } })
    });

    const data = await getMe();
    expect(data.nama).toBe('Lyson');
  });
});
