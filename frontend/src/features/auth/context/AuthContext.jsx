import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import * as authService from '../services/authService.js';
import {
  clearToken,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken
} from '../../../helpers/tokenStorage.js';

/**
 * React Context untuk state autentikasi global aplikasi.
 */
export const AuthContext = createContext(null);

/**
 * Provider Autentikasi Aplikasi (AuthProvider).
 * Mengelola lifecycle sesi autentikasi, status login, dan profil pengguna secara terpusat:
 * 1. Initial State: Mengambil snapshot pengguna tersimpan dari storage aman.
 * 2. Session Hydration: Pada saat mount, memverifikasi kevalidan token dengan memanggil endpoint /auth/me.
 * 3. Event-Driven Forced Logout: Mendengarkan event kustom `auth:logout` dari apiClient (saat 401).
 * 4. Auth Methods: Menyediakan fungsi asynchronous `login`, `register`, dan `logout`.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(Boolean(getToken()));

  /**
   * Menghapus sesi lokal dan membersihkan status user.
   */
  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  /**
   * Mengambil profil terbaru dari server berdasarkan token yang ada untuk memastikan sesi valid.
   */
  const hydrateSession = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const profile = await authService.getMe();
      setStoredUser(profile);
      setUser(profile);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    hydrateSession();
  }, [hydrateSession]);

  useEffect(() => {
    const handleForcedLogout = () => {
      setUser(null);
    };
    window.addEventListener('auth:logout', handleForcedLogout);
    return () => window.removeEventListener('auth:logout', handleForcedLogout);
  }, []);

  /**
   * Menjalankan autentikasi login dan menyimpan sesi pengguna.
   *
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} Profil user terautentikasi
   */
  const login = useCallback(async (credentials) => {
    const data = await authService.login(credentials);
    setToken(data.token);
    setStoredUser(data.user);
    setUser(data.user);
    return data.user;
  }, []);

  /**
   * Mendaftarkan pengguna baru dan otomatis melakukan login.
   *
   * @param {Object} payload - { nama, email, password }
   * @returns {Promise<Object>} Profil user terautentikasi
   */
  const register = useCallback(
    async (payload) => {
      await authService.register(payload);
      return login({ email: payload.email, password: payload.password });
    },
    [login]
  );

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout
    }),
    [user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
