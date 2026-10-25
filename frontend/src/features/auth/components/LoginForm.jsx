import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInput } from '../../../hooks/useInput.js';
import { validateLogin } from '../../../utils/validators.js';
import { Button } from '../../../components/common/Button.jsx';
import { useAuth } from '../hooks/useAuth.js';

export const LoginForm = () => {
  const email = useInput('');
  const password = useInput('');
  const { login } = useAuth();
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validation = validateLogin({
      email: email.value,
      password: password.value
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await login({
        email: email.value.trim(),
        password: password.value
      });
    } catch (err) {
      setServerError(err.message || 'Email atau kata sandi salah');
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
        <label htmlFor="username" className="form-label">
          Email / Username
        </label>
        <input
          id="username"
          name="email"
          type="text"
          className={`form-input ${errors.email ? 'input-error' : ''}`}
          placeholder="nama@email.com"
          {...email.bind}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Kata sandi
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={`form-input ${errors.password ? 'input-error' : ''}`}
          placeholder="Minimal 8 karakter"
          {...password.bind}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
      </div>

      <Button
        id="btn-submit"
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className="auth-submit"
      >
        {isSubmitting ? 'Masuk...' : 'Masuk'}
      </Button>

      <p className="auth-switch">
        Belum punya akun? <Link to="/register">Daftar sekarang</Link>
      </p>
    </form>
  );
};
