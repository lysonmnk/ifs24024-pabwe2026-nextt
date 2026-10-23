import app from './app.js';
import { PORT } from './config/env.js';
import { getDatabase } from './config/db.js';

try {
  // Ensure database and tables are ready
  getDatabase();
  console.log('Database SQLite berhasil diinisialisasi.');

  app.listen(PORT, () => {
    console.log(`Server HyperLink berjalan di http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('Gagal menjalankan server:', error);
  process.exit(1);
}
