import { describe, it, expect, beforeEach } from 'vitest';
import {
  getToken,
  setToken,
  clearToken,
  getStoredUser,
  setStoredUser
} from '../src/helpers/tokenStorage.js';

describe('tokenStorage', () => {
  beforeEach(() => {
    clearToken();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('menyimpan dan membaca token', () => {
    setToken('abc.def.ghi');
    expect(getToken()).toBe('abc.def.ghi');
  });

  it('menyimpan dan membaca data pengguna', () => {
    const user = { id: 1, nama: 'Lyson', email: 'lyson@example.com' };
    setStoredUser(user);
    expect(getStoredUser()).toEqual(user);
  });

  it('menghapus token dan data pengguna', () => {
    setToken('token');
    setStoredUser({ id: 1 });
    clearToken();
    expect(getToken()).toBeNull();
    expect(getStoredUser()).toBeNull();
  });

  it('mengutamakan token dari sessionStorage untuk keamanan per-sesi tab', () => {
    sessionStorage.setItem('catatan_belajar_token', 'session-token');
    expect(getToken()).toBe('session-token');
  });
});
