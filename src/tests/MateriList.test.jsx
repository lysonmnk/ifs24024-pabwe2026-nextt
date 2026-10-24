import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MateriList } from '../src/features/materi/components/MateriList.jsx';

describe('MateriList Component tests', () => {
  it('merender empty state saat materiList kosong', () => {
    render(<MateriList materiList={[]} onAddNew={() => {}} />);
    expect(screen.getByText('Tidak Ada Materi Belajar')).toBeInTheDocument();
    expect(screen.getByText(/Tambah Materi Sekarang/i)).toBeInTheDocument();
  });

  it('merender daftar kartu materi saat data tersedia', () => {
    const sampleList = [
      { id: 1, judul: 'React 19', sumber: 'React.dev', status: 'sedang', total_menit: 90 },
      { id: 2, judul: 'PostgreSQL', status: 'selesai', total_menit: 120 }
    ];

    render(
      <BrowserRouter>
        <MateriList materiList={sampleList} onEdit={() => {}} onDelete={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText('React 19')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('Sumber: React.dev')).toBeInTheDocument();
  });
});
