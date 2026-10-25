import React from 'react';

export const EmptyState = ({ icon = '📚', title, message, children }) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      {title && <h2>{title}</h2>}
      {message && <p>{message}</p>}
      {children}
    </div>
  );
};
