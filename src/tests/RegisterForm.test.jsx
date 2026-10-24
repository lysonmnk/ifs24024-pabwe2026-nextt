import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { RegisterForm } from '../src/features/auth/components/RegisterForm.jsx';

const registerMock = vi.fn();

vi.mock('../src/features/auth/hooks/useAuth.js', () => ({
  useAuth: () => ({
    register: registerMock
  })
}));

describe('RegisterForm', () => {
  it('menolak kata sandi yang terlalu pendek', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/nama lengkap/i), 'Lyson');
    await user.type(screen.getByLabelText(/email/i), 'lyson@example.com');
    await user.type(screen.getByLabelText(/kata sandi/i), '123');
    await user.click(screen.getByRole('button', { name: /daftar/i }));

    expect(screen.getByText('Kata sandi minimal 8 karakter')).toBeInTheDocument();
    expect(registerMock).not.toHaveBeenCalled();
  });
});
