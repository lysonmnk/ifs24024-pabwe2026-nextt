import React from 'react';
import { Outlet } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { APP_NAME } from '../../lib/config.js';

export const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-brand">
        <div className="brand-icon">
          <BookOpen size={24} />
        </div>
        <h1 className="brand-title">{APP_NAME}</h1>
        <p className="auth-brand-copy">
          Catat materi, rekam sesi belajar, dan pantau progres ngodingmu dalam satu aplikasi.
        </p>
      </div>
      <Outlet />
    </div>
  );
};
