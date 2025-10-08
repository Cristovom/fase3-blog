import styled, { css } from "styled-components";
import webbanner from "../assets/img/webbanner-blog.jpg";
import webbannerSingle from "../assets/img/webbanner-single-min.jpg";

export const Webbanner = styled.section`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 10px;
  background: url(${webbanner}) no-repeat top;
  background-size: cover;
  min-height: 300px;
  position: relative;
  color: white;
  margin-top: 60px;

  &::after {
    content: "";
    position: absolute;
    inset:0;
    background: linear-gradient(to bottom, #00000080 60%, transparent);
    pointer-events: none;
  }

  @media(min-width: 1280px) {
    min-height: 500px;
  }
`;

export const WebbannerSingle = styled.section`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 10px;
  background: url(${webbannerSingle}) no-repeat top;
  background-size: cover;
  min-height: 300px;
  position: relative;
  color: white;
  margin-top: 60px;

  &::after {
    content: "";
    position: absolute;
    inset:0;
    background: linear-gradient(to bottom, #00000080 60%, transparent);
    pointer-events: none;
  }

  @media(min-width: 1280px) {
    min-height: 500px;
    background-position: 0px -130px;
  }
`;

export const BoxSingle = styled.section `
  border: 3px solid #F4E9D7;
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  max-width: 1024px;
  margin: 20px auto 40px;
`;

export const Container = styled.main`
  // max-width: 960px;
  margin: 0 auto;
  padding:0;
`;

export const EspacoLateral = styled.div `
  padding: 10px 20px;
  width: 90%;
  max-width: 1024px;
  margin: 0 auto;
`;

export const TituloPrincipal = styled.h1 `
  margin: 0;
  position: relative;
  z-index: 9;
  text-align: center;
`;

export const SubTituloPrincipal = styled.p `
  margin: 0;
  position: relative;
  z-index: 9
`;

export const PageHeader = styled.header`
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; margin-bottom: 12px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #87785f;
  text-align: center;
  padding: 20px 0 20px;
`;

export const Input = styled.input`
  width: 100%; padding: 12px 20px;
  border: 1px solid ${({theme}) => theme.colors?.border || "#e5e7eb"};
  border-radius: 50px; outline: none;
  &:focus { border-color: ${({theme}) => theme.colors?.primary || "#2563eb"}; }
`;

export const Textarea = styled.textarea`
  width: 100%; min-height: 120px; padding: 10px 12px;
  border: 1px solid ${({theme}) => theme.colors?.border || "#e5e7eb"};
  border-radius: 8px; resize: vertical; outline: none;
  &:focus { border-color: ${({theme}) => theme.colors?.primary || "#2563eb"}; }
`;

export const Button = styled.button<{
  variant?: "primary"|"success"|"danger"|"ghost";
}>`
  border: 0; border-radius: 10px; padding: 10px 14px;
  font-weight: 700; cursor: pointer; color: white;
  box-shadow: ${({theme}) => theme.shadow};

  ${({theme, variant}) => {
    if (variant === "success") return css`background: ${theme.colors?.success || "#16a34a"};`;
    if (variant === "danger")  return css`background: ${theme.colors?.danger  || "#dc2626"};`;
    if (variant === "ghost")   return css`
      background: transparent; color: ${theme.colors?.text || "#0f172a"};
      border: 1px solid ${theme.colors?.border || "#e5e7eb"}; box-shadow: none;
      &:hover { background: #f8fafc; }
    `;
    return css`background: ${theme.colors?.primary || "#2563eb"};`;
  }}

  &:disabled { opacity: .6; cursor: not-allowed; }
`;

export const LinkLike = styled.button`
  background: none; border: 0; padding: 0; margin: 0;
  color: ${({theme}) => theme.colors?.primary || "#2563eb"};
  cursor: pointer; font: inherit; text-decoration: none;
  &:hover { text-decoration: underline; }
`;

export const Card = styled.article`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .08);
  padding: 16px;
  transition: transform .05s ease, box-shadow .1s ease;
  width: 48.5%;
  min-height: 157px;

  &:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,.08); }

  @media(min-width: 800px) {
    width: 24.2%;
    min-height: 157px;
  }
`;

export const Table = styled.table`
  width: 100%; border-collapse: collapse; background: #fff;
  border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;
  th, td { padding: 10px 12px; text-align: left; border-top: 1px solid #e5e7eb; }
  thead th { background: #f3f4f6; border-top: 0; }
`;

export const Row = styled.div`
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
`;

export const Muted = styled.p`
  margin: 6px 0 0;
  color: ${({theme}) => theme.colors.muted};
  font-size: 14px;
`;