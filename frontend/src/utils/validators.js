export const validateMateri = ({ judul, status }) => {
  const errors = {};

  if (!judul || !judul.trim()) {
    errors.judul = 'Judul materi wajib diisi';
  } else if (judul.trim().length > 255) {
    errors.judul = 'Judul maksimal 255 karakter';
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
