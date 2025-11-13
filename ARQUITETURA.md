# Arquitetura - Plataforma de Networking

## 1. Visão Geral

Plataforma web para digitalizar e otimizar a gestão de grupos de networking focados em geração de negócios. Substitui planilhas e controles manuais por um sistema centralizado que cobre: captação de novos membros, aprovação, cadastro, comunicação (avisos), presença em reuniões, indicações/negócios entre membros (referrals), acompanhamento de 1:1, dashboards de performance e um módulo financeiro para cobrança de mensalidades.

### Tecnologias Propostas

- **Banco e infra**: PostgreSQL (Neon como host/serverless opcional)
- **ORM**: Drizzle ORM (TypeScript-first)
- **Backend**: Next.js App Router (API routes)
- **Frontend**: Next.js + React, com React Hook Form, Zod (validação), Radix UI (componentes acessíveis), ShadcnUI, Lucide React (ícones)

### Motivação das Escolhas

Postgres oferece relações fortes, transações e bom suporte para consultas analíticas e integridade referencial, ideal para modelos com relacionamentos (membros, indicações). Drizzle oferece tipagem estreita com TypeScript e mapeamento seguro para Neon/Postgres.

## 2. Diagrama da Arquitetura (ASCII)

```
+-----------------------------+
|         Frontend            |
|       Next.js (React)       |
|   - Public forms            |
|   - Admin UI                |
|   - Member Portal           |
+-------------+---------------+
              |
              | HTTPS
              v
+-----------------------------+
|         Backend             |
|       API (REST)            |
| Auth Service (JWT/Sessions) |
|                             |
+-------------+---------------+
              |
    +---------+---------+
              |      
              v    
          +--------+
          |   DB   |
          |Postgres| 
          +--------+ 
```

## 3. Fluxos Principais

### Fluxo de Intenção → Aprovação → Cadastro

1. Usuário envia intenção via página pública
2. Admin revisa lista de intenções e aprova/recusa
3. Aprovado: recebe link para cadastro completo (ou admin cria membro)
4. Membro ativo: acessa área autenticada e funcionalidades

## 4. Modelo de Dados

### 4.1. Intenções de Participação

Armazena os dados enviados pelo formulário público na página inicial.

- **Campos principais**: ID, Nome, E-mail, Empresa, Motivo da participação, Status de aprovação, Data de envio
- **Relações**: Pode gerar um convite após aprovação

### 4.2. Convites

Registra os tokens de convite criados para que novos membros completem o cadastro.

- **Campos principais**: ID, Token (UUID), ID da intenção associada, Data de criação, Data de expiração, Status de uso
- **Relações**: Cada convite pertence a uma intenção e é utilizado para criar um membro

### 4.3. Membros

Representa os participantes ativos do grupo de networking.

- **Campos principais**: ID, Nome, E-mail, Empresa, Senha (hash), Data de criação
- **Relações**: Pode criar e receber indicações de outros membros

### 4.4. Indicações de Negócios

Controla as indicações realizadas entre membros.

- **Campos principais**: ID, Membro que indicou, Membro indicado, Contato, Descrição, Status (Nova, Em contato, Fechada, Recusada), Datas de criação e atualização
- **Relações**: Cada indicação está ligada a dois membros (quem enviou e quem recebeu)

### Visão Relacional (Simplificada)

```
Intenções ⟶ Convites ⟶ Membros
Membros ⟶ Indicações (1:N em ambos os sentidos — quem indica e quem recebe)
```

## 5. Estrutura de Componentes (Frontend - Next.js)

### 5.1. Organização de Diretórios

