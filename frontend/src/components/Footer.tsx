import styled from "styled-components";
import { Link } from "react-router-dom";

const Bar = styled.footer`
  background: #000;
  padding: 15px 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Wrap = styled.div`
  max-width: 960px; margin: 0 auto; display: flex; gap: 12px; align-items: center; justify-content: space-between;
`;
const Left = styled.nav `  
  a { 
    text-decoration: none;
    color: #F4E9D7;

    &:first-child {
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

export default function Footer() {
  return (
    <Bar>
      <Wrap>
        <Left>
          <Link to="/">Todos os direitos reservados ©</Link>
        </Left>
      </Wrap>
    </Bar>
  );
}
