import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as sesiService from '../src/features/sesi/services/sesiService.js';
import * as clientModule from '../src/helpers/apiClient.js';

describe('sesiService tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('getSesiListByMateriId memanggil GET /materi/:materiId/sesi', async () => {
    const mockList = [{ id: 1, materi_id: 1, durasi_menit: 45 }];
    vi.spyOn(clientModule, 'apiClient').mockResolvedValueOnce({ success: true, data: mockList });

    const result = await sesiService.getSesiListByMateriId(1);
    expect(result).toEqual(mockList);
    expect(clientModule.apiClient).toHaveBeenCalledWith('/materi/1/sesi');
  });

  it('createSesi memanggil POST /materi/:materiId/sesi', async () => {
    const payload = { tanggal: '2026-10-23', durasi_menit: 30 };
    vi.spyOn(clientModule, 'apiClient').mockResolvedValueOnce({ success: true, data: { id: 10, ...payload } });

    const result = await sesiService.createSesi(1, payload);
    expect(result.id).toBe(10);
    expect(clientModule.apiClient).toHaveBeenCalledWith('/materi/1/sesi', expect.objectContaining({ method: 'POST' }));
  });

  it('deleteSesi memanggil DELETE /sesi/:id', async () => {
    vi.spyOn(clientModule, 'apiClient').mockResolvedValueOnce({ success: true });

    const result = await sesiService.deleteSesi(10);
    expect(result.success).toBe(true);
    expect(clientModule.apiClient).toHaveBeenCalledWith('/sesi/10', { method: 'DELETE' });
  });
});
