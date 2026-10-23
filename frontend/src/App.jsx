import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout.jsx';
import { MateriListPage } from './features/materi/pages/MateriListPage.jsx';
import { MateriDetailPage } from './features/materi/pages/MateriDetailPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<MateriListPage />} />
        <Route path="/materi/:id" element={<MateriDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
