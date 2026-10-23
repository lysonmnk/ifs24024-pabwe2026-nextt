import { apiClient } from '../../../helpers/apiClient.js';

export const getMateriList = async () => {
  const res = await apiClient('/materi');
  return res.data;
};

export const getMateriDetail = async (id) => {
  const res = await apiClient(`/materi/${id}`);
  return res.data;
};

export const createMateri = async (payload) => {
  const res = await apiClient('/materi', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return res.data;
};

export const updateMateri = async (id, payload) => {
  const res = await apiClient(`/materi/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
  return res.data;
};

export const deleteMateri = async (id) => {
  const res = await apiClient(`/materi/${id}`, {
    method: 'DELETE'
  });
  return res;
};
