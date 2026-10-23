import { materiRepository } from '../repositories/materiRepository.js';
import { AppError } from '../utils/AppError.js';

const VALID_STATUSES = ['belum', 'sedang', 'selesai'];

export class MateriService {
  constructor(repo = materiRepository) {
    this.repo = repo;
  }

  validateMateriInput({ judul, status, sumber }, isUpdate = false) {
    const errors = [];

    if (!isUpdate || judul !== undefined) {
      if (!judul || typeof judul !== 'string' || judul.trim() === '') {
        errors.push('Judul materi wajib diisi');
      } else if (judul.trim().length > 255) {
        errors.push('Judul materi maksimal 255 karakter');
      }
    }

    if (status !== undefined) {
      if (!VALID_STATUSES.includes(status)) {
        errors.push(`Status harus salah satu dari: ${VALID_STATUSES.join(', ')}`);
      }
    }

    if (sumber !== undefined && sumber !== null && typeof sumber !== 'string') {
      errors.push('Sumber harus berupa teks');
    }

    if (errors.length > 0) {
      throw new AppError('Validasi gagal', 400, errors);
    }
  }

  getAllMateri() {
    return this.repo.findAll();
  }

  getMateriById(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new AppError('ID materi tidak valid', 400);
    }

    const materi = this.repo.findById(numericId);
    if (!materi) {
      throw new AppError('Materi tidak ditemukan', 404);
    }

    return materi;
  }

  createMateri(data) {
    this.validateMateriInput(data, false);

    const judul = data.judul.trim();
    const sumber = data.sumber && typeof data.sumber === 'string' ? data.sumber.trim() : null;
    const status = data.status || 'belum';

    return this.repo.create({ judul, sumber, status });
  }

  updateMateri(id, data) {
    const existing = this.getMateriById(id);

    this.validateMateriInput(data, true);

    const judul = data.judul !== undefined ? data.judul.trim() : existing.judul;
    const sumber = data.sumber !== undefined 
      ? (typeof data.sumber === 'string' ? data.sumber.trim() : null)
      : existing.sumber;
    const status = data.status !== undefined ? data.status : existing.status;

    return this.repo.update(existing.id, { judul, sumber, status });
  }

  deleteMateri(id) {
    const existing = this.getMateriById(id);
    return this.repo.delete(existing.id);
  }
}

export const materiService = new MateriService();
