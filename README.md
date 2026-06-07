<div align="center">

# ✅ Organize.me

### Aplicativo de Gerenciamento de Tarefas

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

Uma aplicação moderna e responsiva de gerenciamento de tarefas construída com React e TypeScript, apresentando um dashboard limpo, visualização em calendário, organização por prioridade e suporte a temas claro/escuro.

[Deploy](https://organize-me-client.vercel.app) • [Reportar Bug](https://github.com/joaopedrodev21/Organize.me-client/issues) • [Solicitar Feature](https://github.com/joaopedrodev21/Organize.me-client/issues)

</div>

---

## 📋 Sumário

- [Sobre](#-sobre)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Começar](#-como-começar)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Arquitetura](#-arquitetura)
- [Deploy na Vercel](#-deploy-na-vercel)
- [Contribuindo](#-contribuindo)

---

## 📖 Sobre

**Organize.me** é uma aplicação fullstack de gerenciamento de tarefas projetada para ajudar os usuários a organizar seu fluxo diário de trabalho de forma eficiente. A aplicação oferece um dashboard intuitivo para gerenciar tarefas com níveis de prioridade, uma visualização em calendário para visualizar prazos e estatísticas abrangentes para acompanhar a produtividade.

Este repositório contém o **cliente frontend** construído com React. A API backend está disponível em [Organize.me-server](https://github.com/joaopedrodev21/Organize.me-server).

---

## ✨ Funcionalidades

### 🔐 Autenticação
- Cadastro e login de usuários com autenticação baseada em JWT
- Fluxo de esquecimento e redefinição de senha
- Rotas protegidas com validação automática de token
- Persistência de sessão via localStorage

### 📊 Dashboard
- Criação, edição e exclusão de tarefas (CRUD completo)
- Filtragem de tarefas por prioridade (Alta / Baixa) e status (Todas / Pendentes / Concluídas)
- Seções organizadas de tarefas: **Alta Prioridade**, **Baixa Prioridade** e **Concluídas**
- Gráfico de pizza em tempo real mostrando tarefas concluídas vs. pendentes
- Estatísticas de distribuição por prioridade
- Confirmação ao concluir tarefas para evitar ações acidentais

### 📅 Calendário
- Visualização mensal em calendário com indicação de tarefas
- Indicadores coloridos de tarefas baseados em prioridade e status
- Alertas de tarefas atrasadas com avisos visuais
- Navegação entre meses e botão de acesso rápido "Hoje"
- Lista de tarefas ordenada com datas de vencimento

### 👤 Perfil
- Exibição das informações do usuário (nome, email, ID da conta, membro desde)
- Resumo estatístico de tarefas (total, concluídas, pendentes, produtividade %)
- Estados de carregamento para autenticação e tarefas
- Alternância de tema claro/escuro com persistência

### 🎨 UI/UX
- **Tema claro/escuro** com transições suaves e persistência no localStorage
- **Design totalmente responsivo** para desktop, tablet e mobile
- Layout moderno baseado em cards com espaçamento consistente
- Sidebar colapsável com perfil e progresso
- Iconografia powered by [Lucide React](https://lucide.dev/)
- Hierarquia visual limpa e minimalista

---

## 🛠 Tecnologias

| Categoria | Tecnologia |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Linguagem** | [TypeScript 6](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vite.dev/) |
| **Estilização** | [Tailwind CSS 4](https://tailwindcss.com/) + CSS Customizado |
| **Roteamento** | [React Router DOM 7](https://reactrouter.com/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Validação** | [Zod](https://zod.dev/) |
| **Ícones** | [Lucide React](https://lucide.dev/) |
| **Linting** | [ESLint](https://eslint.org/) + TypeScript ESLint |

---

## 📁 Estrutura do Projeto

```
src/
├── assets/              # Assets estáticos (imagens)
├── components/          # Componentes reutilizáveis da UI
│   ├── DashboardHeader.tsx
│   ├── PieChart.tsx
│   ├── PriorityStats.tsx
│   ├── ProtectedRoute.tsx
│   ├── Sidebar.tsx
│   ├── SidebarProgress.tsx
│   ├── TaskCard.tsx
│   ├── TaskFilters.tsx
│   ├── TaskForm.tsx
│   └── TaskSection.tsx
├── contexts/            # Provedores de Context do React
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── hooks/               # Hooks customizados do React
│   ├── useAuth.ts
│   ├── useTasks.ts
│   └── useTheme.ts
├── pages/               # Componentes de página (rotas)
│   ├── CalendarPage.tsx
│   ├── DashboardPage.tsx
│   ├── ForgotPasswordPage.tsx
│   ├── LoginPage.tsx
│   ├── ProfilePage.tsx
│   ├── RegisterPage.tsx
│   └── ResetPasswordPage.tsx
├── services/            # Camada de serviços da API
│   ├── api.ts           # Instância Axios e interceptors
│   ├── auth.service.ts  # Endpoints de autenticação
│   ├── task.service.ts  # Endpoints CRUD de tarefas
│   └── user.service.ts  # Endpoints de gerenciamento de usuários
├── styles/              # Arquivos CSS por componente
├── types/               # Definições de tipos TypeScript
│   └── index.ts
├── utils/               # Funções utilitárias
│   ├── dateUtils.ts     # Formatação e conversão de datas
│   └── formatDate.ts
├── App.tsx              # Componente raiz com roteamento
├── main.tsx             # Ponto de entrada da aplicação
└── index.css            # Estilos globais e imports do Tailwind
```

---

## 🚀 Como Começar

### Pré-requisitos

- **Node.js** (v18 ou superior recomendado)
- **npm** ou **yarn**
- **API Backend** rodando em `http://localhost:3000` ([Repositório do Backend](https://github.com/joaopedrodev21/Organize.me-server))

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/joaopedrodev21/Organize.me-client.git
cd Organize.me-client
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente** (opcional em dev)

```bash
cp .env.example .env
```

4. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

5. **Abra no navegador**

A aplicação estará disponível em `http://localhost:5173`.

---

## 🔧 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|---|---|---|
| `VITE_API_URL` | URL base da API backend | `/api` (usa proxy do Vite em dev) |

### Como funciona o proxy em desenvolvimento

O Vite está configurado para redirecionar requisições `/api` para `http://localhost:3000`. Isso significa que em desenvolvimento você não precisa configurar CORS.

Em produção (Vercel), defina `VITE_API_URL` com a URL do seu backend hospedado.

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento Vite com HMR |
| `npm run build` | Verificação de tipos com `tsc` e build para produção |
| `npm run preview` | Visualiza a build de produção localmente |
| `npm run lint` | Executa o ESLint em todo o projeto |

---

## 🏗 Arquitetura

### Fluxo de Autenticação

```
Login/Cadastro → Token JWT → localStorage → Interceptor do Axios → Rotas Protegidas
```

- Tokens JWT são armazenados no `localStorage` e anexados automaticamente às requisições via interceptors do Axios.
- Respostas 401 disparam logout automático e redirecionamento para `/login`.

### Gerenciamento de Estado

A aplicação utiliza a API de Context do React para estado global:

- **`AuthContext`** — Gerencia o estado de autenticação do usuário, login/logout e persistência de token.
- **`ThemeContext`** — Gerencia a preferência de tema claro/escuro com persistência no localStorage.

### Rotas

| Rota | Componente | Acesso |
|---|---|---|
| `/` | Redireciona para `/dashboard` | Público |
| `/login` | `LoginPage` | Público |
| `/register` | `RegisterPage` | Público |
| `/forgot-password` | `ForgotPasswordPage` | Público |
| `/reset-password` | `ResetPasswordPage` | Público |
| `/dashboard` | `DashboardPage` | Protegido |
| `/calendar` | `CalendarPage` | Protegido |
| `/profile` | `ProfilePage` | Protegido |

### Comunicação com a API

Todas as requisições da API são tratadas através de módulos de serviço dedicados (`auth.service.ts`, `task.service.ts`, `user.service.ts`) que utilizam uma instância centralizada do Axios com interceptors de requisição/resposta integrados.

---

## 🚀 Deploy na Vercel

1. Conecte o repositório no [Vercel](https://vercel.com)
2. Configure a variável de ambiente `VITE_API_URL` com a URL do backend
3. O build é automático — o Vercel detecta o Vite e executa `npm run build`
4. A pasta `dist/` será servida como static files

### Configuração do backend

Certifique-se de que seu backend permita CORS da URL do seu frontend na Vercel e que o endpoint de reset de senha esteja configurado com a URL correta.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, siga estes passos:

1. Faça um fork do repositório
2. Crie uma branch de feature (`git checkout -b feature/sua-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adicionando alguma feature'`)
4. Push para a branch (`git push origin feature/sua-feature`)
5. Abra um Pull Request

---

## Autor

[João Pedro](https://github.com/joaopedrodev21)