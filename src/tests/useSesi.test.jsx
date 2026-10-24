import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useSesi } from '../src/features/sesi/hooks/useSesi.js';
import * as sesiService from '../src/features/sesi/services/sesiService.js';

describe('useSesi hook tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('memuat sesi belajar berdasarkan materiId', async () => {
    const mockSesi = [{ id: 1, materi_id: 1, durasi_menit: 45 }];
    vi.spyOn(sesiService, 'getSesiListByMateriId').mockResolvedValueOnce(mockSesi);

    const { result } = renderHook(() => useSesi(1));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.sesiList).toEqual(mockSesi);
  });

  it('menambahkan sesi belajar baru', async () => {
    vi.spyOn(sesiService, 'getSesiListByMateriId').mockResolvedValueOnce([]);
    const createdSesi = { id: 2, materi_id: 1, durasi_menit: 30, tanggal: '2026-10-23' };
    vi.spyOn(sesiService, 'createSesi').mockResolvedValueOnce(createdSesi);

    const { result } = renderHook(() => useSesi(1));
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.addSesi({ durasi_menit: 30, tanggal: '2026-10-23' });
    });

    expect(result.current.sesiList).toHaveLength(1);
    expect(result.current.sesiList[0].durasi_menit).toBe(30);
  });

  it('menghapus sesi belajar', async () => {
    const mockSesi = [{ id: 5, materi_id: 1, durasi_menit: 45 }];
    vi.spyOn(sesiService, 'getSesiListByMateriId').mockResolvedValueOnce(mockSesi);
    vi.spyOn(sesiService, 'deleteSesi').mockResolvedValueOnce({ success: true });

    const { result } = renderHook(() => useSesi(1));
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.deleteSesi(5);
    });

    expect(result.current.sesiList).toHaveLength(0);
  });
});
