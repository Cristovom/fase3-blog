import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Post } from "../types/post";
import { deletePost, listPosts } from "../services/posts";
import { Container, Title, Button, Table, EspacoLateral } from "../components/ui";

export default function Admin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const load = () => listPosts().then(setPosts);
  useEffect(() => { load(); }, []);

  async function excluir(id: string) {
    if (!confirm("Excluir este post?")) return;
    await deletePost(id);
    load();
  }

  return (
    <Container style={{ minHeight: "calc(100vh - 52px)", margin: "0 auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <EspacoLateral style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 60, padding: "30px 20px 0" }}>
        <Title>Admin</Title>
        <Link to="/posts/novo"><Button variant="success">Novo Post</Button></Link>
      </EspacoLateral>

      <EspacoLateral style={{ padding: '10px 0 50px' }}>
        <Table>
          <thead>
            <tr><th>Título</th><th>Autor</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p._id}>
                <td>{p.titulo}</td>
                <td>{p.autor}</td>
                <td style={{ display: "flex", gap: 8 }}>
                  <Link to={`/posts/${p._id}/editar`}><Button>Editar</Button></Link>
                  <Button variant="danger" onClick={() => excluir(p._id)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </EspacoLateral>

      {posts.length === 0 && <p style={{ marginTop: 16 }}>Nenhum post ainda.</p>}
    </Container>
  );
}
