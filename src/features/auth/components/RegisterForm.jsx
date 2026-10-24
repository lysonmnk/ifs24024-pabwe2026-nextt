import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInput } from '../../../hooks/useInput.js';
import { validateRegister } from '../../../utils/validators.js';
import { Button } from '../../../components/common/Button.jsx';
import { useAuth } from '../hooks/useAuth.js';

export const RegisterForm = () => {
  const nama = useInput('');
  const email = useInput('');
  const password = useInput('');
  const { register } = useAuth();
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validation = validateRegister({
      nama: nama.value,
      email: email.value,
      password: password.value
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        nama: nama.value.trim(),
        email: email.value.trim(),
        password: password.value
      });
    } catch (err) {
      setServerError(err.message || 'Registrasi gagal');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {serverError && (
        <div className="alert alert-error" role="alert">
          {serverError}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="register-nama" className="form-label">
          Nama lengkap
        </label>
        <input
          id="register-nama"
          name="nama"
          type="text"
          className={`form-input ${errors.nama ? 'input-error' : ''}`}
          placeholder="Nama lengkap"
          {...nama.bind}
        />
        {errors.nama && <p className="error-text">{errors.nama}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="register-email" className="form-label">
          Email
        </label>
        <input
          id="register-email"
          name="email"
          type="email"
          className={`form-input ${errors.email ? 'input-error' : ''}`}
          placeholder="nama@email.com"
          {...email.bind}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="register-password" className="form-label">
          Kata sandi
        </label>
        <input
          id="register-password"
          name="password"
          type="password"
          className={`form-input ${errors.password ? 'input-error' : ''}`}
          placeholder="Minimal 8 karakter"
          {...password.bind}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
      </div>

      <Button type="submit" variant="primary" disabled={isSubmitting} className="auth-submit">
        {isSubmitting ? 'Mendaftar...' : 'Daftar'}
      </Button>

      <p className="auth-switch">
        Sudah punya akun? <Link to="/login">Masuk</Link>
      </p>
    </form>
  );
};
