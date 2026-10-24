export const validateLogin = ({ email, password }) => {
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

export const validateRegister = ({ nama, email, password }) => {
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

export const validateMateri = ({ judul, status }) => {
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

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateSesi = ({ tanggal, durasi_menit }) => {
  const errors = {};

  if (!tanggal || !tanggal.trim()) {
    errors.tanggal = 'Tanggal sesi wajib diisi';
  }

  const durasiNum = Number(durasi_menit);
  if (durasi_menit === '' || durasi_menit === null || durasi_menit === undefined || isNaN(durasiNum)) {
    errors.durasi_menit = 'Durasi wajib diisi angka';
  } else if (!Number.isInteger(durasiNum) || durasiNum <= 0) {
    errors.durasi_menit = 'Durasi harus berupa angka positif (> 0 menit)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
