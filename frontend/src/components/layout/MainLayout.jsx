import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';
import { APP_NAME, STUDENT_NAME, STUDENT_NIM } from '../../lib/config.js';

export const MainLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">{children || <Outlet />}</main>
      <footer className="footer-container">
        <p>
          &copy; 2026 <strong>{APP_NAME}</strong> &bull; Proyek 1 PABWE &bull;{' '}
          <strong>
            {STUDENT_NAME} ({STUDENT_NIM})
          </strong>
        </p>
      </footer>
    </div>
  );
};
