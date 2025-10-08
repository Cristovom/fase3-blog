import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after { box-sizing: border-box; }
  html, body, #root { scroll-behavior: smooth; }
  body {
    margin: 0;
    background: ${({theme}) => theme.colors.bg};
    color: ${({theme}) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji","Segoe UI Emoji";
  }
  a { color: ${({theme}) => theme.colors.primary}; text-decoration: none; }
  a:hover { text-decoration: underline; }
`;
