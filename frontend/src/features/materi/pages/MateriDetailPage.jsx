import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Clock, ExternalLink } from 'lucide-react';
import * as materiService from '../services/materiService.js';
import { useSesi } from '../../sesi/hooks/useSesi.js';
import { SesiForm } from '../../sesi/components/SesiForm.jsx';
import { SesiList } from '../../sesi/components/SesiList.jsx';
import { ConfirmModal } from '../../../components/ConfirmModal.jsx';
import { Loading } from '../../../components/common/Loading.jsx';
import { ErrorMessage } from '../../../components/common/ErrorMessage.jsx';
import { Button } from '../../../components/common/Button.jsx';
import { formatDurasi, formatTanggal, getStatusMeta } from '../../../utils/formatters.js';

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
    return <Loading message="Memuat detail materi..." />;
  }

  if (materiError || !materi) {
    return (
      <div className="page-container">
        <Link to="/" className="btn-back">
          <ArrowLeft size={18} /> Kembali ke Beranda
        </Link>
        <ErrorMessage message={materiError || 'Materi tidak ditemukan'} />
      </div>
    );
  }

  const statusMeta = getStatusMeta(materi.status);

  return (
    <div className="page-container">
      <Link to="/" className="btn-back">
        <ArrowLeft size={18} /> Kembali ke Daftar Materi
      </Link>

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

      <div className="session-header-section">
        <div>
          <h2 className="section-title">Riwayat Sesi Belajar</h2>
          <p className="section-subtitle">
            Catatan sesi belajar beserta waktu yang dihabiskan
          </p>
        </div>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          <Plus size={18} />
          <span>Catat Sesi Baru</span>
        </Button>
      </div>

      <ErrorMessage message={sesiError} />

      {sesiLoading ? (
        <Loading message="Memuat sesi belajar..." />
      ) : (
        <SesiList sesiList={sesiList} onDelete={setDeletingSesi} />
      )}

      <SesiForm
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
        message={`Sesi tanggal ${formatTanggal(deletingSesi?.tanggal)} (${deletingSesi?.durasi_menit} menit) akan dihapus. Lanjutkan?`}
      />
    </div>
  );
};
