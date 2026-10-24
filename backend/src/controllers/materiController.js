import { materiService } from '../services/materiService.js';
import { sendSuccess } from '../utils/responseHelper.js';

export class MateriController {
  constructor(service = materiService) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const materiList = this.service.getAllMateri();
      return sendSuccess(res, 200, 'Berhasil mengambil daftar materi', materiList);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const materi = this.service.getMateriById(req.params.id);
      return sendSuccess(res, 200, 'Berhasil mengambil detail materi', materi);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const newMateri = this.service.createMateri(req.body);
      return sendSuccess(res, 201, 'Berhasil menambahkan materi belajar', newMateri);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const updatedMateri = this.service.updateMateri(req.params.id, req.body);
      return sendSuccess(res, 200, 'Berhasil memperbarui materi belajar', updatedMateri);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      this.service.deleteMateri(req.params.id);
      return sendSuccess(res, 200, 'Berhasil menghapus materi beserta sesi belajarnya', null);
    } catch (error) {
      next(error);
    }
  };
}

export const materiController = new MateriController();
