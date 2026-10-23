import { getDatabase } from '../config/database.js';

export class SesiRepository {
  constructor(db = null) {
    this._db = db;
  }

  get db() {
    return this._db || getDatabase();
  }

  findByMateriId(materiId) {
    const query = `
      SELECT id, materi_id, tanggal, durasi_menit, catatan, created_at
      FROM sesi_belajar
      WHERE materi_id = ?
      ORDER BY tanggal DESC, id DESC
    `;
    return this.db.prepare(query).all(materiId);
  }

  findById(id) {
    const query = `
      SELECT id, materi_id, tanggal, durasi_menit, catatan, created_at
      FROM sesi_belajar
      WHERE id = ?
    `;
    return this.db.prepare(query).get(id) || null;
  }

  findByIdAndUserId(id, userId) {
    const query = `
      SELECT s.id, s.materi_id, s.tanggal, s.durasi_menit, s.catatan, s.created_at
      FROM sesi_belajar s
      JOIN materi m ON s.materi_id = m.id
      WHERE s.id = ? AND m.user_id = ?
    `;
    return this.db.prepare(query).get(id, userId) || null;
  }

  create({ materi_id, tanggal, durasi_menit, catatan }) {
    const query = `
      INSERT INTO sesi_belajar (materi_id, tanggal, durasi_menit, catatan)
      VALUES (?, ?, ?, ?)
    `;
    const stmt = this.db.prepare(query);
    const result = stmt.run(materi_id, tanggal, durasi_menit, catatan || null);
    return this.findById(result.lastInsertRowid);
  }

  delete(id) {
    const query = `DELETE FROM sesi_belajar WHERE id = ?`;
    const result = this.db.prepare(query).run(id);
    return result.changes > 0;
  }
}

export const sesiRepository = new SesiRepository();
