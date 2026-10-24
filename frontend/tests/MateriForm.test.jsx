import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MateriForm } from '../src/features/materi/components/MateriForm.jsx';

describe('MateriForm Component tests', () => {
  it('tidak merender apapun jika isOpen false', () => {
    const { container } = render(
      <MateriForm isOpen={false} onClose={() => {}} onSubmit={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('merender form input saat isOpen true', () => {
    render(
      <MateriForm isOpen={true} onClose={() => {}} onSubmit={() => {}} />
    );
    expect(screen.getByText('Tambah Materi Belajar')).toBeInTheDocument();
    expect(screen.getByLabelText(/Judul Materi/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status Belajar/i)).toBeInTheDocument();
  });

  it('merender mode edit dengan nilai awal yang sesuai', () => {
    const initialData = {
      judul: 'React Query Advanced',
      sumber: 'TanStack Docs',
      status: 'sedang'
    };

    render(
      <MateriForm
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        initialData={initialData}
      />
    );

    expect(screen.getByText('Ubah Materi Belajar')).toBeInTheDocument();
    expect(screen.getByLabelText(/Judul Materi/i)).toHaveValue('React Query Advanced');
    expect(screen.getByLabelText(/Sumber Materi/i)).toHaveValue('TanStack Docs');
    expect(screen.getByLabelText(/Status Belajar/i)).toHaveValue('sedang');
    expect(screen.getByRole('button', { name: /Simpan Perubahan/i })).toBeInTheDocument();
  });

  it('menampilkan error jika judul kosong saat submit', async () => {
    render(
      <MateriForm isOpen={true} onClose={() => {}} onSubmit={() => {}} />
    );

    fireEvent.click(screen.getByRole('button', { name: /Tambah Materi/i }));

    expect(await screen.findByText('Judul materi wajib diisi')).toBeInTheDocument();
  });

  it('menampilkan error jika judul melebihi 100 karakter', async () => {
    render(
      <MateriForm isOpen={true} onClose={() => {}} onSubmit={() => {}} />
    );

    const longTitle = 'a'.repeat(101);
    fireEvent.change(screen.getByLabelText(/Judul Materi/i), {
      target: { value: longTitle }
    });

    fireEvent.click(screen.getByRole('button', { name: /Tambah Materi/i }));

    expect(await screen.findByText(/100 karakter/i)).toBeInTheDocument();
  });

  it('memanggil onSubmit dengan nilai yang diisi', async () => {
    const handleSubmit = vi.fn().mockResolvedValueOnce();
    const handleClose = vi.fn();

    render(
      <MateriForm
        isOpen={true}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText(/Judul Materi/i), {
      target: { value: 'TypeScript Lanjut' }
    });
    fireEvent.change(screen.getByLabelText(/Sumber Materi/i), {
      target: { value: 'Official Docs' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Tambah Materi/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        judul: 'TypeScript Lanjut',
        sumber: 'Official Docs',
        status: 'belum'
      });
      expect(handleClose).toHaveBeenCalled();
    });
  });

  it('menampilkan alert server error jika onSubmit gagal', async () => {
    const handleSubmit = vi.fn().mockRejectedValueOnce(new Error('Koneksi ke backend terputus'));

    render(
      <MateriForm
        isOpen={true}
        onClose={() => {}}
        onSubmit={handleSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText(/Judul Materi/i), {
      target: { value: 'Node.js Cluster' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Tambah Materi/i }));

    expect(await screen.findByText('Koneksi ke backend terputus')).toBeInTheDocument();
  });

  it('memanggil onClose saat tombol Batal atau tombol tutup diklik', () => {
    const handleClose = vi.fn();

    render(
      <MateriForm isOpen={true} onClose={handleClose} onSubmit={() => {}} />
    );

    fireEvent.click(screen.getByRole('button', { name: /Batal/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByLabelText('Tutup'));
    expect(handleClose).toHaveBeenCalledTimes(2);
  });
});
