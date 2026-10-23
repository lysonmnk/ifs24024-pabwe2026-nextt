import React, { useState } from 'react';
import { Plus, Search, AlertCircle, RefreshCw } from 'lucide-react';
import { useMateri } from '../hooks/useMateri.js';
import { StatsBanner } from '../components/StatsBanner.jsx';
import { MateriCard } from '../components/MateriCard.jsx';
import { MateriModal } from '../components/MateriModal.jsx';
import { ConfirmModal } from '../components/ConfirmModal.jsx';

export const MateriListPage = () => {
  const {
    materiList,
    loading,
    error,
    refresh,
    addMateri,
    updateMateri,
    deleteMateri
  } = useMateri();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMateri, setEditingMateri] = useState(null);
  const [deletingMateri, setDeletingMateri] = useState(null);

  const filteredMateri = materiList.filter((item) => {
    const matchesSearch =
      item.judul.toLowerCase().includes(search.toLowerCase()) ||
      (item.sumber && item.sumber.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      statusFilter === 'semua' ? true : item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingMateri(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (materi) => {
    setEditingMateri(materi);
    setModalOpen(true);
  };

  const handleModalSubmit = async (data) => {
    if (editingMateri) {
      await updateMateri(editingMateri.id, data);
    } else {
      await addMateri(data);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingMateri) {
      await deleteMateri(deletingMateri.id);
      setDeletingMateri(null);
    }
  };

  return (
    <div className="page-container">
      {/* Header Statistik */}
      <div className="page-header-section">
        <div>
          <h2 className="section-title">Dashboard Progres Belajar</h2>
          <p className="section-subtitle">
            Kelola materi pemrograman dan pantau durasi waktu belajarmu
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-with-icon"
          onClick={handleOpenAdd}
        >
          <Plus size={18} />
          <span>Tambah Materi</span>
        </button>
      </div>

      <StatsBanner materiList={materiList} />

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Cari judul materi atau sumber..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="status-tabs">
          {[
            { id: 'semua', label: 'Semua' },
            { id: 'belum', label: 'Belum Mulai' },
            { id: 'sedang', label: 'Sedang Belajar' },
            { id: 'selesai', label: 'Selesai' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn ${statusFilter === tab.id ? 'tab-btn-active' : ''}`}
              onClick={() => setStatusFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="alert alert-error">
          <AlertCircle size={20} />
          <div className="alert-content">
            <strong>Terjadi Kesalahan:</strong> {error}
          </div>
          <button type="button" className="btn-link" onClick={refresh}>
            <RefreshCw size={14} /> Coba Lagi
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner" />
          <p>Memuat materi belajar...</p>
        </div>
      ) : filteredMateri.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>Tidak Ada Materi Belajar</h3>
          <p>
            {search || statusFilter !== 'semua'
              ? 'Tidak ditemukan materi yang cocok dengan filter pencarian.'
              : 'Belum ada materi belajar yang ditambahkan. Mulai dengan menambahkan materi pertamamu!'}
          </p>
          {!search && statusFilter === 'semua' && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleOpenAdd}
            >
              <Plus size={16} /> Tambah Materi Sekarang
            </button>
          )}
        </div>
      ) : (
        <div className="materi-grid">
          {filteredMateri.map((materi) => (
            <MateriCard
              key={materi.id}
              materi={materi}
              onEdit={handleOpenEdit}
              onDelete={setDeletingMateri}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <MateriModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingMateri}
      />

      <ConfirmModal
        isOpen={Boolean(deletingMateri)}
        onClose={() => setDeletingMateri(null)}
        onConfirm={handleConfirmDelete}
        title="Hapus Materi Belajar"
        message={`Materi "${deletingMateri?.judul}" beserta seluruh riwayat sesi belajarnya akan dihapus secara permanen. Lanjutkan?`}
      />
    </div>
  );
};
