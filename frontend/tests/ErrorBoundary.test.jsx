import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../src/components/common/ErrorBoundary.jsx';

const ProblemChild = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test render crash error');
  }
  return <div>Konten Normal Berhasil Dirender</div>;
};

describe('ErrorBoundary Component', () => {
  it('merender children dengan normal jika tidak ada error', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Konten Normal Berhasil Dirender')).toBeInTheDocument();
  });

  it('menangkap error dan menampilkan fallback UI saat child melempar exception', () => {
    // Supress console.error log for expected test error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Terjadi Kesalahan pada Aplikasi')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Muat Ulang Halaman/i })).toBeInTheDocument();

    spy.mockRestore();
  });

  it('merender custom fallback jika disediakan', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary fallback={<div>Custom Fallback UI</div>}>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom Fallback UI')).toBeInTheDocument();

    spy.mockRestore();
  });
});
