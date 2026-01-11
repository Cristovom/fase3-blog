import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.0.106:3000',
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}
