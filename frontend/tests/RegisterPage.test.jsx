import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RegisterPage } from '../src/features/auth/pages/RegisterPage.jsx';

vi.mock('../src/features/auth/hooks/useAuth.js', () => ({
  useAuth: () => ({
    register: vi.fn()
  })
}));

describe('RegisterPage', () => {
  it('menampilkan judul halaman registrasi', () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Buat akun' })).toBeInTheDocument();
  });
});
