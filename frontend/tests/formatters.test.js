import { describe, it, expect } from 'vitest';
import { formatDurasi, formatTanggal, getStatusMeta } from '../src/utils/formatters.js';

describe('Frontend Formatters Tests', () => {
  describe('formatDurasi', () => {
    it('mengembalikan "0 menit" jika nilai 0 atau kosong', () => {
      expect(formatDurasi(0)).toBe('0 menit');
      expect(formatDurasi(null)).toBe('0 menit');
    });

    it('mengembalikan format menit jika kurang dari 60 menit', () => {
      expect(formatDurasi(45)).toBe('45 menit');
    });

    it('mengembalikan format jam jika pas kelipatan 60', () => {
      expect(formatDurasi(60)).toBe('1 jam');
      expect(formatDurasi(120)).toBe('2 jam');
    });

    it('mengembalikan format jam dan menit jika lebih dari 60 dan bukan kelipatan', () => {
      expect(formatDurasi(75)).toBe('1 jam 15 mnt');
      expect(formatDurasi(150)).toBe('2 jam 30 mnt');
    });
  });

  describe('formatTanggal', () => {
    it('mengembalikan "-" jika tanggal kosong', () => {
      expect(formatTanggal(null)).toBe('-');
      expect(formatTanggal('')).toBe('-');
    });

    it('memformat tanggal ISO dengan benar', () => {
      const formatted = formatTanggal('2026-10-23');
      expect(formatted).toContain('2026');
      expect(formatted).toContain('23');
    });
  });

  describe('getStatusMeta', () => {
    it('mengembalikan meta yang tepat untuk setiap status', () => {
      expect(getStatusMeta('selesai').label).toBe('Selesai');
      expect(getStatusMeta('sedang').label).toBe('Sedang Dipelajari');
      expect(getStatusMeta('belum').label).toBe('Belum Mulai');
      expect(getStatusMeta('unknown').label).toBe('Belum Mulai');
    });
  });
});
