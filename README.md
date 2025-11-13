# 🚀 Desafio Técnico — Plataforma de Networking e Geração de Negócios

Uma **plataforma web** desenvolvida para **digitalizar e otimizar a gestão de grupos de networking**, com foco na **geração de negócios** entre membros.  
O sistema substitui planilhas e controles manuais por uma solução centralizada, cobrindo desde a **captação de novos membros** até o **acompanhamento financeiro** do grupo.

---

## 🧩 Funcionalidades Principais

### 👥 Gestão de Membros
- Formulário público de intenção de participação.  
- Área administrativa para aprovação ou recusa de intenções.  
- Cadastro completo de membros aceitos.  

### 💬 Comunicação e Engajamento
- Área de avisos e comunicados internos.  
- Controle de presença em reuniões (check-in).  

### 🤝 Geração de Negócios
- Sistema de **indicações** entre membros.  
- Acompanhamento do **status de indicações** (pendente, em andamento, concluída).

---

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologias |
|------------|--------------|
| **Frontend** | [Next.js 16 (App Router)](https://nextjs.org/) • [React 19](https://react.dev/) • [TailwindCSS 4](https://tailwindcss.com/) • [Radix UI](https://www.radix-ui.com/) • [Lucide Icons](https://lucide.dev/) |
| **Formulários e Validação** | [React Hook Form](https://react-hook-form.com/) • [Zod](https://zod.dev/) |
| **Backend e API** | Next.js API Routes • [Drizzle ORM](https://orm.drizzle.team/) • [PostgreSQL](https://www.postgresql.org/) |
| **Autenticação** | [Better Auth](https://better-auth.dev/) |
| **Infraestrutura** | PostgreSQL (com suporte a [Neon](https://neon.tech/) serverless) |
| **Testes** | [Jest](https://jestjs.io/) • [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) |
| **Estilo e Qualidade de Código** | [ESLint](https://eslint.org/) • [Prettier](https://prettier.io/) • [Prettier Tailwind Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) |

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
|----------|------------|
| `npm run dev` | Inicia o servidor de desenvolvimento do Next.js |
| `npm run build` | Gera a build de produção |
| `npm start` | Inicia o servidor em modo produção |
| `npm run lint` | Executa o ESLint |
| `npm run test` | Executa os testes com Jest |
| `npm run test:watch` | Executa os testes em modo observação |
| `npm run seed` | Popula o banco de dados com dados iniciais (`db/seed.ts`) |

---

## ⚙️ Estrutura do Projeto

```bash
desafio-tecnico-next/
├── app/                # Rotas e páginas (Next.js App Router)
├── components/         # Componentes reutilizáveis (UI, formulários, etc.)
├── db/                 # Configurações e seeds do banco de dados (Drizzle ORM)
├── lib/                # Funções auxiliares e configurações globais
├── public/             # Assets públicos (ícones, imagens, etc.)
├── styles/             # Estilos globais e configurações do Tailwind
├── tests/              # Testes unitários e de integração
└── package.json        # Dependências e scripts do projeto
```
---

## 🧪 Testes

O projeto utiliza **Jest** com o ambiente **jsdom**, e a biblioteca **Testing Library** para testes de componentes React.

Para rodar os testes:

```bash
npm run test
```
---

### 🗃️ Banco de Dados
- ORM: Drizzle ORM
 (TypeScript-first)
- Banco: PostgreSQL
- Seed: arquivo db/seed.ts com dados iniciais.
- Hospedagem opcional: Neon
 (serverless PostgreSQL).

## 🚀 Como Executar o Projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/christiancordeiro/desafio-tecnico-next.git
cd desafio-tecnico-next
```

### 2️⃣ Instalar as dependências

```bash
npm install
```

### 3️⃣ Configurar as variáveis de ambiente

Crie um arquivo .env na raiz do projeto e adicione as chaves necessárias (exemplo):
```bash
DATABASE_URL="postgresql://usuario:senha@host:porta/banco"
ADMIN_TOKEN=testeadmin
```
> **Observação:**  
> A variável `ADMIN_TOKEN` foi criada com o objetivo de **liberar o acesso ao painel de administrador de forma simplificada**, utilizando uma variável de ambiente apenas para **agilizar o processo de desenvolvimento e validação**.  
> Essa abordagem foi **sugerida no próprio desafio técnico**, servindo como uma forma prática de autenticação temporária.

### 4️⃣ Executar o ambiente de desenvolvimento

```bash
npm run dev
```
O projeto estará disponível em:
👉 http://localhost:3000

---

## 🧑‍💻 Autor
- Christian Cordeiro
- Desenvolvedor Fullstack | UI Designer
