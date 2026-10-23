import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../src/components/Navbar.jsx';
import { StatsBanner } from '../src/components/StatsBanner.jsx';
import { MateriCard } from '../src/components/MateriCard.jsx';

describe('Frontend Component Rendering Tests', () => {
  it('merender Navbar dengan nama mahasiswa dan judul aplikasi', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('HyperLink')).toBeInTheDocument();
    expect(screen.getByText('Lyson Paulus Esar Manik')).toBeInTheDocument();
    expect(screen.getByText(/11S24024/i)).toBeInTheDocument();
  });

  it('merender StatsBanner dengan jumlah materi dan status yang tepat', () => {
    const sampleMateri = [
      { id: 1, judul: 'React', status: 'selesai', total_menit: 120 },
      { id: 2, judul: 'Node.js', status: 'sedang', total_menit: 60 }
    ];

    render(<StatsBanner materiList={sampleMateri} />);

    expect(screen.getByText('2')).toBeInTheDocument(); // total materi
    const ones = screen.getAllByText('1'); // sedang (1) dan selesai (1)
    expect(ones).toHaveLength(2);
    expect(screen.getByText('3 jam')).toBeInTheDocument(); // total durasi (180 mnt)
  });

  it('merender MateriCard dengan tombol aksi dan status badge', () => {
    const item = {
      id: 1,
      judul: 'Fullstack Web Development',
      sumber: 'Dicoding',
      status: 'sedang',
      total_menit: 90
    };

    render(
      <BrowserRouter>
        <MateriCard materi={item} onEdit={() => {}} onDelete={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByText('Fullstack Web Development')).toBeInTheDocument();
    expect(screen.getByText('Sumber: Dicoding')).toBeInTheDocument();
    expect(screen.getByText('Sedang Dipelajari')).toBeInTheDocument();
    expect(screen.getByText('1 jam 30 mnt')).toBeInTheDocument();
    expect(screen.getByText('Kelola Sesi')).toBeInTheDocument();
  });
});
