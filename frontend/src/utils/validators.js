/**
 * Modul Validasi Terpusat Frontend (Frontend Centralized Validators).
 * Menyediakan aturan validasi input form yang terisolasi dan modular,
 * selaras dengan skema validasi backend untuk menjaga konsistensi integritas data.
 */

/**
 * Memvalidasi form autentikasi login.
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
 * Memvalidasi form pendaftaran akun baru.
 *
 * @param {Object} input
 * @param {string} input.nama - Nama lengkap (2-50 karakter)
 * @param {string} input.email - Alamat email dengan regex RFC standar
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
 * Memvalidasi form topik materi pembelajaran.
 *
 * @param {Object} input
 * @param {string} input.judul - Judul materi (1-100 karakter)
 * @param {string} [input.status] - Status progres ('belum' | 'sedang' | 'selesai')
 * @param {string} [input.sumber] - Sumber atau referensi materi (opsional, maks 100 karakter)
 * @returns {{ isValid: boolean, errors: Record<string, string> }} Hasil evaluasi
 */
export const validateMateri = ({ judul, status, sumber } = {}) => {
  const errors = {};

  if (!judul || !judul.trim()) {
    errors.judul = 'Judul materi wajib diisi';
  } else if (judul.trim().length > 100) {
    errors.judul = 'Judul maksimal 100 karakter';
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
 *
 * @param {Object} input
 * @param {string} input.tanggal - Tanggal sesi belajar (wajib diisi, format YYYY-MM-DD)
 * @param {number|string} [input.durasi_menit] - Durasi menit (integer positif 1 - 1440)
 * @param {number|string} [input.durasiMenit] - Alias camelCase durasi menit
 * @returns {{ isValid: boolean, errors: Record<string, string> }} Hasil evaluasi
 */
export const validateSesi = ({ tanggal, durasi_menit, durasiMenit } = {}) => {
  const errors = {};

  if (!tanggal || !tanggal.trim()) {
    errors.tanggal = 'Tanggal sesi wajib diisi';
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
    errors.durasi_menit = 'Durasi maksimal 1440 menit (24 jam)';
    errors.durasiMenit = 'Durasi maksimal 1440 menit (24 jam)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
