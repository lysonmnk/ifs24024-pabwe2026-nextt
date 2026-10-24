import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SesiList } from '../src/features/sesi/components/SesiList.jsx';

describe('SesiList Component tests', () => {
  it('merender empty state jika belum ada sesi', () => {
    render(<SesiList sesiList={[]} />);
    expect(screen.getByText('Belum Ada Sesi Belajar')).toBeInTheDocument();
  });

  it('merender daftar sesi belajar dengan durasi dan catatan', () => {
    const sampleSesi = [
      { id: 1, tanggal: '2026-10-23', durasi_menit: 45, catatan: 'Latihan router' },
      { id: 2, tanggal: '2026-10-24', durasi_menit: 60, catatan: '' }
    ];
    const handleDelete = vi.fn();

    render(<SesiList sesiList={sampleSesi} onDelete={handleDelete} />);

    expect(screen.getByText('45 menit')).toBeInTheDocument();
    expect(screen.getByText('Latihan router')).toBeInTheDocument();
    expect(screen.getByText('60 menit')).toBeInTheDocument();
    expect(screen.getByText('Tidak ada catatan')).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole('button', { name: /Hapus Sesi/i });
    expect(deleteButtons).toHaveLength(2);

    fireEvent.click(deleteButtons[0]);
    expect(handleDelete).toHaveBeenCalledWith(sampleSesi[0]);
  });
});
