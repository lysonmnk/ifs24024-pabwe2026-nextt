import { sesiRepository } from '../repositories/sesi.repository.js';
import { materiService } from './materi.service.js';
import { AppError } from '../utils/app-error.js';
import { parseId } from '../utils/parse-id.js';

export class SesiService {
  constructor(sesiRepo = sesiRepository, mService = materiService) {
    this.sesiRepo = sesiRepo;
    this.mService = mService;
  }

  validateSesiInput({ tanggal, durasi_menit, catatan }) {
    const errors = [];

    // Format YYYY-MM-DD check
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!tanggal || typeof tanggal !== 'string' || tanggal.trim() === '') {
      errors.push('Tanggal sesi wajib diisi');
    } else if (!dateRegex.test(tanggal.trim())) {
      errors.push('Format tanggal harus YYYY-MM-DD');
    } else {
      const parsed = new Date(tanggal.trim());
      if (isNaN(parsed.getTime())) {
        errors.push('Tanggal tidak valid');
      }
    }

    const durasi = Number(durasi_menit);
    if (durasi_menit === undefined || durasi_menit === null || isNaN(durasi)) {
      errors.push('Durasi menit wajib diisi dengan angka');
    } else if (!Number.isInteger(durasi) || durasi < 1 || durasi > 1440) {
      errors.push('Durasi menit harus berupa bilangan bulat antara 1 hingga 1440');
    }

    if (catatan !== undefined && catatan !== null && typeof catatan !== 'string') {
      errors.push('Catatan harus berupa teks');
    } else if (catatan && typeof catatan === 'string' && catatan.trim().length > 500) {
      errors.push('Catatan maksimal 500 karakter');
    }

    if (errors.length > 0) {
      throw new AppError('Validasi sesi gagal', 400, errors);
    }
  }

  getSesiByMateriId(materiId, userId) {
    const numericMateriId = parseId(materiId, 'ID materi');
    // Memastikan materi ada dan milik pengguna (melempar 404 jika bukan milik user)
    this.mService.getMateriById(numericMateriId, userId);

    return this.sesiRepo.findByMateriId(numericMateriId);
  }

  createSesi(materiId, userId, data) {
    const numericMateriId = parseId(materiId, 'ID materi');
    // Memastikan materi ada dan milik pengguna
    this.mService.getMateriById(numericMateriId, userId);

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

  deleteSesi(id, userId) {
    const numericId = parseId(id, 'ID sesi');
    const existing = this.sesiRepo.findByIdAndUserId(numericId, userId);

    if (!existing) {
      throw new AppError('Sesi belajar tidak ditemukan', 404, ['Sesi belajar tidak ditemukan']);
    }

    return this.sesiRepo.delete(numericId);
  }
}

export const sesiService = new SesiService();
