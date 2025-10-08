import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, Card, Input, Button, Muted } from "../components/ui";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      await login(email, senha);
      nav("/admin", { replace: true });
    } catch {
      setErr("Falha ao entrar. Verifique suas credenciais.");
    }
  }

  return (
    <div style={{ height:"calc(100vh - 52px)", display: "flex", alignItems: "center", justifyContent: "Center", width: "100%" }}>
      <Container>
        <Title>Login (Professores)</Title>
        <Card as="form" onSubmit={onSubmit} style={{ display: "grid", gap: 10, width: "100%", padding: "30px", minWidth: 321 }}>
          <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
          {err && <Muted style={{ color: "#dc2626" }}>{err}</Muted>}
          <Button type="submit">Entrar</Button>
        </Card>
      </Container>
    </div>
  );
}
