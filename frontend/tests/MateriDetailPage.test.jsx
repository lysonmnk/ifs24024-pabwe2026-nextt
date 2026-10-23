import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MateriDetailPage } from '../src/features/materi/pages/MateriDetailPage.jsx';
import * as materiService from '../src/features/materi/services/materiService.js';
import * as sesiService from '../src/features/sesi/services/sesiService.js';

describe('MateriDetailPage Page tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('merender detail materi dan riwayat sesi belajar', async () => {
    const mockMateri = {
      id: 1,
      judul: 'Express REST API',
      sumber: 'MDN',
      status: 'sedang',
      total_menit: 60
    };
    const mockSesi = [
      { id: 10, materi_id: 1, tanggal: '2026-10-23', durasi_menit: 60, catatan: 'Routing & MVC' }
    ];

    vi.spyOn(materiService, 'getMateriDetail').mockResolvedValueOnce(mockMateri);
    vi.spyOn(sesiService, 'getSesiListByMateriId').mockResolvedValueOnce(mockSesi);

    render(
      <MemoryRouter initialEntries={['/materi/1']}>
        <Routes>
          <Route path="/materi/:id" element={<MateriDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Memuat detail materi/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Express REST API')).toBeInTheDocument();
      expect(screen.getByText('Sumber Belajar: MDN')).toBeInTheDocument();
      expect(screen.getByText('Routing & MVC')).toBeInTheDocument();
      expect(screen.getByText('Catat Sesi Baru')).toBeInTheDocument();
    });
  });
});
