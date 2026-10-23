import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { DB_PATH } from './env.js';

const require = createRequire(import.meta.url);

const getDatabaseClass = () => {
  try {
    const mod = require('better-sqlite3');
    return mod.default || mod;
  } catch {
    const { DatabaseSync } = require('node:sqlite');
    return DatabaseSync;
  }
};

let dbInstance = null;

export const initTables = (db) => {
  db.exec('PRAGMA foreign_keys = ON;');

  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      nama           TEXT NOT NULL,
      email          TEXT NOT NULL UNIQUE,
      password_hash  TEXT NOT NULL,
      created_at     TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createMateriTable = `
    CREATE TABLE IF NOT EXISTS materi (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id     INTEGER NOT NULL,
      judul       TEXT NOT NULL,
      sumber      TEXT,
      status      TEXT NOT NULL DEFAULT 'belum'
                  CHECK (status IN ('belum', 'sedang', 'selesai')),
      created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  const createSesiTable = `
    CREATE TABLE IF NOT EXISTS sesi_belajar (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      materi_id     INTEGER NOT NULL,
      tanggal       TEXT NOT NULL,
      durasi_menit  INTEGER NOT NULL CHECK (durasi_menit > 0),
      catatan       TEXT,
      created_at    TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (materi_id) REFERENCES materi(id) ON DELETE CASCADE
    );
  `;

  db.exec(createUsersTable);
  db.exec(createMateriTable);
  db.exec(createSesiTable);
};

export const getDatabase = (customPath = null) => {
  if (dbInstance) {
    return dbInstance;
  }

  const Cls = getDatabaseClass();
  const targetPath = customPath || DB_PATH;

  if (targetPath !== ':memory:') {
    const dir = path.dirname(path.resolve(targetPath));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  dbInstance = new Cls(targetPath);
  initTables(dbInstance);
  return dbInstance;
};

export const setDatabase = (db) => {
  dbInstance = db;
  initTables(dbInstance);
  return dbInstance;
};

export const closeDatabase = () => {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
};
