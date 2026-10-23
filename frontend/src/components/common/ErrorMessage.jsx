import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ErrorMessage = ({ message, onRetry }) => {
  if (!message) return null;

  return (
    <div className="alert alert-error" role="alert">
      <AlertCircle size={20} />
      <div className="alert-content">
        <strong>Terjadi Kesalahan:</strong> {message}
      </div>
      {onRetry && (
        <button type="button" className="btn-link" onClick={onRetry}>
          Coba Lagi
        </button>
      )}
    </div>
  );
};
