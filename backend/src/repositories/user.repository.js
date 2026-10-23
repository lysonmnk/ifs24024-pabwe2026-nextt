import { getDatabase } from '../config/database.js';

export class UserRepository {
  constructor(db = null) {
    this._db = db;
  }

  get db() {
    return this._db || getDatabase();
  }

  findByEmail(email) {
    const query = `
      SELECT id, nama, email, password_hash, created_at
      FROM users
      WHERE email = ?
    `;
    return this.db.prepare(query).get(email) || null;
  }

  findById(id) {
    const query = `
      SELECT id, nama, email, created_at
      FROM users
      WHERE id = ?
    `;
    return this.db.prepare(query).get(id) || null;
  }

  create({ nama, email, password_hash }) {
    const query = `
      INSERT INTO users (nama, email, password_hash)
      VALUES (?, ?, ?)
    `;
    const stmt = this.db.prepare(query);
    const result = stmt.run(nama, email, password_hash);
    return this.findById(result.lastInsertRowid);
  }
}

export const userRepository = new UserRepository();
