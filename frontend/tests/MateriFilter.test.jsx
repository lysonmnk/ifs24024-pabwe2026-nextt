import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MateriFilter } from '../src/features/materi/components/MateriFilter.jsx';

describe('MateriFilter', () => {
  it('memanggil onSearchChange saat mengetik', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    render(
      <MateriFilter
        search=""
        onSearchChange={onSearchChange}
        statusFilter="semua"
        onStatusChange={() => {}}
      />
    );

    await user.type(screen.getByPlaceholderText(/cari judul/i), 'React');
    expect(onSearchChange).toHaveBeenCalled();
  });

  it('memanggil onStatusChange saat tab diklik', async () => {
    const user = userEvent.setup();
    const onStatusChange = vi.fn();
    render(
      <MateriFilter
        search=""
        onSearchChange={() => {}}
        statusFilter="semua"
        onStatusChange={onStatusChange}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Selesai' }));
    expect(onStatusChange).toHaveBeenCalledWith('selesai');
  });
});
