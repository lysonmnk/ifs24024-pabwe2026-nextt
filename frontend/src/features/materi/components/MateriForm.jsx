import React, { useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { validateMateri } from '../../../utils/validators.js';
import { useForm } from '../../../hooks/useForm.js';
import { Button } from '../../../components/common/Button.jsx';

export const MateriForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null
}) => {
  const isEdit = Boolean(initialData);

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
      judul: initialData?.judul || '',
      sumber: initialData?.sumber || '',
      status: initialData?.status || 'belum'
    },
    validate: validateMateri,
    onSubmit: async (formValues) => {
      await onSubmit({
        judul: formValues.judul.trim(),
        sumber: formValues.sumber ? formValues.sumber.trim() : null,
        status: formValues.status
      });
      onClose();
    }
  });

  useEffect(() => {
    if (isOpen) {
      resetForm({
        judul: initialData?.judul || '',
        sumber: initialData?.sumber || '',
        status: initialData?.status || 'belum'
      });
    }
  }, [initialData, isOpen, resetForm]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-box">
        <div className="modal-header">
          <h2 className="modal-title">
            {isEdit ? 'Ubah Materi Belajar' : 'Tambah Materi Belajar'}
          </h2>
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
            <label htmlFor="materi-judul" className="form-label">
              Judul Materi <span className="text-danger">*</span>
            </label>
            <input
              id="materi-judul"
              name="judul"
              type="text"
              className={`form-input ${errors.judul ? 'input-error' : ''}`}
              placeholder="Contoh: Belajar React Hooks, Node.js REST API"
              value={values.judul}
              onChange={handleChange}
            />
            {errors.judul && <p className="error-text">{errors.judul}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="materi-sumber" className="form-label">
              Sumber Materi (Opsional)
            </label>
            <input
              id="materi-sumber"
              name="sumber"
              type="text"
              className="form-input"
              placeholder="Contoh: SoloLearn, MDN Web Docs, YouTube"
              value={values.sumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="materi-status" className="form-label">
              Status Belajar
            </label>
            <select
              id="materi-status"
              name="status"
              className="form-input"
              value={values.status}
              onChange={handleChange}
            >
              <option value="belum">Belum Mulai</option>
              <option value="sedang">Sedang Dipelajari</option>
              <option value="selesai">Selesai</option>
            </select>
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
              {isSubmitting
                ? 'Menyimpan...'
                : isEdit
                  ? 'Simpan Perubahan'
                  : 'Tambah Materi'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
