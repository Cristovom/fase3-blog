import { api } from './api';

export type User = {
  _id: string;
  name: string;
  email: string;
  role: 'teacher' | 'student';
};

export async function getUsers(role: 'teacher' | 'student') {
  const res = await api.get(`/users?role=${role}`);
  return res.data;
}

export async function createUser(payload: {
  name: string;
  email: string;
  role: 'teacher' | 'student';
}) {
  const res = await api.post('/users', payload);
  return res.data;
}

export async function updateUser(
  id: string,
  payload: { name: string; email: string; role: 'teacher' | 'student' }
) {
  const res = await api.put(`/users/${id}`, payload);
  return res.data;
}

export async function deleteUser(id: string) {
  const res = await api.delete(`/users/${id}`);
  return res.data;
}
