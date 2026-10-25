import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi Hapus',
  message = 'Apakah Anda yakin ingin menghapus data ini?',
  confirmLabel = 'Hapus',
  isDanger = true,
  isLoading = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box modal-box-sm">
        <div className="modal-header">
          <div className="confirm-icon-title">
            <div className="confirm-icon">
              <AlertTriangle size={20} />
            </div>
            <h2 className="modal-title">{title}</h2>
          </div>
          <button
            type="button"
            className="btn-icon"
            onClick={onClose}
            aria-label="Tutup"
            disabled={isLoading}
          >
            <X size={18} />
          </button>
        </div>

        <p className="confirm-message">{message}</p>

        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Batal
          </button>
          <button
            type="button"
            className={`btn ${isDanger ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Menghapus...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
