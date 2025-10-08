import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, updatePost } from "../services/posts";
import { Container, PageHeader, Title, Input, Textarea, Button, Card, Row, LinkLike } from "../components/ui";

export default function PostEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [conteudo, setConteudo] = useState("");

  useEffect(() => {
    if (!id) return;
    getPost(id).then(d => { setTitulo(d.titulo); setAutor(d.autor); setConteudo(d.conteudo); });
  }, [id]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    await updatePost(id, { titulo, autor, conteudo });
    nav("/admin");
  }

  return (
    <Container style={{ minHeight: "calc(100vh - 52px)", margin: "0 auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <PageHeader style={{ width: "90%" }}>
        <Title>Editar Post</Title>
        <LinkLike onClick={() => (window.history.length > 1 ? nav(-1) : nav("/admin"))}>← Voltar</LinkLike>
      </PageHeader>

      <Card as="form" onSubmit={onSubmit} style={{ display: "grid", gap: 10, width: "90%" }}>
        <Input required value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título" />
        <Input required value={autor} onChange={e => setAutor(e.target.value)} placeholder="Autor" />
        <Textarea required value={conteudo} onChange={e => setConteudo(e.target.value)} placeholder="Conteúdo" />
        <Row>
          <Button type="submit">Salvar</Button>
          <Button type="button" variant="ghost" onClick={() => (window.history.length > 1 ? nav(-1) : nav("/admin"))}>
            Cancelar
          </Button>
        </Row>
      </Card>
    </Container>
  );
}
