import { useState, useEffect, useCallback } from 'react';
import * as materiService from '../services/materiService.js';

export const useMateri = () => {
  const [materiList, setMateriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMateri = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await materiService.getMateriList();
      setMateriList(data || []);
    } catch (err) {
      setError(err.message || 'Gagal memuat daftar materi');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMateri();
  }, [fetchMateri]);

  const addMateri = async (payload) => {
    const created = await materiService.createMateri(payload);
    setMateriList((prev) => [created, ...prev]);
    return created;
  };

  const updateMateri = async (id, payload) => {
    const updated = await materiService.updateMateri(id, payload);
    setMateriList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    return updated;
  };

  const deleteMateri = async (id) => {
    await materiService.deleteMateri(id);
    setMateriList((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    materiList,
    loading,
    error,
    refresh: fetchMateri,
    addMateri,
    updateMateri,
    deleteMateri
  };
};
