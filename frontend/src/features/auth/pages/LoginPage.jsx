import React from 'react';
import { LoginForm } from '../components/LoginForm.jsx';

export const LoginPage = () => {
  return (
    <div className="auth-card">
      <h2 className="auth-title">Masuk</h2>
      <p className="auth-subtitle">Lanjutkan catatan belajar ngodingmu</p>
      <LoginForm />
    </div>
  );
};
