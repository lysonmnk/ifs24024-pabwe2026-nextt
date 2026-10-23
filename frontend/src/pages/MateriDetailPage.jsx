import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Clock,
  ExternalLink,
  Calendar,
  Trash2,
  FileText,
  AlertCircle
} from 'lucide-react';
import * as materiService from '../services/materiService.js';
import { useSesi } from '../hooks/useSesi.js';
import { SesiModal } from '../components/SesiModal.jsx';
import { ConfirmModal } from '../components/ConfirmModal.jsx';
import { formatDurasi, formatTanggal, getStatusMeta } from '../utils/formatters.js';

export const MateriDetailPage = () => {
  const { id } = useParams();
  const [materi, setMateri] = useState(null);
  const [materiLoading, setMateriLoading] = useState(true);
  const [materiError, setMateriError] = useState(null);

  const {
    sesiList,
    loading: sesiLoading,
    error: sesiError,
    addSesi,
    deleteSesi
  } = useSesi(id);

  const [modalOpen, setModalOpen] = useState(false);
  const [deletingSesi, setDeletingSesi] = useState(null);

  const fetchMateriDetail = useCallback(async () => {
    setMateriLoading(true);
    setMateriError(null);
    try {
      const data = await materiService.getMateriDetail(id);
      setMateri(data);
    } catch (err) {
      setMateriError(err.message || 'Gagal mengambil detail materi');
    } finally {
      setMateriLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMateriDetail();
  }, [fetchMateriDetail]);

  const handleAddSesi = async (payload) => {
    await addSesi(payload);
    // Refresh materi detail to update total_menit
    fetchMateriDetail();
  };

  const handleConfirmDeleteSesi = async () => {
    if (deletingSesi) {
      await deleteSesi(deletingSesi.id);
      setDeletingSesi(null);
      fetchMateriDetail();
    }
  };

  if (materiLoading) {
    return (
      <div className="page-container loading-container">
        <div className="spinner" />
        <p>Memuat detail materi...</p>
      </div>
    );
  }

  if (materiError || !materi) {
    return (
      <div className="page-container">
        <Link to="/" className="btn-back">
          <ArrowLeft size={18} /> Kembali ke Beranda
        </Link>
        <div className="alert alert-error mt-4">
          <AlertCircle size={20} />
          <span>{materiError || 'Materi tidak ditemukan'}</span>
        </div>
      </div>
    );
  }

  const statusMeta = getStatusMeta(materi.status);

  return (
    <div className="page-container">
      <Link to="/" className="btn-back">
        <ArrowLeft size={18} /> Kembali ke Daftar Materi
      </Link>

      {/* Header Info Materi */}
      <div className="detail-hero-card">
        <div className="detail-header-top">
          <span className={`status-badge ${statusMeta.badgeClass}`}>
            {statusMeta.label}
          </span>
          <div className="materi-time-pill">
            <Clock size={16} />
            <span>Total: {formatDurasi(materi.total_menit)}</span>
          </div>
        </div>

        <h2 className="detail-title">{materi.judul}</h2>

        {materi.sumber && (
          <div className="detail-source">
            <ExternalLink size={15} />
            <span>Sumber Belajar: {materi.sumber}</span>
          </div>
        )}
      </div>

      {/* Sesi Belajar Section */}
      <div className="session-header-section">
        <div>
          <h3 className="section-title">Riwayat Sesi Belajar</h3>
          <p className="section-subtitle">
            Catatan sesi belajar beserta waktu yang dihabiskan
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-with-icon"
          onClick={() => setModalOpen(true)}
        >
          <Plus size={18} />
          <span>Catat Sesi Baru</span>
        </button>
      </div>

      {sesiError && (
        <div className="alert alert-error">
          <AlertCircle size={20} />
          <span>{sesiError}</span>
        </div>
      )}

      {sesiLoading ? (
        <div className="loading-container">
          <div className="spinner" />
          <p>Memuat sesi belajar...</p>
        </div>
      ) : sesiList.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⏱️</div>
          <h3>Belum Ada Sesi Belajar</h3>
          <p>
            Materi ini belum memiliki catatan sesi. Klik tombol di atas untuk
            mencatat sesi belajarmu hari ini!
          </p>
        </div>
      ) : (
        <div className="sessions-list">
          {sesiList.map((sesi) => (
            <div key={sesi.id} className="session-item-card">
              <div className="session-item-main">
                <div className="session-meta">
                  <div className="meta-tag">
                    <Calendar size={14} />
                    <span>{formatTanggal(sesi.tanggal)}</span>
                  </div>
                  <div className="meta-tag meta-duration">
                    <Clock size={14} />
                    <span>{sesi.durasi_menit} menit</span>
                  </div>
                </div>

                {sesi.catatan ? (
                  <p className="session-note">{sesi.catatan}</p>
                ) : (
                  <p className="session-note note-empty">Tidak ada catatan</p>
                )}
              </div>

              <div className="session-actions">
                <button
                  type="button"
                  className="btn-icon btn-icon-danger"
                  onClick={() => setDeletingSesi(sesi)}
                  title="Hapus Sesi"
                  aria-label="Hapus Sesi"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <SesiModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddSesi}
        materiJudul={materi.judul}
      />

      <ConfirmModal
        isOpen={Boolean(deletingSesi)}
        onClose={() => setDeletingSesi(null)}
        onConfirm={handleConfirmDeleteSesi}
        title="Hapus Sesi Belajar"
        message={`Sesi pada tanggal ${formatTanggal(deletingSesi?.tanggal)} (${deletingSesi?.durasi_menit} menit) akan dihapus. Lanjutkan?`}
      />
    </div>
  );
};
