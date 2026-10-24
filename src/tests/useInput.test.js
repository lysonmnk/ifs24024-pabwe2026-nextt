import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useInput } from '../src/hooks/useInput.js';

describe('useInput hook tests', () => {
  it('menginisialisasi nilai awal dengan benar', () => {
    const { result } = renderHook(() => useInput('Halo'));
    expect(result.current.value).toBe('Halo');
  });

  it('memperbarui nilai dengan onChange', () => {
    const { result } = renderHook(() => useInput(''));
    act(() => {
      result.current.onChange({ target: { value: 'Belajar React' } });
    });
    expect(result.current.value).toBe('Belajar React');
  });

  it('mereset nilai ke awal atau nilai baru', () => {
    const { result } = renderHook(() => useInput('Default'));
    act(() => {
      result.current.setValue('Berubah');
    });
    expect(result.current.value).toBe('Berubah');

    act(() => {
      result.current.reset();
    });
    expect(result.current.value).toBe('Default');
  });
});
