import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { validateSesi } from '../../../utils/validators.js';
import { Button } from '../../../components/common/Button.jsx';

export const SesiForm = ({
  isOpen,
  onClose,
  onSubmit,
  materiJudul = ''
}) => {
  const getTodayString = () => new Date().toISOString().split('T')[0];

  const [tanggal, setTanggal] = useState(getTodayString());
  const [durasiMenit, setDurasiMenit] = useState('');
  const [catatan, setCatatan] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTanggal(getTodayString());
      setDurasiMenit('');
      setCatatan('');
      setErrors({});
      setServerError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validation = validateSesi({
      tanggal,
      durasi_menit: durasiMenit
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        tanggal,
        durasi_menit: parseInt(durasiMenit, 10),
        catatan: catatan.trim() || null
      });
      onClose();
    } catch (err) {
      setServerError(err.message || 'Terjadi kesalahan saat menambahkan sesi');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Catat Sesi Belajar</h2>
            {materiJudul && (
              <p className="modal-subtitle">
                Untuk materi: <strong>{materiJudul}</strong>
              </p>
            )}
          </div>
          <button
            type="button"
            className="btn-icon"
            onClick={onClose}
            aria-label="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        {serverError && (
          <div className="alert alert-error" role="alert">
            <AlertCircle size={18} />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="sesi-tanggal" className="form-label">
              Tanggal Belajar <span className="text-danger">*</span>
            </label>
            <input
              id="sesi-tanggal"
              name="tanggal"
              type="date"
              className={`form-input ${errors.tanggal ? 'input-error' : ''}`}
              value={tanggal}
              onChange={(e) => {
                setTanggal(e.target.value);
                if (errors.tanggal) setErrors((prev) => ({ ...prev, tanggal: null }));
              }}
            />
            {errors.tanggal && <p className="error-text">{errors.tanggal}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="sesi-durasi" className="form-label">
              Durasi (dalam menit) <span className="text-danger">*</span>
            </label>
            <input
              id="sesi-durasi"
              name="durasi_menit"
              type="number"
              min="1"
              step="1"
              className={`form-input ${errors.durasi_menit ? 'input-error' : ''}`}
              placeholder="Contoh: 45 (menit)"
              value={durasiMenit}
              onChange={(e) => {
                setDurasiMenit(e.target.value);
                if (errors.durasi_menit)
                  setErrors((prev) => ({ ...prev, durasi_menit: null }));
              }}
            />
            {errors.durasi_menit && (
              <p className="error-text">{errors.durasi_menit}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="sesi-catatan" className="form-label">
              Catatan Sesi (Opsional)
            </label>
            <textarea
              id="sesi-catatan"
              name="catatan"
              rows="3"
              className="form-input form-textarea"
              placeholder="Contoh: Mempelajari cara kerja custom hooks dan lifecycle"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan Sesi'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
