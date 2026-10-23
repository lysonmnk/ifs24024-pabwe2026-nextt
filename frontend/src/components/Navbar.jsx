import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="brand-title">HyperLink</h1>
            <p className="brand-subtitle">Catatan Materi & Sesi Belajar</p>
          </div>
        </Link>
        <div className="student-badge">
          <GraduationCap size={18} className="student-icon" />
          <div className="student-info">
            <span className="student-name">Lyson Paulus Esar Manik</span>
            <span className="student-nim">11S24024 &bull; PABWE 2026</span>
          </div>
        </div>
      </div>
    </header>
  );
};
