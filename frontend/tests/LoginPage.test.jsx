import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../src/features/auth/pages/LoginPage.jsx';

vi.mock('../src/features/auth/hooks/useAuth.js', () => ({
  useAuth: () => ({
    login: vi.fn()
  })
}));

describe('LoginPage', () => {
  it('menampilkan judul halaman login', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Masuk' })).toBeInTheDocument();
  });
});
