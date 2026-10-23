import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap } from 'lucide-react';
import { APP_NAME, STUDENT_NAME, STUDENT_NIM } from '../../lib/config.js';

export const Navbar = () => {
  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="brand-title">{APP_NAME}</h1>
            <p className="brand-subtitle">Catatan Materi & Sesi Belajar Pemrograman</p>
          </div>
        </Link>
        <div className="student-badge">
          <GraduationCap size={18} className="student-icon" />
          <div className="student-info">
            <span className="student-name">{STUDENT_NAME}</span>
            <span className="student-nim">{STUDENT_NIM} &bull; PABWE 2026</span>
          </div>
        </div>
      </div>
    </header>
  );
};
