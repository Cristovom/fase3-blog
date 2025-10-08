import { api } from "./api";
import type { Post } from "../types/post";

export const listPosts = () => api.get<Post[]>("/posts").then(r => r.data);
export const getPost  = (id: string) => api.get<Post>(`/posts/${id}`).then(r => r.data);
export const createPost = (payload: Pick<Post, "titulo"|"conteudo"|"autor">) =>
  api.post<Post>("/posts", payload).then(r => r.data);
export const updatePost = (id: string, payload: Pick<Post, "titulo"|"conteudo"|"autor">) =>
  api.put<Post>(`/posts/${id}`, payload).then(r => r.data);
export const deletePost = (id: string) => api.delete(`/posts/${id}`);
