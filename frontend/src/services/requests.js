import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_PORT;

const api = axios.create({
  baseURL: BASE_URL,
});

export const requestGet = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestPost = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestPut = async (endpoint, body) => {
  const { data } = await api.put(endpoint, body);
  return data;
};

export const requestDelete = async (endpoint) => {
  const { data } = await api.delete(endpoint);
  return data;
};

export default api;
