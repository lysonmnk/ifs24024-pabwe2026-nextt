import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFoundPage } from '../src/pages/NotFoundPage.jsx';

describe('NotFoundPage Page tests', () => {
  it('merender teks 404 dan tombol kembali ke beranda', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Halaman Tidak Ditemukan \(404\)/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Kembali ke Beranda/i })).toBeInTheDocument();
  });
});
