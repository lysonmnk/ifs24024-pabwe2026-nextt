import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { validateMateri } from '../utils/validators.js';

export const MateriModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [judul, setJudul] = useState('');
  const [sumber, setSumber] = useState('');
  const [status, setStatus] = useState('belum');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const isEdit = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setJudul(initialData.judul || '');
      setSumber(initialData.sumber || '');
      setStatus(initialData.status || 'belum');
    } else {
      setJudul('');
      setSumber('');
      setStatus('belum');
    }
    setErrors({});
    setServerError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validation = validateMateri({ judul, status, sumber });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        judul: judul.trim(),
        sumber: sumber.trim() || null,
        status
      });
      onClose();
    } catch (err) {
      setServerError(err.message || 'Terjadi kesalahan saat menyimpan materi');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-header">
          <h2 className="modal-title">
            {isEdit ? 'Ubah Materi Belajar' : 'Tambah Materi Belajar'}
          </h2>
          <button type="button" className="btn-icon" onClick={onClose} aria-label="Tutup">
            <X size={20} />
          </button>
        </div>

        {serverError && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="judul" className="form-label">
              Judul Materi <span className="text-danger">*</span>
            </label>
            <input
              id="judul"
              type="text"
              className={`form-input ${errors.judul ? 'input-error' : ''}`}
              placeholder="Contoh: Belajar React Hooks, Node.js REST API"
              value={judul}
              onChange={(e) => {
                setJudul(e.target.value);
                if (errors.judul) setErrors((prev) => ({ ...prev, judul: null }));
              }}
              autoFocus
            />
            {errors.judul && <p className="error-text">{errors.judul}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="sumber" className="form-label">
              Sumber Materi (Opsional)
            </label>
            <input
              id="sumber"
              type="text"
              className="form-input"
              placeholder="Contoh: SoloLearn, MDN Web Docs, YouTube"
              value={sumber}
              onChange={(e) => setSumber(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Status Belajar
            </label>
            <select
              id="status"
              className="form-input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="belum">Belum Mulai</option>
              <option value="sedang">Sedang Dipelajari</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Materi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
