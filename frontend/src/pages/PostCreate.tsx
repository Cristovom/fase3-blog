import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/posts";
import { Container, PageHeader, Title, Input, Textarea, Button, Card, LinkLike } from "../components/ui";

export default function PostCreate() {
  const nav = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [conteudo, setConteudo] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createPost({ titulo, autor, conteudo });
    nav("/admin");
  }

  return (
    <Container style={{ minHeight: "calc(100vh - 52px)", margin: "0 auto", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <PageHeader style={{ width: "90%" }}>
        <Title>Novo Post</Title>
        <LinkLike onClick={() => (window.history.length > 1 ? nav(-1) : nav("/admin"))}>← Voltar</LinkLike>
      </PageHeader>
      <Card as="form" onSubmit={onSubmit} style={{ display: "grid", gap: 10, width: "90%" }}>
        <Input required placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
        <Input required placeholder="Autor" value={autor} onChange={e => setAutor(e.target.value)} />
        <Textarea required placeholder="Conteúdo" value={conteudo} onChange={e => setConteudo(e.target.value)} />
        <Button type="submit">Publicar</Button>
      </Card>
    </Container>
  );
}
