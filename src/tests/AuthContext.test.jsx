import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '../src/features/auth/context/AuthContext.jsx';
import { useAuth } from '../src/features/auth/hooks/useAuth.js';
import * as authService from '../src/features/auth/services/authService.js';

const Probe = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  return (
    <div>
      <p>{isAuthenticated ? user.nama : 'tamu'}</p>
      <button type="button" onClick={() => login({ email: 'a@b.c', password: 'rahasia123' })}>
        login
      </button>
      <button type="button" onClick={logout}>
        logout
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('menyimpan pengguna setelah login dan menghapusnya saat logout', async () => {
    vi.spyOn(authService, 'login').mockResolvedValueOnce({
      token: 'jwt',
      user: { id: 1, nama: 'Lyson', email: 'lyson@example.com' }
    });

    const user = userEvent.setup();
    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    );

    expect(screen.getByText('tamu')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'login' }));
    await waitFor(() => {
      expect(screen.getByText('Lyson')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: 'logout' }));
    expect(screen.getByText('tamu')).toBeInTheDocument();
  });
});
