import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { LoginForm } from '../src/features/auth/components/LoginForm.jsx';

const loginMock = vi.fn();

vi.mock('../src/features/auth/hooks/useAuth.js', () => ({
  useAuth: () => ({
    login: loginMock
  })
}));

describe('LoginForm', () => {
  it('menolak submit jika email dan kata sandi kosong', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /masuk/i }));
    expect(screen.getByText('Email wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Kata sandi wajib diisi')).toBeInTheDocument();
    expect(loginMock).not.toHaveBeenCalled();
  });

  it('memanggil login dengan data yang diisi', async () => {
    loginMock.mockResolvedValueOnce({});
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/email/i), 'lyson@example.com');
    await user.type(screen.getByLabelText(/kata sandi/i), 'rahasia123');
    await user.click(screen.getByRole('button', { name: /masuk/i }));

    expect(loginMock).toHaveBeenCalledWith({
      email: 'lyson@example.com',
      password: 'rahasia123'
    });
  });
});
