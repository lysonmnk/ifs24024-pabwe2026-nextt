import React from 'react';
import { RegisterForm } from '../components/RegisterForm.jsx';

export const RegisterPage = () => {
  return (
    <div className="auth-card">
      <h1 className="auth-title">Buat akun</h1>
      <p className="auth-subtitle">Catat materi, rekam sesi, dan pantau progresmu</p>
      <RegisterForm />
    </div>
  );
};
