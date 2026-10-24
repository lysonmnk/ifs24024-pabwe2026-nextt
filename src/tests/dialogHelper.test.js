import { describe, it, expect, vi, beforeEach } from 'vitest';
import Swal from 'sweetalert2';
import { showSuccess, showError, confirmDelete } from '../src/helpers/dialogHelper.js';

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn()
  }
}));

describe('dialogHelper', () => {
  beforeEach(() => {
    Swal.fire.mockReset();
  });

  it('menampilkan dialog sukses', async () => {
    Swal.fire.mockResolvedValueOnce({});
    await showSuccess('Materi tersimpan');
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: 'success',
        text: 'Materi tersimpan'
      })
    );
  });

  it('menampilkan dialog error', async () => {
    Swal.fire.mockResolvedValueOnce({});
    await showError('Gagal menyimpan');
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: 'error',
        text: 'Gagal menyimpan'
      })
    );
  });

  it('mengembalikan true jika pengguna mengonfirmasi hapus', async () => {
    Swal.fire.mockResolvedValueOnce({ isConfirmed: true });
    await expect(confirmDelete('Hapus materi?')).resolves.toBe(true);
  });
});
