import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, LogOut } from 'lucide-react';
import { APP_NAME } from '../../lib/config.js';
import { useAuth } from '../../features/auth/hooks/useAuth.js';
import { Button } from '../common/Button.jsx';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="brand-title">{APP_NAME}</h1>
            <p className="navbar-subtitle">Catatan Materi & Sesi Belajar Pemrograman</p>
          </div>
        </Link>

        {isAuthenticated && (
          <div className="navbar-user">
            <div className="student-info">
              <span className="student-name">{user.nama}</span>
              <span className="student-nim">{user.email}</span>
            </div>
            <Button variant="secondary" onClick={logout} aria-label="Keluar">
              <LogOut size={16} />
              <span>Keluar</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
