# 📱 Mobile do Blog – Fase 4 (Tech Challenge FIAP)

Aplicação **mobile em React Native (Expo)** para alunos e professores interagirem com o blog educacional.  
Usuários públicos podem **visualizar e buscar postagens**; professores autenticados acessam um **painel administrativo** para realizar **CRUD de posts, professores e alunos**.

---

## 🚀 Tecnologias

- **React Native**
- **Expo**
- TypeScript
- React Navigation
- Axios (com header **Bearer Token**)
- Context API (autenticação)
- JWT (integração com backend)
- Backend REST reutilizado das fases anteriores

---

## 📁 Estrutura do Projeto
```
fase4-mobile/
├── src/
│ ├── components/ # Header, Footer e componentes reutilizáveis
│ ├── contexts/ # AuthContext (autenticação)
│ ├── navigation/ # AppNavigator
│ ├── screens/ # Home, Post, Login, Admin, Forms e Listagens
│ ├── services/ # api.ts, posts.ts, users.ts
│ ├── utils/ # Paginação (paginate)
│ └── App.tsx # Entrada da aplicação
├── package.json
├── app.json
└── README.md
```

---

## 🔌 Integração com a API

- **Base URL** configurada em `src/services/api.ts`
- Comunicação via **REST**
- Token JWT enviado automaticamente no header `Authorization`

### Endpoints utilizados

**Autenticação**
- `POST /auth/login` → retorna `{ token, user }`

**Postagens**
- `GET /posts` – lista
- `GET /posts/:id` – leitura
- `GET /posts/search?q=` – busca
- `POST /posts` – criar (**protegido**)
- `PUT /posts/:id` – editar (**protegido**)
- `DELETE /posts/:id` – excluir (**protegido**)

**Usuários**
- `GET /users?role=teacher|student`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

---

## 🔐 Autenticação e Autorização

- Login implementado para **professores**
- Autenticação baseada em **JWT**
- Gerenciamento de sessão via **Context API**
- Proteção de telas administrativas por **verificação de autenticação ao ganhar foco**
- Mesmo utilizando o botão “voltar” do dispositivo, o acesso indevido é bloqueado

> ⚠️ Nesta fase, a autenticação é **centralizada para docentes**, atendendo ao escopo do projeto. Professores e alunos cadastrados são entidades administrativas e não possuem login individual nesta entrega.

---

## 📱 Telas & Funcionalidades

Público:
- Home – lista de posts + busca em tempo real
- Post – leitura completa da matéria

Professor (protegido):
- Login – autenticação
- AdminPosts – lista geral de posts
- PostForm – criar / editar post
- Professores – listagem, criação, edição e exclusão
- Alunos – listagem, criação, edição e exclusão

---

## 🔍 Busca e Paginação

- Busca por palavra-chave:
  - Posts: via endpoint `/posts/search`
  - Professores e alunos: filtragem client-side
- Paginação:
  - Implementada no **frontend**
  - Reutilizável via função utilitária `paginate`
  - Aplicada em posts, professores e alunos

---

## 🧪 Como rodar o projeto

### Pré-requisitos
- Node.js
- Expo CLI
- Backend em execução (Fase 3)

### Passos

```
npm install
npx expo start
```

Para rodar em dispositivo físico, configure o IP do backend corretamente em:
src/services/api.ts

---

## 🧠 Decisões Técnicas

- Reutilização integral do backend das fases anteriores
- Autenticação centralizada para reduzir escopo e risco
- Paginação e busca implementadas no frontend
- Separação clara entre telas públicas e administrativas
- Arquitetura simples, legível e de fácil manutenção

---

## 🚧 Desafios Enfrentados

- Integração mobile com backend existente
- Adequação de contratos de dados entre frontend e API
- Gerenciamento correto da navegação e histórico no mobile
- Proteção de telas administrativas contra acesso indevido

---

## 🚀 Possíveis Evoluções

- Autenticação individual por professor
- Comentários em postagens
- Paginação server-side
- Melhorias visuais com biblioteca de UI

---

## 👨‍🏫 Credenciais de Demo
```
Email: prof@fiap.com
Senha: 123456
```
