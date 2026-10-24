import { apiClient } from '../../../helpers/apiClient.js';

export const getSesiListByMateriId = async (materiId) => {
  const res = await apiClient(`/materi/${materiId}/sesi`);
  return res.data;
};

export const createSesi = async (materiId, payload) => {
  const res = await apiClient(`/materi/${materiId}/sesi`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return res.data;
};

export const deleteSesi = async (id) => {
  const res = await apiClient(`/sesi/${id}`, {
    method: 'DELETE'
  });
  return res;
};
