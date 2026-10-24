import { apiClient } from '../../../helpers/apiClient.js';

export const register = async (payload) => {
  const res = await apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return res.data;
};

export const login = async (payload) => {
  const res = await apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return res.data;
};

export const getMe = async () => {
  const res = await apiClient('/auth/me');
  return res.data;
};
