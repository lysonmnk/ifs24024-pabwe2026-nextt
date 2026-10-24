import React from 'react';
import { Search } from 'lucide-react';

const STATUS_TABS = [
  { id: 'semua', label: 'Semua' },
  { id: 'belum', label: 'Belum Mulai' },
  { id: 'sedang', label: 'Sedang Belajar' },
  { id: 'selesai', label: 'Selesai' }
];

export const MateriFilter = ({ search, onSearchChange, statusFilter, onStatusChange }) => {
  return (
    <div className="filter-bar">
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Cari judul materi atau sumber..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="status-tabs">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab-btn ${statusFilter === tab.id ? 'tab-btn-active' : ''}`}
            onClick={() => onStatusChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
