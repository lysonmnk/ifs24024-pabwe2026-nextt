import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout.jsx';
import { AuthLayout } from './components/layout/AuthLayout.jsx';
import { ProtectedRoute } from './components/routing/ProtectedRoute.jsx';
import { GuestRoute } from './components/routing/GuestRoute.jsx';
import { Loading } from './components/common/Loading.jsx';
import { ErrorBoundary } from './components/common/ErrorBoundary.jsx';

/**
 * Optimasi Lazy Loading (Code Splitting) menggunakan React.lazy().
 * Memecah bundle halaman menjadi chunk terpisah agar browser hanya mengunduh kode
 * saat rute halaman tersebut benar-benar dikunjungi oleh pengguna,
 * sehingga mempercepat initial load time (FCP/LCP).
 */
const LoginPage = lazy(() =>
  import('./features/auth/pages/LoginPage.jsx').then((m) => ({ default: m.LoginPage }))
);
const RegisterPage = lazy(() =>
  import('./features/auth/pages/RegisterPage.jsx').then((m) => ({ default: m.RegisterPage }))
);
const MateriListPage = lazy(() =>
  import('./features/materi/pages/MateriListPage.jsx').then((m) => ({ default: m.MateriListPage }))
);
const MateriDetailPage = lazy(() =>
  import('./features/materi/pages/MateriDetailPage.jsx').then((m) => ({ default: m.MateriDetailPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage.jsx').then((m) => ({ default: m.NotFoundPage }))
);

/**
 * Root Application Component.
 * Dilengkapi dengan ErrorBoundary global dan Suspense fallback untuk ketahanan antarmuka.
 */
function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading message="Memuat halaman..." />}>
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
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
