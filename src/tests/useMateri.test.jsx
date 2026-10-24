import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useMateri } from '../src/features/materi/hooks/useMateri.js';
import * as materiService from '../src/features/materi/services/materiService.js';

describe('useMateri hook tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('memuat daftar materi secara otomatis saat render pertama', async () => {
    const mockData = [{ id: 1, judul: 'React Dasar', total_menit: 60 }];
    vi.spyOn(materiService, 'getMateriList').mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useMateri());

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.materiList).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('menangani error saat pemanggilan API gagal', async () => {
    vi.spyOn(materiService, 'getMateriList').mockRejectedValueOnce(new Error('Gagal memuat'));

    const { result } = renderHook(() => useMateri());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Gagal memuat');
  });

  it('menambahkan materi baru ke dalam state materiList', async () => {
    vi.spyOn(materiService, 'getMateriList').mockResolvedValueOnce([]);
    const newItem = { id: 2, judul: 'Node.js', status: 'belum', total_menit: 0 };
    vi.spyOn(materiService, 'createMateri').mockResolvedValueOnce(newItem);

    const { result } = renderHook(() => useMateri());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.addMateri({ judul: 'Node.js' });
    });

    expect(result.current.materiList).toHaveLength(1);
    expect(result.current.materiList[0].judul).toBe('Node.js');
  });

  it('menghapus materi dari state materiList', async () => {
    const initialList = [{ id: 1, judul: 'Hapus Saya', total_menit: 0 }];
    vi.spyOn(materiService, 'getMateriList').mockResolvedValueOnce(initialList);
    vi.spyOn(materiService, 'deleteMateri').mockResolvedValueOnce({ success: true });

    const { result } = renderHook(() => useMateri());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.deleteMateri(1);
    });

    expect(result.current.materiList).toHaveLength(0);
  });
});
