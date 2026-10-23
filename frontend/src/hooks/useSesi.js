import { useState, useEffect, useCallback } from 'react';
import * as sesiService from '../services/sesiService.js';

export const useSesi = (materiId) => {
  const [sesiList, setSesiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSesi = useCallback(async () => {
    if (!materiId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await sesiService.getSesiListByMateriId(materiId);
      setSesiList(data);
    } catch (err) {
      setError(err.message || 'Gagal memuat sesi belajar');
    } finally {
      setLoading(false);
    }
  }, [materiId]);

  useEffect(() => {
    fetchSesi();
  }, [fetchSesi]);

  const addSesi = async (payload) => {
    const created = await sesiService.createSesi(materiId, payload);
    setSesiList((prev) => [created, ...prev]);
    return created;
  };

  const deleteSesi = async (id) => {
    await sesiService.deleteSesi(id);
    setSesiList((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    sesiList,
    loading,
    error,
    refresh: fetchSesi,
    addSesi,
    deleteSesi
  };
};
