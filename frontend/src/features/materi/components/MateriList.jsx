import React from 'react';
import { Plus } from 'lucide-react';
import { MateriCard } from './MateriCard.jsx';
import { Button } from '../../../components/common/Button.jsx';

export const MateriList = ({
  materiList = [],
  onEdit,
  onDelete,
  onAddNew,
  hasFilter = false
}) => {
  if (materiList.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📚</div>
        <h3>Tidak Ada Materi Belajar</h3>
        <p>
          {hasFilter
            ? 'Tidak ditemukan materi yang cocok dengan pencarian atau filter.'
            : 'Belum ada materi belajar yang ditambahkan. Mulai dengan menambahkan materi pertamamu!'}
        </p>
        {!hasFilter && onAddNew && (
          <Button variant="primary" onClick={onAddNew}>
            <Plus size={16} /> Tambah Materi Sekarang
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="materi-grid">
      {materiList.map((materi) => (
        <MateriCard
          key={materi.id}
          materi={materi}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
