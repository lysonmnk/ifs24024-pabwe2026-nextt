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

  it('menampilkan pesan validasi jika durasi kurang dari atau sama dengan 0', async () => {
    render(
      <SesiForm isOpen={true} onClose={() => {}} onSubmit={() => {}} />
    );

    fireEvent.change(screen.getByLabelText(/Durasi \(dalam menit\)/i), {
      target: { value: '0' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Simpan Sesi/i }));

    expect(
      await screen.findByText('Durasi harus berupa angka positif (> 0 menit)')
    ).toBeInTheDocument();
  });

  it('menampilkan error jika tanggal dikosongkan', async () => {
    render(
      <SesiForm isOpen={true} onClose={() => {}} onSubmit={() => {}} />
    );

    fireEvent.change(screen.getByLabelText(/Tanggal Belajar/i), {
      target: { value: '' }
    });
    fireEvent.change(screen.getByLabelText(/Durasi \(dalam menit\)/i), {
      target: { value: '30' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Simpan Sesi/i }));

    expect(await screen.findByText('Tanggal sesi wajib diisi')).toBeInTheDocument();
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
    fireEvent.change(screen.getByLabelText(/Catatan Belajar/i), {
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

  it('menampilkan alert server error jika onSubmit gagal', async () => {
    const handleSubmit = vi.fn().mockRejectedValueOnce(new Error('Gagal mencatat sesi'));

    render(
      <SesiForm
        isOpen={true}
        onClose={() => {}}
        onSubmit={handleSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText(/Durasi \(dalam menit\)/i), {
      target: { value: '60' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Simpan Sesi/i }));

    expect(await screen.findByText('Gagal mencatat sesi')).toBeInTheDocument();
  });

  it('memanggil onClose saat tombol Batal atau tombol X diklik', () => {
    const handleClose = vi.fn();

    render(
      <SesiForm isOpen={true} onClose={handleClose} onSubmit={() => {}} />
    );

    fireEvent.click(screen.getByRole('button', { name: /Batal/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByLabelText('Tutup'));
    expect(handleClose).toHaveBeenCalledTimes(2);
  });
});
