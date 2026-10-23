import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as materiService from '../src/features/materi/services/materiService.js';
import * as clientModule from '../src/helpers/apiClient.js';

describe('materiService tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('getMateriList memanggil GET /materi', async () => {
    const mockList = [{ id: 1, judul: 'React' }];
    vi.spyOn(clientModule, 'apiClient').mockResolvedValueOnce({ success: true, data: mockList });

    const result = await materiService.getMateriList();
    expect(result).toEqual(mockList);
    expect(clientModule.apiClient).toHaveBeenCalledWith('/materi');
  });

  it('getMateriDetail memanggil GET /materi/:id', async () => {
    const mockItem = { id: 1, judul: 'React' };
    vi.spyOn(clientModule, 'apiClient').mockResolvedValueOnce({ success: true, data: mockItem });

    const result = await materiService.getMateriDetail(1);
    expect(result).toEqual(mockItem);
    expect(clientModule.apiClient).toHaveBeenCalledWith('/materi/1');
  });

  it('createMateri memanggil POST /materi', async () => {
    const payload = { judul: 'Vue', status: 'belum' };
    vi.spyOn(clientModule, 'apiClient').mockResolvedValueOnce({ success: true, data: { id: 2, ...payload } });

    const result = await materiService.createMateri(payload);
    expect(result.id).toBe(2);
    expect(clientModule.apiClient).toHaveBeenCalledWith('/materi', expect.objectContaining({ method: 'POST' }));
  });

  it('updateMateri memanggil PUT /materi/:id', async () => {
    const payload = { judul: 'Vue 3', status: 'sedang' };
    vi.spyOn(clientModule, 'apiClient').mockResolvedValueOnce({ success: true, data: { id: 2, ...payload } });

    const result = await materiService.updateMateri(2, payload);
    expect(result.judul).toBe('Vue 3');
    expect(clientModule.apiClient).toHaveBeenCalledWith('/materi/2', expect.objectContaining({ method: 'PUT' }));
  });

  it('deleteMateri memanggil DELETE /materi/:id', async () => {
    vi.spyOn(clientModule, 'apiClient').mockResolvedValueOnce({ success: true });

    const result = await materiService.deleteMateri(2);
    expect(result.success).toBe(true);
    expect(clientModule.apiClient).toHaveBeenCalledWith('/materi/2', { method: 'DELETE' });
  });
});
