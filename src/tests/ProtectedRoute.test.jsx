import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../src/components/routing/ProtectedRoute.jsx';

vi.mock('../src/features/auth/hooks/useAuth.js', () => ({
  useAuth: vi.fn()
}));

import { useAuth } from '../src/features/auth/hooks/useAuth.js';

const renderProtected = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<div>Halaman terproteksi</div>} />
        </Route>
        <Route path="/login" element={<div>Halaman login</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('ProtectedRoute', () => {
  it('mengarahkan ke login jika belum autentikasi', () => {
    useAuth.mockReturnValue({ isAuthenticated: false, loading: false });
    renderProtected();
    expect(screen.getByText('Halaman login')).toBeInTheDocument();
  });

  it('menampilkan halaman jika sudah login', () => {
    useAuth.mockReturnValue({ isAuthenticated: true, loading: false });
    renderProtected();
    expect(screen.getByText('Halaman terproteksi')).toBeInTheDocument();
  });
});
