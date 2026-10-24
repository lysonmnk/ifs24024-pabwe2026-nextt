import { describe, it, expect } from 'vitest';
import { validateMateri, validateSesi } from '../src/utils/validators.js';

describe('Frontend Validators Tests', () => {
  describe('validateMateri', () => {
    it('harus valid jika data lengkap dan benar', () => {
      const res = validateMateri({
        judul: 'React Fundamentals',
        status: 'sedang'
      });
      expect(res.isValid).toBe(true);
      expect(res.errors).toEqual({});
    });

    it('harus invalid jika judul kosong', () => {
      const res = validateMateri({
        judul: '   ',
        status: 'sedang'
      });
      expect(res.isValid).toBe(false);
      expect(res.errors.judul).toBe('Judul materi wajib diisi');
    });

    it('harus invalid jika status tidak dikenal', () => {
      const res = validateMateri({
        judul: 'Belajar Python',
        status: 'invalid-status'
      });
      expect(res.isValid).toBe(false);
      expect(res.errors.status).toBe('Status tidak valid');
    });

    it('harus invalid jika sumber melebihi 100 karakter', () => {
      const res = validateMateri({
        judul: 'Belajar Python',
        status: 'belum',
        sumber: 'a'.repeat(101)
      });
      expect(res.isValid).toBe(false);
      expect(res.errors.sumber).toBe('Sumber materi maksimal 100 karakter');
    });
  });

  describe('validateSesi', () => {
    it('harus valid jika tanggal dan durasi valid', () => {
      const res = validateSesi({
        tanggal: '2026-10-23',
        durasi_menit: 45
      });
      expect(res.isValid).toBe(true);
      expect(res.errors).toEqual({});
    });

    it('harus invalid jika durasi <= 0', () => {
      const res = validateSesi({
        tanggal: '2026-10-23',
        durasi_menit: 0
      });
      expect(res.isValid).toBe(false);
      expect(res.errors.durasi_menit).toContain('positif');
    });

    it('harus invalid jika durasi melebihi 1440 menit', () => {
      const res = validateSesi({
        tanggal: '2026-10-23',
        durasi_menit: 1500
      });
      expect(res.isValid).toBe(false);
      expect(res.errors.durasi_menit).toBe('Durasi maksimal 1440 menit (24 jam)');
    });

    it('harus invalid jika tanggal kosong', () => {
      const res = validateSesi({
        tanggal: '',
        durasi_menit: 30
      });
      expect(res.isValid).toBe(false);
      expect(res.errors.tanggal).toBe('Tanggal sesi wajib diisi');
    });
  });
});
