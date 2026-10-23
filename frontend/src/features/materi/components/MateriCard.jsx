import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ExternalLink, Edit2, Trash2, ChevronRight } from 'lucide-react';
import { formatDurasi, getStatusMeta } from '../../../utils/formatters.js';

export const MateriCard = ({ materi, onEdit, onDelete }) => {
  const statusMeta = getStatusMeta(materi.status);

  return (
    <div className="materi-card">
      <div className="materi-card-header">
        <span className={`status-badge ${statusMeta.badgeClass}`}>
          {statusMeta.label}
        </span>
        <div className="materi-actions">
          {onEdit && (
            <button
              type="button"
              className="btn-icon"
              onClick={() => onEdit(materi)}
              title="Ubah Materi"
              aria-label="Ubah Materi"
            >
              <Edit2 size={16} />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              className="btn-icon btn-icon-danger"
              onClick={() => onDelete(materi)}
              title="Hapus Materi"
              aria-label="Hapus Materi"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      <h3 className="materi-title">{materi.judul}</h3>

      {materi.sumber && (
        <div className="materi-source">
          <ExternalLink size={14} />
          <span>Sumber: {materi.sumber}</span>
        </div>
      )}

      <div className="materi-footer">
        <div className="materi-duration">
          <Clock size={16} />
          <span>{formatDurasi(materi.total_menit)}</span>
        </div>

        <Link to={`/materi/${materi.id}`} className="btn-detail">
          <span>Kelola Sesi</span>
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
};
