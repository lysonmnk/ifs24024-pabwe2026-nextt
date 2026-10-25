/**
 * Modul Validasi Terpusat Frontend (Frontend Centralized Validators).
 * Menyediakan aturan validasi input form yang terisolasi dan modular,
 * disinkronkan 100% dengan skema validasi backend untuk menjaga integritas data.
 */

/**
 * Memvalidasi form pendaftaran akun baru.
 *
 * @param {Object} input
 * @param {string} input.nama - Nama lengkap (2-50 karakter)
 * @param {string} input.email - Email valid
 * @param {string} input.password - Kata sandi (minimal 8 karakter)
 * @returns {{ isValid: boolean, errors: Record<string, string> }} Hasil evaluasi
 */
export const validateRegister = ({ nama, email, password } = {}) => {
  const errors = {};

  if (!nama || !nama.trim()) {
    errors.nama = 'Nama lengkap wajib diisi';
  } else if (nama.trim().length < 2 || nama.trim().length > 50) {
    errors.nama = 'Nama harus berisi antara 2 hingga 50 karakter';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !email.trim()) {
    errors.email = 'Email wajib diisi';
  } else if (!emailRegex.test(email.trim())) {
    errors.email = 'Format email tidak valid';
  }

  if (!password) {
    errors.password = 'Kata sandi wajib diisi';
  } else if (password.length < 8) {
    errors.password = 'Kata sandi minimal 8 karakter';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Memvalidasi form autentikasi login pengguna.
 *
 * @param {Object} input
 * @param {string} input.email - Email pengguna
 * @param {string} input.password - Kata sandi
 * @returns {{ isValid: boolean, errors: Record<string, string> }} Hasil evaluasi
 */
export const validateLogin = ({ email, password } = {}) => {
  const errors = {};

  if (!email || !email.trim()) {
    errors.email = 'Email wajib diisi';
  }

  if (!password) {
    errors.password = 'Kata sandi wajib diisi';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Memvalidasi form topik materi pembelajaran.
 * Selaras dengan aturan backend: judul (1-100), status (belum/sedang/selesai), sumber (<=100).
 *
 * @param {Object} input
 * @param {string} input.judul - Judul materi (1-100 karakter)
 * @param {string} [input.status] - Status progres ('belum' | 'sedang' | 'selesai')
 * @param {string} [input.sumber] - Sumber atau referensi materi (maks 100 karakter)
 * @returns {{ isValid: boolean, errors: Record<string, string> }} Hasil evaluasi
 */
export const validateMateri = ({ judul, status, sumber } = {}) => {
  const errors = {};

  if (!judul || !judul.trim()) {
    errors.judul = 'Judul materi wajib diisi';
  } else if (judul.trim().length > 100) {
    errors.judul = 'Judul materi maksimal 100 karakter';
  }

  const validStatuses = ['belum', 'sedang', 'selesai'];
  if (status && !validStatuses.includes(status)) {
    errors.status = 'Status tidak valid';
  }

  if (sumber && typeof sumber === 'string' && sumber.trim().length > 100) {
    errors.sumber = 'Sumber materi maksimal 100 karakter';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Memvalidasi form log sesi belajar.
 * Selaras dengan aturan backend: tanggal YYYY-MM-DD valid, durasi 1-1440 menit, catatan <=500.
 *
 * @param {Object} input
 * @param {string} input.tanggal - Tanggal sesi belajar (YYYY-MM-DD)
 * @param {number|string} [input.durasi_menit] - Durasi menit (integer 1 - 1440)
 * @param {number|string} [input.durasiMenit] - Alias camelCase durasi menit
 * @param {string} [input.catatan] - Catatan ringkasan (maksimal 500 karakter)
 * @returns {{ isValid: boolean, errors: Record<string, string> }} Hasil evaluasi
 */
export const validateSesi = ({ tanggal, durasi_menit, durasiMenit, catatan } = {}) => {
  const errors = {};

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!tanggal || !tanggal.trim()) {
    errors.tanggal = 'Tanggal sesi wajib diisi';
  } else if (!dateRegex.test(tanggal.trim())) {
    errors.tanggal = 'Format tanggal harus YYYY-MM-DD';
  } else {
    const parsed = new Date(tanggal.trim());
    if (isNaN(parsed.getTime())) {
      errors.tanggal = 'Tanggal tidak valid';
    }
  }

  const rawDurasi = durasi_menit !== undefined ? durasi_menit : durasiMenit;
  const durasiNum = Number(rawDurasi);
  if (rawDurasi === '' || rawDurasi === null || rawDurasi === undefined || isNaN(durasiNum)) {
    errors.durasi_menit = 'Durasi wajib diisi angka';
    errors.durasiMenit = 'Durasi wajib diisi angka';
  } else if (!Number.isInteger(durasiNum) || durasiNum <= 0) {
    errors.durasi_menit = 'Durasi harus berupa angka positif (> 0 menit)';
    errors.durasiMenit = 'Durasi harus berupa angka positif (> 0 menit)';
  } else if (durasiNum > 1440) {
    errors.durasi_menit = 'Durasi menit maksimal 1440 menit (24 jam)';
    errors.durasiMenit = 'Durasi menit maksimal 1440 menit (24 jam)';
  }

  if (catatan && typeof catatan === 'string' && catatan.trim().length > 500) {
    errors.catatan = 'Catatan maksimal 500 karakter';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
