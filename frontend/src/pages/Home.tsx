import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import type { Post } from "../types/post";
import { Card, Container, Input, Muted, Title, Webbanner, EspacoLateral, TituloPrincipal, SubTituloPrincipal } from "../components/ui";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    api.get<Post[]>("/posts").then(r => setPosts(r.data)).catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return posts;
    return posts.filter(p =>
      [p.titulo, p.autor, p.descricao, p.conteudo].some(v => (v ?? "").toLowerCase().includes(t))
    );
  }, [q, posts]);

  return (
    <Container>
      <Webbanner>
        <TituloPrincipal>Blog</TituloPrincipal>
        <SubTituloPrincipal>Fique por dentro do que os professores compartilham</SubTituloPrincipal>
      </Webbanner>
      <EspacoLateral>
        <Title>Postagens</Title>
        <Input placeholder="Buscar por palavra-chave..." value={q} onChange={e => setQ(e.target.value)} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "20px 0px 30px"  }}>
          {filtered.map(p => (
            <Card key={p._id}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
                <Link
                  style={{
                    color: "#45666d",
                    textDecoration: "none",
                    fontWeight: 400,
                    fontSize: 20,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    lineClamp: 2,
                  }} to={`/post/${p._id}`}>{p.titulo}</Link>
              </h3>
              <Muted>Autor: {p.autor}</Muted>
              {p.conteudo && (
              <p
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  lineClamp: 2,
                  fontSize: 14
                }}
              >
                {p.conteudo}
              </p>
            )}
              <Link
                style={{
                  background: "#45666d",
                  color: "#fff",
                  borderRadius: 50,
                  fontWeight: 400,
                  fontSize: 16,
                  padding: "5px 20px",
                  display: "inline-block"
                }} to={`/post/${p._id}`}>{"Saiba mais"}
              </Link>
            </Card>
          ))}
        </div>
        {filtered.length === 0 && <Muted style={{ textAlign: "center", marginTop: 16 }}>Nenhum post encontrado.</Muted>}
      </EspacoLateral>
    </Container>
  );
}
