import React from 'react';
import { APP_NAME } from '../../lib/config.js';

export const Loading = ({ message = 'Memuat data...' }) => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <h1 className="brand-title" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
        {APP_NAME}
      </h1>
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
};
