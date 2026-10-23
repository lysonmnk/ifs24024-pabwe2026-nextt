import { getDatabase } from '../config/db.js';

export class MateriRepository {
  constructor(db = null) {
    this._db = db;
  }

  get db() {
    return this._db || getDatabase();
  }

  findAll() {
    const query = `
      SELECT 
        m.id,
        m.judul,
        m.sumber,
        m.status,
        m.created_at,
        CAST(COALESCE(SUM(s.durasi_menit), 0) AS INTEGER) AS total_menit
      FROM materi m
      LEFT JOIN sesi_belajar s ON m.id = s.materi_id
      GROUP BY m.id
      ORDER BY m.created_at DESC, m.id DESC
    `;
    return this.db.prepare(query).all();
  }

  findById(id) {
    const query = `
      SELECT 
        m.id,
        m.judul,
        m.sumber,
        m.status,
        m.created_at,
        CAST(COALESCE(SUM(s.durasi_menit), 0) AS INTEGER) AS total_menit
      FROM materi m
      LEFT JOIN sesi_belajar s ON m.id = s.materi_id
      WHERE m.id = ?
      GROUP BY m.id
    `;
    return this.db.prepare(query).get(id) || null;
  }

  create({ judul, sumber, status }) {
    const query = `
      INSERT INTO materi (judul, sumber, status)
      VALUES (?, ?, ?)
    `;
    const stmt = this.db.prepare(query);
    const result = stmt.run(judul, sumber, status);
    return this.findById(result.lastInsertRowid);
  }

  update(id, { judul, sumber, status }) {
    const query = `
      UPDATE materi
      SET judul = ?, sumber = ?, status = ?
      WHERE id = ?
    `;
    const stmt = this.db.prepare(query);
    stmt.run(judul, sumber, status, id);
    return this.findById(id);
  }

  delete(id) {
    const query = `DELETE FROM materi WHERE id = ?`;
    const result = this.db.prepare(query).run(id);
    return result.changes > 0;
  }
}

export const materiRepository = new MateriRepository();
