import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Bar = styled.header`
  background: #F4E9D7;
  padding: 15px 20px;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
`;
const Wrap = styled.div`
  max-width: 960px; margin: 0 auto; display: flex; gap: 12px; align-items: center; justify-content: space-between;
`;
const Left = styled.nav `
  display: flex;
  align-items: center;
  gap: 10px; 
  
  a { 
    text-decoration: none;
    color: #000;

    &:first-child {
      font-size: 30px;
      line-height: 30px;
    }
  }
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  
  a { 
    text-decoration: none;
    color: #000;
    font-size: 16px;
    line-height: 16px;
  }
`;

export default function Navbar() {
  const { user, logout, token } = useAuth();
  const nav = useNavigate();
  return (
    <Bar>
      <Wrap>
        <Left>
          <Link to="/">Blog</Link>
        </Left>
        <Right>
          <Link to="/admin">Admin</Link>
          {token ? (
            <>
              <span>{user?.name ?? "Professor(a)"}</span>
              <button onClick={() => { logout(); nav("/"); }} style={{ borderRadius: 12, outline: "none", border: "none", padding: "7px 15px", background: "#dc2626", color: "#fff" }}>Sair</button>
            </>
          ) : (
            <Link to="/login">Entrar</Link>
          )}
        </Right>
      </Wrap>
    </Bar>
  );
}
