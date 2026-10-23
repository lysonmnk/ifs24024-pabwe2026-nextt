import { getDatabase } from '../config/database.js';

export class MateriRepository {
  constructor(db = null) {
    this._db = db;
  }

  get db() {
    return this._db || getDatabase();
  }

  findAllByUserId(userId) {
    const query = `
      SELECT 
        m.id,
        m.user_id,
        m.judul,
        m.sumber,
        m.status,
        m.created_at,
        CAST(COALESCE(SUM(s.durasi_menit), 0) AS INTEGER) AS total_menit
      FROM materi m
      LEFT JOIN sesi_belajar s ON m.id = s.materi_id
      WHERE m.user_id = ?
      GROUP BY m.id
      ORDER BY m.created_at DESC, m.id DESC
    `;
    return this.db.prepare(query).all(userId);
  }

  findByIdAndUserId(id, userId) {
    const query = `
      SELECT 
        m.id,
        m.user_id,
        m.judul,
        m.sumber,
        m.status,
        m.created_at,
        CAST(COALESCE(SUM(s.durasi_menit), 0) AS INTEGER) AS total_menit
      FROM materi m
      LEFT JOIN sesi_belajar s ON m.id = s.materi_id
      WHERE m.id = ? AND m.user_id = ?
      GROUP BY m.id
    `;
    return this.db.prepare(query).get(id, userId) || null;
  }

  create({ user_id, judul, sumber, status }) {
    const query = `
      INSERT INTO materi (user_id, judul, sumber, status)
      VALUES (?, ?, ?, ?)
    `;
    const stmt = this.db.prepare(query);
    const result = stmt.run(user_id, judul, sumber, status);
    return this.findByIdAndUserId(result.lastInsertRowid, user_id);
  }

  update(id, userId, { judul, sumber, status }) {
    const query = `
      UPDATE materi
      SET judul = ?, sumber = ?, status = ?
      WHERE id = ? AND user_id = ?
    `;
    const stmt = this.db.prepare(query);
    stmt.run(judul, sumber, status, id, userId);
    return this.findByIdAndUserId(id, userId);
  }

  delete(id, userId) {
    const query = `DELETE FROM materi WHERE id = ? AND user_id = ?`;
    const result = this.db.prepare(query).run(id, userId);
    return result.changes > 0;
  }
}

export const materiRepository = new MateriRepository();
