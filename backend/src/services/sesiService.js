import { sesiRepository } from '../repositories/sesiRepository.js';
import { materiRepository } from '../repositories/materiRepository.js';
import { AppError } from '../utils/AppError.js';

export class SesiService {
  constructor(sesiRepo = sesiRepository, materiRepo = materiRepository) {
    this.sesiRepo = sesiRepo;
    this.materiRepo = materiRepo;
  }

  validateSesiInput({ tanggal, durasi_menit, catatan }) {
    const errors = [];

    if (!tanggal || typeof tanggal !== 'string' || tanggal.trim() === '') {
      errors.push('Tanggal sesi wajib diisi');
    } else {
      const parsedDate = Date.parse(tanggal);
      if (isNaN(parsedDate)) {
        errors.push('Format tanggal tidak valid');
      }
    }

    const durasi = Number(durasi_menit);
    if (durasi_menit === undefined || durasi_menit === null || isNaN(durasi)) {
      errors.push('Durasi menit wajib diisi dengan angka');
    } else if (!Number.isInteger(durasi) || durasi <= 0) {
      errors.push('Durasi menit harus berupa bilangan bulat positif (> 0)');
    }

    if (catatan !== undefined && catatan !== null && typeof catatan !== 'string') {
      errors.push('Catatan harus berupa teks');
    }

    if (errors.length > 0) {
      throw new AppError('Validasi gagal', 400, errors);
    }
  }

  getSesiByMateriId(materiId) {
    const numericMateriId = parseInt(materiId, 10);
    if (isNaN(numericMateriId)) {
      throw new AppError('ID materi tidak valid', 400);
    }

    const materi = this.materiRepo.findById(numericMateriId);
    if (!materi) {
      throw new AppError('Materi tidak ditemukan', 404);
    }

    return this.sesiRepo.findByMateriId(numericMateriId);
  }

  createSesi(materiId, data) {
    const numericMateriId = parseInt(materiId, 10);
    if (isNaN(numericMateriId)) {
      throw new AppError('ID materi tidak valid', 400);
    }

    const materi = this.materiRepo.findById(numericMateriId);
    if (!materi) {
      throw new AppError('Materi tidak ditemukan', 404);
    }

    this.validateSesiInput(data);

    const tanggal = data.tanggal.trim();
    const durasi_menit = Number(data.durasi_menit);
    const catatan = data.catatan && typeof data.catatan === 'string' ? data.catatan.trim() : null;

    return this.sesiRepo.create({
      materi_id: numericMateriId,
      tanggal,
      durasi_menit,
      catatan
    });
  }

  deleteSesi(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new AppError('ID sesi tidak valid', 400);
    }

    const existing = this.sesiRepo.findById(numericId);
    if (!existing) {
      throw new AppError('Sesi belajar tidak ditemukan', 404);
    }

    return this.sesiRepo.delete(numericId);
  }
}

export const sesiService = new SesiService();
