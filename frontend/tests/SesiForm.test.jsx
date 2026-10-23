import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SesiForm } from '../src/features/sesi/components/SesiForm.jsx';

describe('SesiForm Component tests', () => {
  it('tidak merender apapun jika isOpen false', () => {
    const { container } = render(
      <SesiForm isOpen={false} onClose={() => {}} onSubmit={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('merender judul materi dan input saat isOpen true', () => {
    render(
      <SesiForm
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        materiJudul="Node.js Dasar"
      />
    );

    expect(screen.getByText('Catat Sesi Belajar')).toBeInTheDocument();
    expect(screen.getByText('Node.js Dasar')).toBeInTheDocument();
    expect(screen.getByLabelText(/Tanggal Belajar/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Durasi \(dalam menit\)/i)).toBeInTheDocument();
  });

  it('menampilkan pesan validasi jika durasi menit kosong', async () => {
    render(
      <SesiForm isOpen={true} onClose={() => {}} onSubmit={() => {}} />
    );

    fireEvent.click(screen.getByRole('button', { name: /Simpan Sesi/i }));

    expect(await screen.findByText('Durasi wajib diisi angka')).toBeInTheDocument();
  });

  it('memanggil onSubmit dengan durasi berupa angka', async () => {
    const handleSubmit = vi.fn().mockResolvedValueOnce();
    const handleClose = vi.fn();

    render(
      <SesiForm
        isOpen={true}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText(/Durasi \(dalam menit\)/i), {
      target: { value: '45' }
    });
    fireEvent.change(screen.getByLabelText(/Catatan Sesi/i), {
      target: { value: 'Latihan Express middleware' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Simpan Sesi/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          durasi_menit: 45,
          catatan: 'Latihan Express middleware'
        })
      );
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
