import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout.jsx';
import { AuthLayout } from './components/layout/AuthLayout.jsx';
import { ProtectedRoute } from './components/routing/ProtectedRoute.jsx';
import { GuestRoute } from './components/routing/GuestRoute.jsx';
import { MateriListPage } from './features/materi/pages/MateriListPage.jsx';
import { MateriDetailPage } from './features/materi/pages/MateriDetailPage.jsx';
import { LoginPage } from './features/auth/pages/LoginPage.jsx';
import { RegisterPage } from './features/auth/pages/RegisterPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';

function App() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MateriListPage />} />
          <Route path="/materi/:id" element={<MateriDetailPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
