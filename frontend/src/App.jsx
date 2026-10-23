import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar.jsx';
import { MateriListPage } from './pages/MateriListPage.jsx';
import { MateriDetailPage } from './pages/MateriDetailPage.jsx';

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<MateriListPage />} />
          <Route path="/materi/:id" element={<MateriDetailPage />} />
          <Route
            path="*"
            element={
              <div className="page-container text-center py-12">
                <h2>Halaman Tidak Ditemukan (404)</h2>
                <p className="mt-2 text-muted">
                  Halaman yang Anda tuju tidak tersedia.
                </p>
                <a href="/" className="btn btn-primary mt-4 inline-block">
                  Kembali ke Beranda
                </a>
              </div>
            }
          />
        </Routes>
      </main>
      <footer className="footer-container">
        <p>
          &copy; 2026 <strong>HyperLink</strong> &bull; Proyek 1 PABWE &bull;{' '}
          <strong>Lyson Paulus Esar Manik (11S24024)</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;