```
app/
├── admin/
│   ├── components/
│   │   └── page.tsx
│   └── page.tsx
│
├── api/
│   └── auth/
│   │    └── [...all]/
│   │        └── route.ts
│   │   └── contato/
│            └── [id]/
│                 └── route.ts
│
├── authentication/
│   ├── components/
│   │   └── sign-in-form.tsx
│   └── page.tsx
│
├── cadastro-completo/
│   ├── [token]/
│   │   └── page.tsx
│   └── components/
│       └── cadastro-completo-form.tsx
│
├── components/
│   ├── contact-intro-form.tsx
│   └── mode-toggle.tsx
│
├── painel/
│   ├── actions/
│   │   ├── criar-indicacao.tsx
│   │   ├── pegar-indicacoes-recebidas.tsx
│   │   ├── pegar-indicacoes.tsx
│   │   └── pegar-usuario.tsx
│   │
│   ├── components/
│   │   ├── avisos.tsx
│   │   ├── dashboard-reunioes.tsx
│   │   ├── indicacoes-recebidas.tsx
│   │   ├── minhas-indicacoes.tsx
│   │   ├── network.tsx
│   │   ├── nova-indicacao.tsx
│   │   ├── reunioes.tsx
│   │   └── page.tsx
│   │
│   └── types.ts
│
├── favicon.ico
├── globals.css
├── layout.tsx
├── page.tsx
│
└── components/
    ├── commom/
    │   └── LogoutButton.tsx
    │
    └── ui/
        ├── badge.tsx
        ├── button.tsx
        ├── card.tsx
        ├── dialog.tsx
        ├── dropdown-menu.tsx
        ├── form.tsx
        ├── input.tsx
        ├── item.tsx
        ├── label.tsx
        ├── progress.tsx
        ├── scroll-area.tsx
        ├── select.tsx
        ├── separator.tsx
        ├── switch.tsx
        ├── table.tsx
        ├── tabs.tsx
        └── theme-provider.tsx
db/
├── index.ts
├── schema.ts
└── seed.ts
lib/
├── auth.client.ts
├── auth.ts
└── utils.ts
```
## 6. Segurança e Autenticação

### 6.1. Estratégia de Autenticação

- **Sessões baseadas em JWT** armazenadas em cookies HTTP-only
- **Middleware de autenticação** para proteger rotas
- **RBAC (Role-Based Access Control)**: 
  - `member`: Acesso a portal do membro
  - `admin`: Acesso total ao sistema

### 6.2. Medidas de Segurança

- Senhas hashadas com bcrypt (ou Argon2)
- Validação de dados com Zod em cliente e servidor
- CSRF protection em formulários
- Tokens de convite com expiração (7 dias)
- HTTPS obrigatório em produção

### 6.3. Proteção de Rotas

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const session = getSessionFromCookie(request);
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session || session.role !== 'admin') {
      return NextResponse.redirect('/login');
    }
  }
  
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect('/login');
    }
  }
  
  return NextResponse.next();
}
```

---

### 7.0. Variáveis de Ambiente

```bash
# Database
DATABASE_URL=postgresql://...
ADMIN_TOKEN=testeadmin

```
> **Observação:**  
> A variável `ADMIN_TOKEN` foi criada com o objetivo de **liberar o acesso ao painel de administrador de forma simplificada**, utilizando uma variável de ambiente apenas para **agilizar o processo de desenvolvimento e validação**.  
> Essa abordagem foi **sugerida no próprio desafio técnico**, servindo como uma forma prática de autenticação temporária.

---

## 8. Considerações Finais

Esta arquitetura prioriza:

✅ **Type safety** (TypeScript + Drizzle + Zod)  
✅ **Developer experience** (Next.js full-stack)  
✅ **Performance** (RSC, caching, otimizações automáticas)  
✅ **Escalabilidade** (Neon serverless, stateless API)  
✅ **Manutenibilidade** (estrutura clara, separação de concerns)  
✅ **Segurança** (autenticação robusta, validações em camadas)

A escolha de **Postgres + Drizzle + Next.js** oferece um equilíbrio ideal entre poder expressivo, segurança de tipos e produtividade para uma aplicação de networking com alto grau de relacionamentos e necessidades analíticas.
