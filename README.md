# 🎨 Frontend do Blog – Fase 3 (Tech Challenge FIAP)

Aplicação **SPA em React** para alunos e professores interagirem com o blog.  
Os alunos visualizam e leem postagens; professores autenticados fazem **CRUD** (criar/editar/excluir).

---

## 🚀 Tecnologias

- React (Vite)
- **styled-components**
- React Router
- Axios (com interceptor de **Bearer**)
- Context API (autenticação)
- Docker (Nginx para servir build)

---

## 📁 Estrutura do Projeto
```
frontend/
├── src/
│ ├── components/ # Navbar, UI (Button, Card, etc.)
│ ├── context/ # AuthContext
│ ├── pages/ # Home, PostView, Login, Admin, PostCreate, PostEdit
│ ├── services/ # api.ts, auth.ts, posts.ts
│ ├── types/ # Tipos (Post, Auth)
│ ├── App.tsx # Rotas
│ └── main.tsx
├── Dockerfile
├── index.html
├── package.json
└── README.md
```

---

## 🔌 Integração com a API

- **Base URL** via env: `VITE_API_BASE_URL`  
- Endpoints principais (back):
  - `GET /posts` – lista
  - `GET /posts/:id` – leitura
  - `POST /auth/login` – retorna `{ token, user }`
  - `POST /posts`, `PUT /posts/:id`, `DELETE /posts/:id` – **protegidos**

O Axios injeta automaticamente `Authorization: Bearer <token>` se existir no `localStorage`.

---

## 🧪 Como rodar (dev)

```bash
cd frontend
npm install
# crie o .env local:
# VITE_API_BASE_URL=http://localhost:3000
npm run dev
```

A API estará disponível em: http://localhost:3000/posts
O App estará disponível em: http://localhost:5173

## 🏗️ Build de produção

```bash
npm run build
npm run preview
```

## 🐳 Docker

```bash
# build (ajuste a API se quiser outra URL)
docker build -t blog-frontend --build-arg VITE_API_BASE_URL=http://localhost:3000 .
docker run -p 5173:80 blog-frontend
```

Disponível em: http://localhost:5173

## 🔐 Rotas & Fluxo
```
Público:
    / – lista + busca
    /post/:id – leitura (com botão Voltar)

Professores (protegidas):
    /login – autenticação
    /admin – grid de posts
    /posts/novo – criar (com Cancelar)
    /posts/:id/editar – editar (com Cancelar)
```

## 👨‍🏫 Credenciais de Demo
```
Email: prof@fiap.com
Senha: 123456
```