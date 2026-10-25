import React from 'react';
import { LoginForm } from '../components/LoginForm.jsx';

export const LoginPage = () => {
  return (
    <div className="auth-card">
      <h1 className="auth-title">Masuk</h1>
      <p className="auth-subtitle">Lanjutkan catatan belajar ngodingmu</p>
      <LoginForm />
    </div>
  );
};
