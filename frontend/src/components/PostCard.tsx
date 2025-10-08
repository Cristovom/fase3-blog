import type { Post } from "../types/post";
import { Link } from "react-router-dom";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-xl border bg-white p-4 shadow-sm hover:shadow">
      <h3 className="text-lg font-semibold">
        <Link to={`/post/${post._id}`}>{post.titulo}</Link>
      </h3>
      <p className="text-sm text-gray-600">Autor: {post.autor}</p>
      {post.descricao && <p className="mt-2 text-sm text-gray-800 line-clamp-2">{post.descricao}</p>}
    </article>
  );
}
