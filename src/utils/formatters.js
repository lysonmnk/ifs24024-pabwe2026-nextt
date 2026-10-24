export const formatDurasi = (totalMenit) => {
  const menit = Number(totalMenit) || 0;
  if (menit <= 0) return '0 menit';
  
  const jam = Math.floor(menit / 60);
  const sisaMenit = menit % 60;

  if (jam === 0) {
    return `${sisaMenit} menit`;
  }
  if (sisaMenit === 0) {
    return `${jam} jam`;
  }
  return `${jam} jam ${sisaMenit} mnt`;
};

export const formatTanggal = (dateString) => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
};

export const getStatusMeta = (status) => {
  switch (status) {
    case 'selesai':
      return {
        label: 'Selesai',
        badgeClass: 'badge-selesai',
        color: '#10b981'
      };
    case 'sedang':
      return {
        label: 'Sedang Dipelajari',
        badgeClass: 'badge-sedang',
        color: '#3b82f6'
      };
    case 'belum':
    default:
      return {
        label: 'Belum Mulai',
        badgeClass: 'badge-belum',
        color: '#6b7280'
      };
  }
};
