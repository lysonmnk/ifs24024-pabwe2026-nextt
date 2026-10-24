import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook untuk mengelola state form, validasi, dan pengiriman data (submit).
 * Memisahkan tanggung jawab (separation of concern) antara logika form dan presentasi UI.
 *
 * @param {Object} options
 * @param {Object} options.initialValues - Nilai awal untuk input form
 * @param {Function} [options.validate] - Fungsi validasi yang mengembalikan { isValid, errors }
 * @param {Function} options.onSubmit - Fungsi async callback yang dipanggil saat submit valid
 */
export const useForm = ({ initialValues = {}, validate, onSubmit } = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const initialValuesRef = useRef(initialValues);
  const validateRef = useRef(validate);
  const onSubmitRef = useRef(onSubmit);

  useEffect(() => {
    initialValuesRef.current = initialValues;
  }, [initialValues]);

  useEffect(() => {
    validateRef.current = validate;
  }, [validate]);

  useEffect(() => {
    onSubmitRef.current = onSubmit;
  }, [onSubmit]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: fieldValue
    }));

    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      if (name === 'durasiMenit') delete updated.durasi_menit;
      if (name === 'durasi_menit') delete updated.durasiMenit;
      return updated;
    });
  }, []);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      if (name === 'durasiMenit') delete updated.durasi_menit;
      if (name === 'durasi_menit') delete updated.durasiMenit;
      return updated;
    });
  }, []);

  const resetForm = useCallback((nextValues) => {
    setValues(nextValues !== undefined ? nextValues : initialValuesRef.current);
    setErrors({});
    setServerError('');
    setIsSubmitting(false);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    setServerError('');

    if (validateRef.current) {
      const validation = validateRef.current(values);
      if (!validation.isValid) {
        setErrors(validation.errors || {});
        return false;
      }
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      if (onSubmitRef.current) {
        await onSubmitRef.current(values);
      }
      return true;
    } catch (err) {
      setServerError(err.message || 'Terjadi kesalahan saat memproses data');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [values]);

  return {
    values,
    setValues,
    setFieldValue,
    handleChange,
    errors,
    setErrors,
    serverError,
    setServerError,
    isSubmitting,
    resetForm,
    handleSubmit
  };
};
