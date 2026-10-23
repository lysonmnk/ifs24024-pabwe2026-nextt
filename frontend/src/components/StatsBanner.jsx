import React from 'react';
import { BookMarked, CheckCircle2, Clock, Flame } from 'lucide-react';
import { formatDurasi } from '../utils/formatters.js';

export const StatsBanner = ({ materiList = [] }) => {
  const totalMateri = materiList.length;
  const selesaiCount = materiList.filter((m) => m.status === 'selesai').length;
  const sedangCount = materiList.filter((m) => m.status === 'sedang').length;
  const totalMenitSemua = materiList.reduce(
    (acc, cur) => acc + (Number(cur.total_menit) || 0),
    0
  );

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon icon-blue">
          <BookMarked size={22} />
        </div>
        <div>
          <div className="stat-value">{totalMateri}</div>
          <div className="stat-label">Total Materi</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-amber">
          <Flame size={22} />
        </div>
        <div>
          <div className="stat-value">{sedangCount}</div>
          <div className="stat-label">Sedang Dipelajari</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-emerald">
          <CheckCircle2 size={22} />
        </div>
        <div>
          <div className="stat-value">{selesaiCount}</div>
          <div className="stat-label">Materi Selesai</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-purple">
          <Clock size={22} />
        </div>
        <div>
          <div className="stat-value">{formatDurasi(totalMenitSemua)}</div>
          <div className="stat-label">Total Waktu Belajar</div>
        </div>
      </div>
    </div>
  );
};
