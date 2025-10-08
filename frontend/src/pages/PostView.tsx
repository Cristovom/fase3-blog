import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import type { Post } from "../types/post";
import { Container, LinkLike, WebbannerSingle, TituloPrincipal, BoxSingle, EspacoLateral } from "../components/ui";

export default function PostView() {
  const { id } = useParams();
  const nav = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!id) return;
    api.get<Post>(`/posts/${id}`).then(r => setPost(r.data)).catch(() => setErr("Não foi possível carregar o post."));
  }, [id]);

  if (err) return <Container><p>{err}</p></Container>;
  if (!post) return <Container><p>Carregando…</p></Container>;

  return (
    <Container>
      <WebbannerSingle>
        <TituloPrincipal>{post.titulo}</TituloPrincipal>
        <p style={{ position: "relative", zIndex: 9, color: "#fff" }}>Autor: {post.autor}</p>
      </WebbannerSingle>

      <EspacoLateral>
        <LinkLike onClick={() => (window.history.length > 1 ? nav(-1) : nav("/"))} style={{ width: "100%", textAlign: "right", color: "#000", margin:"20px 0 0" }}>← Voltar</LinkLike>
      </EspacoLateral>

      <BoxSingle>
        <article style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
          <p>{post.conteudo}</p>
        </article>
      </BoxSingle>
    </Container>
  );
}