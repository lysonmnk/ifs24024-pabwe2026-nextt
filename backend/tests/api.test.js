import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { getDatabase, setDatabase, closeDatabase } from '../src/config/db.js';

describe('HyperLink Backend API Integration Tests', () => {
  beforeEach(() => {
    // Inisialisasi in-memory SQLite untuk test
    closeDatabase();
    getDatabase(':memory:');
  });

  afterAll(() => {
    closeDatabase();
  });

  describe('CRUD Materi Belajar (/api/materi)', () => {
    it('harus mengembalikan daftar materi kosong saat pertama kali', async () => {
      const res = await request(app).get('/api/materi');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual([]);
    });

    it('harus berhasil menambahkan materi baru', async () => {
      const payload = {
        judul: 'JavaScript Dasar',
        sumber: 'SoloLearn',
        status: 'sedang'
      };

      const res = await request(app).post('/api/materi').send(payload);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.judul).toBe('JavaScript Dasar');
      expect(res.body.data.sumber).toBe('SoloLearn');
      expect(res.body.data.status).toBe('sedang');
      expect(res.body.data.total_menit).toBe(0);
    });

    it('harus gagal saat menambahkan materi tanpa judul', async () => {
      const payload = {
        judul: '   ',
        status: 'belum'
      };

      const res = await request(app).post('/api/materi').send(payload);
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toContain('Judul materi wajib diisi');
    });

    it('harus gagal saat status tidak valid', async () => {
      const payload = {
        judul: 'Vue.js Lanjut',
        status: 'pending'
      };

      const res = await request(app).post('/api/materi').send(payload);
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors[0]).toContain('Status harus salah satu dari');
    });

    it('harus mengembalikan detail materi berdasarkan ID', async () => {
      const createRes = await request(app)
        .post('/api/materi')
        .send({ judul: 'Express.js', status: 'belum' });
      const id = createRes.body.data.id;

      const res = await request(app).get(`/api/materi/${id}`);
      expect(res.status).toBe(200);
      expect(res.body.data.judul).toBe('Express.js');
    });

    it('harus mengembalikan 404 jika materi tidak ditemukan', async () => {
      const res = await request(app).get('/api/materi/9999');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('harus berhasil memperbarui materi', async () => {
      const createRes = await request(app)
        .post('/api/materi')
        .send({ judul: 'React 18', status: 'belum' });
      const id = createRes.body.data.id;

      const res = await request(app)
        .put(`/api/materi/${id}`)
        .send({ judul: 'React 19', status: 'selesai' });

      expect(res.status).toBe(200);
      expect(res.body.data.judul).toBe('React 19');
      expect(res.body.data.status).toBe('selesai');
    });

    it('harus berhasil menghapus materi beserta sesi belajarnya', async () => {
      const createRes = await request(app)
        .post('/api/materi')
        .send({ judul: 'Hapus Aku', status: 'belum' });
      const id = createRes.body.data.id;

      const deleteRes = await request(app).delete(`/api/materi/${id}`);
      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.success).toBe(true);

      const checkRes = await request(app).get(`/api/materi/${id}`);
      expect(checkRes.status).toBe(404);
    });
  });

  describe('Sesi Belajar (/api/materi/:materiId/sesi dan /api/sesi/:id)', () => {
    it('harus berhasil mencatat sesi belajar dan memperbarui total_menit', async () => {
      const materiRes = await request(app)
        .post('/api/materi')
        .send({ judul: 'CSS Grid & Flexbox', status: 'sedang' });
      const materiId = materiRes.body.data.id;

      const sesi1 = {
        tanggal: '2026-10-23',
        durasi_menit: 45,
        catatan: 'Latihan layout grid 3 kolom'
      };

      const sesiRes1 = await request(app)
        .post(`/api/materi/${materiId}/sesi`)
        .send(sesi1);
      expect(sesiRes1.status).toBe(201);
      expect(sesiRes1.body.data.durasi_menit).toBe(45);

      const sesi2 = {
        tanggal: '2026-10-24',
        durasi_menit: 60,
        catatan: 'Belajar responsive design'
      };
      await request(app).post(`/api/materi/${materiId}/sesi`).send(sesi2);

      // Cek list sesi
      const listSesiRes = await request(app).get(`/api/materi/${materiId}/sesi`);
      expect(listSesiRes.status).toBe(200);
      expect(listSesiRes.body.data.length).toBe(2);

      // Cek materi total_menit (45 + 60 = 105)
      const getMateriRes = await request(app).get(`/api/materi/${materiId}`);
      expect(getMateriRes.body.data.total_menit).toBe(105);
    });

    it('harus menolak sesi belajar dengan durasi 0 atau negatif', async () => {
      const materiRes = await request(app)
        .post('/api/materi')
        .send({ judul: 'Python', status: 'belum' });
      const materiId = materiRes.body.data.id;

      const res = await request(app)
        .post(`/api/materi/${materiId}/sesi`)
        .send({
          tanggal: '2026-10-23',
          durasi_menit: 0,
          catatan: 'Invalid'
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors[0]).toContain('bilangan bulat positif');
    });

    it('harus menolak sesi belajar jika materiId tidak ditemukan', async () => {
      const res = await request(app)
        .post('/api/materi/999/sesi')
        .send({
          tanggal: '2026-10-23',
          durasi_menit: 30
        });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('harus berhasil menghapus sesi belajar', async () => {
      const materiRes = await request(app)
        .post('/api/materi')
        .send({ judul: 'Docker', status: 'belum' });
      const materiId = materiRes.body.data.id;

      const sesiRes = await request(app)
        .post(`/api/materi/${materiId}/sesi`)
        .send({
          tanggal: '2026-10-23',
          durasi_menit: 30,
          catatan: 'Container dasar'
        });
      const sesiId = sesiRes.body.data.id;

      const deleteRes = await request(app).delete(`/api/sesi/${sesiId}`);
      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.success).toBe(true);

      const listRes = await request(app).get(`/api/materi/${materiId}/sesi`);
      expect(listRes.body.data.length).toBe(0);
    });
  });
});
