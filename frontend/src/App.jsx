import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout.jsx';
import { AuthLayout } from './components/layout/AuthLayout.jsx';
import { ProtectedRoute } from './components/routing/ProtectedRoute.jsx';
import { GuestRoute } from './components/routing/GuestRoute.jsx';
import { Loading } from './components/common/Loading.jsx';

const MateriListPage = lazy(() =>
  import('./features/materi/pages/MateriListPage.jsx').then((m) => ({ default: m.MateriListPage }))
);
const MateriDetailPage = lazy(() =>
  import('./features/materi/pages/MateriDetailPage.jsx').then((m) => ({ default: m.MateriDetailPage }))
);
const LoginPage = lazy(() =>
  import('./features/auth/pages/LoginPage.jsx').then((m) => ({ default: m.LoginPage }))
);
const RegisterPage = lazy(() =>
  import('./features/auth/pages/RegisterPage.jsx').then((m) => ({ default: m.RegisterPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage.jsx').then((m) => ({ default: m.NotFoundPage }))
);

function App() {
  return (
    <Suspense fallback={<Loading message="Memuat..." />}>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<MateriListPage />} />
            <Route path="/dashboard" element={<MateriListPage />} />
            <Route path="/materi" element={<MateriListPage />} />
            <Route path="/materi/:id" element={<MateriDetailPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
