import Swal from 'sweetalert2';

export const showSuccess = (message) =>
  Swal.fire({
    icon: 'success',
    title: 'Berhasil',
    text: message,
    confirmButtonColor: '#4f46e5'
  });

export const showError = (message) =>
  Swal.fire({
    icon: 'error',
    title: 'Terjadi Kesalahan',
    text: message,
    confirmButtonColor: '#4f46e5'
  });

export const confirmDelete = async (message) => {
  const result = await Swal.fire({
    icon: 'warning',
    title: 'Konfirmasi Hapus',
    text: message,
    showCancelButton: true,
    confirmButtonText: 'Hapus',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#64748b'
  });

  return result.isConfirmed;
};
