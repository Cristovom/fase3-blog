import { api } from './api';

export type Post = {
  _id: string;
  titulo: string;
  conteudo: string;
  autor: string;
};

export async function getPosts(search?: string) {
  if (search) {
    const res = await api.get(`/posts/search?q=${search}`);
    return res.data;
  }

  const res = await api.get('/posts');
  return res.data;
}

export async function getPostById(id: string) {
  const res = await api.get(`/posts/${id}`);
  return res.data;
}

export async function createPost(payload: {
  titulo: string;
  conteudo: string;
  autor: string;
}) {
  const res = await api.post('/posts', payload);
  return res.data;
}

export async function updatePost(
  id: string,
  payload: { titulo: string; conteudo: string; autor: string }
) {
  const res = await api.put(`/posts/${id}`, payload);
  return res.data;
}

export async function deletePost(id: string) {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
}
