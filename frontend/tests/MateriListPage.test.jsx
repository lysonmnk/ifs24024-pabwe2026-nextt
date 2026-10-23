import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MateriListPage } from '../src/features/materi/pages/MateriListPage.jsx';
import * as materiService from '../src/features/materi/services/materiService.js';

describe('MateriListPage Page tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('merender loading state lalu menampilkan daftar materi', async () => {
    const mockMateri = [
      { id: 1, judul: 'Belajar React', status: 'sedang', total_menit: 45 }
    ];
    vi.spyOn(materiService, 'getMateriList').mockResolvedValueOnce(mockMateri);

    render(
      <BrowserRouter>
        <MateriListPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Memuat daftar materi/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Belajar React')).toBeInTheDocument();
      expect(screen.getByText('Dashboard Materi Belajar')).toBeInTheDocument();
    });
  });
});
