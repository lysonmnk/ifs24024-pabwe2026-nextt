import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button.jsx';

/**
 * Global Error Boundary Component.
 * Menangkap runtime error yang tidak tertangani di pohon komponen React,
 * mencatat stack trace error, dan menampilkan fallback UI yang ramah pengguna
 * agar seluruh aplikasi tidak mengalami blank page / crash.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Terjadi kesalahan tak terduga pada antarmuka:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-red-100 dark:bg-red-950/60 text-red-600 rounded-full flex items-center justify-center">
              <AlertTriangle size={28} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Terjadi Kesalahan pada Aplikasi
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Mohon maaf, terjadi kendala saat memuat antarmuka. Silakan coba muat ulang halaman.
            </p>
            <Button
              variant="primary"
              onClick={this.handleReload}
              className="w-full justify-center"
            >
              <RefreshCw size={16} />
              <span>Muat Ulang Halaman</span>
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
