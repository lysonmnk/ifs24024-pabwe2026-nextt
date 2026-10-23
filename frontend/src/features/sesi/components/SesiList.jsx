import React from 'react';
import { Calendar, Clock, Trash2 } from 'lucide-react';
import { formatTanggal } from '../../../utils/formatters.js';

export const SesiList = ({ sesiList = [], onDelete }) => {
  if (sesiList.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⏱️</div>
        <h3>Belum Ada Sesi Belajar</h3>
        <p>
          Materi ini belum memiliki catatan sesi. Mulai mencatat sesi belajarmu sekarang!
        </p>
      </div>
    );
  }

  return (
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

          {onDelete && (
            <div className="session-actions">
              <button
                type="button"
                className="btn-icon btn-icon-danger"
                onClick={() => onDelete(sesi)}
                title="Hapus Sesi"
                aria-label="Hapus Sesi"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
