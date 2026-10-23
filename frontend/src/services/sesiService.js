import { request } from './api.js';

export const getSesiListByMateriId = async (materiId) => {
  const res = await request(`/materi/${materiId}/sesi`);
  return res.data;
};

export const createSesi = async (materiId, payload) => {
  const res = await request(`/materi/${materiId}/sesi`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return res.data;
};

export const deleteSesi = async (id) => {
  const res = await request(`/sesi/${id}`, {
    method: 'DELETE'
  });
  return res;
};
