import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useForm } from '../src/hooks/useForm.js';

describe('useForm custom hook', () => {
  it('menginisialisasi values, errors, dan isSubmitting dengan benar', () => {
    const { result } = renderHook(() =>
      useForm({ initialValues: { judul: 'React', durasi: 30 } })
    );

    expect(result.current.values).toEqual({ judul: 'React', durasi: 30 });
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.serverError).toBe('');
  });

  it('memperbarui values saat handleChange dipanggil', () => {
    const { result } = renderHook(() =>
      useForm({ initialValues: { judul: '' } })
    );

    act(() => {
      result.current.handleChange({
        target: { name: 'judul', value: 'Belajar Vitest', type: 'text' }
      });
    });

    expect(result.current.values.judul).toBe('Belajar Vitest');
  });

  it('menghapus error field yang bersangkutan saat input diubah', () => {
    const { result } = renderHook(() =>
      useForm({ initialValues: { judul: '' } })
    );

    act(() => {
      result.current.setErrors({ judul: 'Judul wajib diisi' });
    });
    expect(result.current.errors.judul).toBe('Judul wajib diisi');

    act(() => {
      result.current.handleChange({
        target: { name: 'judul', value: 'Ada Judul', type: 'text' }
      });
    });

    expect(result.current.errors.judul).toBeUndefined();
  });

  it('menghentikan submit dan mengisi errors jika validasi gagal', async () => {
    const validate = vi.fn().mockReturnValue({
      isValid: false,
      errors: { judul: 'Judul tidak boleh kosong' }
    });
    const onSubmit = vi.fn();

    const { result } = renderHook(() =>
      useForm({ initialValues: { judul: '' }, validate, onSubmit })
    );

    let success;
    await act(async () => {
      success = await result.current.handleSubmit();
    });

    expect(success).toBe(false);
    expect(validate).toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(result.current.errors.judul).toBe('Judul tidak boleh kosong');
  });

  it('mengeksekusi onSubmit dan mengembalikan true jika validasi berhasil', async () => {
    const validate = vi.fn().mockReturnValue({ isValid: true, errors: {} });
    const onSubmit = vi.fn().mockResolvedValueOnce();

    const { result } = renderHook(() =>
      useForm({ initialValues: { judul: 'PABWE' }, validate, onSubmit })
    );

    let success;
    await act(async () => {
      success = await result.current.handleSubmit();
    });

    expect(success).toBe(true);
    expect(onSubmit).toHaveBeenCalledWith({ judul: 'PABWE' });
    expect(result.current.isSubmitting).toBe(false);
  });

  it('menangkap serverError jika onSubmit throw error', async () => {
    const onSubmit = vi.fn().mockRejectedValueOnce(new Error('Gagal menyimpan ke server'));

    const { result } = renderHook(() =>
      useForm({ initialValues: { judul: 'Test' }, onSubmit })
    );

    let success;
    await act(async () => {
      success = await result.current.handleSubmit();
    });

    expect(success).toBe(false);
    expect(result.current.serverError).toBe('Gagal menyimpan ke server');
    expect(result.current.isSubmitting).toBe(false);
  });

  it('mereset form saat resetForm dipanggil', () => {
    const { result } = renderHook(() =>
      useForm({ initialValues: { judul: 'Lama' } })
    );

    act(() => {
      result.current.handleChange({
        target: { name: 'judul', value: 'Baru', type: 'text' }
      });
      result.current.setErrors({ judul: 'Error' });
      result.current.setServerError('Server Error');
    });

    act(() => {
      result.current.resetForm({ judul: 'Reset' });
    });

    expect(result.current.values.judul).toBe('Reset');
    expect(result.current.errors).toEqual({});
    expect(result.current.serverError).toBe('');
  });
});
