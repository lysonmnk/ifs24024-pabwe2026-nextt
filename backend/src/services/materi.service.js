import { materiRepository } from '../repositories/materi.repository.js';
import { AppError } from '../utils/app-error.js';
import { parseId } from '../utils/parse-id.js';

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
      } else if (judul.trim().length > 100) {
        errors.push('Judul materi maksimal 100 karakter');
      }
    }

    if (status !== undefined) {
      if (!VALID_STATUSES.includes(status)) {
        errors.push(`Status harus salah satu dari: ${VALID_STATUSES.join(', ')}`);
      }
    }

    if (sumber !== undefined && sumber !== null && typeof sumber !== 'string') {
      errors.push('Sumber materi harus berupa teks');
    } else if (sumber && typeof sumber === 'string' && sumber.trim().length > 100) {
      errors.push('Sumber materi maksimal 100 karakter');
    }

    if (errors.length > 0) {
      throw new AppError('Validasi gagal', 400, errors);
    }
  }

  getAllMateri(userId) {
    return this.repo.findAllByUserId(userId);
  }

  getMateriById(id, userId) {
    const numericId = parseId(id, 'ID materi');
    const materi = this.repo.findByIdAndUserId(numericId, userId);

    if (!materi) {
      // Data milik pengguna lain atau tidak ada dianggap 404 (tidak dibocorkan)
      throw new AppError('Materi tidak ditemukan', 404, ['Materi tidak ditemukan']);
    }

    return materi;
  }

  createMateri(userId, data) {
    this.validateMateriInput(data, false);

    const judul = data.judul.trim();
    const sumber = data.sumber && typeof data.sumber === 'string' ? data.sumber.trim() : null;
    const status = data.status || 'belum';

    return this.repo.create({
      user_id: userId,
      judul,
      sumber,
      status
    });
  }

  updateMateri(id, userId, data) {
    const existing = this.getMateriById(id, userId);

    this.validateMateriInput(data, true);

    const judul = data.judul !== undefined ? data.judul.trim() : existing.judul;
    const sumber = data.sumber !== undefined
      ? (typeof data.sumber === 'string' ? data.sumber.trim() : null)
      : existing.sumber;
    const status = data.status !== undefined ? data.status : existing.status;

    return this.repo.update(existing.id, userId, { judul, sumber, status });
  }

  deleteMateri(id, userId) {
    const existing = this.getMateriById(id, userId);
    return this.repo.delete(existing.id, userId);
  }
}

export const materiService = new MateriService();
