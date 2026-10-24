import React from 'react';

export const Loading = ({ message = 'Memuat data...' }) => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
};
