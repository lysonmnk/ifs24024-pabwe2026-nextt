import React, { useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { validateSesi } from '../../../utils/validators.js';
import { useForm } from '../../../hooks/useForm.js';
import { Button } from '../../../components/common/Button.jsx';

export const SesiForm = ({
  isOpen,
  onClose,
  onSubmit,
  materiJudul = ''
}) => {
  const getTodayString = () => new Date().toISOString().split('T')[0];

  const {
    values,
    errors,
    serverError,
    isSubmitting,
    handleChange,
    resetForm,
    handleSubmit
  } = useForm({
    initialValues: {
      tanggal: getTodayString(),
      durasi_menit: '',
      catatan: ''
    },
    validate: validateSesi,
    onSubmit: async (formValues) => {
      await onSubmit({
        tanggal: formValues.tanggal,
        durasi_menit: parseInt(formValues.durasi_menit, 10),
        catatan: formValues.catatan ? formValues.catatan.trim() : null
      });
      onClose();
    }
  });

  useEffect(() => {
    if (isOpen) {
      resetForm({
        tanggal: getTodayString(),
        durasi_menit: '',
        catatan: ''
      });
    }
  }, [isOpen, resetForm]);

  if (!isOpen) return null;

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

        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          <div className="form-group">
            <label htmlFor="sesi-tanggal" className="form-label">
              Tanggal Belajar <span className="text-danger">*</span>
            </label>
            <input
              id="sesi-tanggal"
              name="tanggal"
              type="date"
              className={`form-input ${errors.tanggal ? 'input-error' : ''}`}
              value={values.tanggal}
              onChange={handleChange}
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
              placeholder="Contoh: 45"
              value={values.durasi_menit}
              onChange={handleChange}
            />
            {errors.durasi_menit && (
              <p className="error-text">{errors.durasi_menit}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="sesi-catatan" className="form-label">
              Catatan Belajar (Opsional)
            </label>
            <textarea
              id="sesi-catatan"
              name="catatan"
              rows={3}
              className="form-input form-textarea"
              placeholder="Apa saja yang dipelajari pada sesi ini? Contoh: Paham cara kerja useEffect dependency array."
              value={values.catatan}
              onChange={handleChange}
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
