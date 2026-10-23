import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useMateri } from '../hooks/useMateri.js';
import { MateriList } from '../components/MateriList.jsx';
import { MateriForm } from '../components/MateriForm.jsx';
import { ConfirmModal } from '../../../components/ConfirmModal.jsx';
import { StatsBanner } from '../../../components/StatsBanner.jsx';
import { Loading } from '../../../components/common/Loading.jsx';
import { ErrorMessage } from '../../../components/common/ErrorMessage.jsx';
import { Button } from '../../../components/common/Button.jsx';

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
      <div className="page-header-section">
        <div>
          <h2 className="section-title">Dashboard Materi Belajar</h2>
          <p className="section-subtitle">
            Kelola materi pemrograman dan pantau durasi waktu belajarmu
          </p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd}>
          <Plus size={18} />
          <span>Tambah Materi</span>
        </Button>
      </div>

      <StatsBanner materiList={materiList} />

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

      <ErrorMessage message={error} onRetry={refresh} />

      {loading ? (
        <Loading message="Memuat daftar materi..." />
      ) : (
        <MateriList
          materiList={filteredMateri}
          onEdit={handleOpenEdit}
          onDelete={setDeletingMateri}
          onAddNew={handleOpenAdd}
          hasFilter={Boolean(search || statusFilter !== 'semua')}
        />
      )}

      <MateriForm
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
        message={`Materi "${deletingMateri?.judul}" beserta seluruh riwayat sesinya akan dihapus permanen. Lanjutkan?`}
      />
    </div>
  );
};
