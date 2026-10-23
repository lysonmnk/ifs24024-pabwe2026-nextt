import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="page-container text-center py-12">
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h2>Halaman Tidak Ditemukan (404)</h2>
        <p>Halaman yang Anda tuju tidak tersedia atau telah dipindahkan.</p>
        <Link to="/" className="btn btn-primary mt-4 inline-flex">
          <ArrowLeft size={16} />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
};
