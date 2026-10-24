import React from 'react';
import { Plus } from 'lucide-react';
import { MateriCard } from './MateriCard.jsx';
import { Button } from '../../../components/common/Button.jsx';
import { EmptyState } from '../../../components/common/EmptyState.jsx';

export const MateriList = ({
  materiList = [],
  onEdit,
  onDelete,
  onAddNew,
  hasFilter = false
}) => {
  if (materiList.length === 0) {
    return (
      <EmptyState
        title="Tidak Ada Materi Belajar"
        message={
          hasFilter
            ? 'Tidak ditemukan materi yang cocok dengan pencarian atau filter.'
            : 'Belum ada materi belajar yang ditambahkan. Mulai dengan menambahkan materi pertamamu!'
        }
      >
        {!hasFilter && onAddNew && (
          <Button variant="primary" onClick={onAddNew}>
            <Plus size={16} /> Tambah Materi Sekarang
          </Button>
        )}
      </EmptyState>
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
