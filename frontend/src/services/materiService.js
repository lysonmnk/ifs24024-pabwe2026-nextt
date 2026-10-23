import { request } from './api.js';

export const getMateriList = async () => {
  const res = await request('/materi');
  return res.data;
};

export const getMateriDetail = async (id) => {
  const res = await request(`/materi/${id}`);
  return res.data;
};

export const createMateri = async (payload) => {
  const res = await request('/materi', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return res.data;
};

export const updateMateri = async (id, payload) => {
  const res = await request(`/materi/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
  return res.data;
};

export const deleteMateri = async (id) => {
  const res = await request(`/materi/${id}`, {
    method: 'DELETE'
  });
  return res;
};
