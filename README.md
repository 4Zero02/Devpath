# DevPath

Plataforma pessoal de acompanhamento de estudos para transição de desenvolvedor júnior para pleno/sênior. Acompanhe seu progresso em roadmaps técnicos e projetos práticos de portfólio.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat&logo=vercel)

## O que é

DevPath é uma plataforma de acompanhamento de estudos com foco em backend, frontend, DevOps, banco de dados, system design e projetos práticos. Cada tópico tem descrição, recursos curados, critérios de conclusão e campo de notas pessoais — tudo salvo no Supabase com autenticação via GitHub ou Google.

## Funcionalidades

- **Login com GitHub ou Google** via OAuth (Supabase Auth)
- **5 roadmaps interativos** com progresso por tópico, recursos e notas
- **3 projetos práticos de portfólio** com tarefas detalhadas e critérios de conclusão
- **Progresso salvo** no PostgreSQL (Supabase) com RLS — cada usuário acessa apenas seus dados
- **Notas pessoais** por tópico/tarefa com auto-save
- **Progresso geral** com estatísticas no dashboard

## Roadmaps

| Roadmap | Fases | Tópicos |
|---|---|---|
| Backend (Java + TypeScript/Node.js) | Júnior → Pleno → Sênior | HTTP/REST, SOLID, DI, Testes, JWT, Cache, Mensageria, Arquitetura Hexagonal... |
| Frontend (React + Next.js) | Júnior → Pleno → Sênior | React, Hooks, TypeScript, Estado Global, Next.js, Performance, a11y... |
| DevOps / Infra | Júnior → Pleno → Sênior | Git, Docker, CI/CD, Observabilidade, AWS, Kubernetes... |
| Banco de Dados | Júnior → Pleno → Sênior | SQL, Modelagem, Índices, Transações, Migrations, NoSQL... |
| System Design | Júnior → Pleno → Sênior | Escalabilidade, DNS/CDN, Microsserviços, Segurança, Estimativas... |

## Projetos Práticos

Três projetos de alta complexidade que formam uma progressão coerente, demonstrando maturidade técnica de nível pleno/sênior.

### 1 — payflow-api
**Stack:** Java 21 · Spring Boot 3 · PostgreSQL · Redis · Kafka

Plataforma de pagamentos com transferências, carteiras digitais, antifraude e notificações. Cobre JWT com refresh token rotation, Optimistic Locking, Transactional Outbox Pattern, Circuit Breaker com Resilience4j, Testcontainers, Contract Testing com Pact, Distributed Tracing com OpenTelemetry + Jaeger.

### 2 — taskflow-api
**Stack:** TypeScript · NestJS · PostgreSQL · Redis · WebSockets · Kafka

Gerenciador de tarefas colaborativo em tempo real. Cobre OAuth2 com GitHub/Google, RBAC por projeto, cursor pagination, WebSockets autenticados com Socket.io, Consumer Kafka cross-service, Pact (lado consumer), prom-client.

### 3 — nexus-platform
**Stack:** Kubernetes (minikube) · Helm · Nginx Ingress · Prometheus · Grafana · Loki · Jaeger

Infraestrutura de produção orquestrando os dois projetos. Cobre Helm charts multi-environment, HPA, Kafka em cluster com KRaft, kube-prometheus-stack, Loki + Promtail, Jaeger cross-service, GitOps com rollback automático.

## Stack

- **Frontend:** React 18 + Vite + TypeScript (strict)
- **Estilo:** Tailwind CSS
- **Backend/DB:** Supabase — Auth (GitHub + Google OAuth) + PostgreSQL + RLS
- **Deploy:** Vercel
- **Containerização:** Docker multi-stage (node builder → nginx alpine)
- **CI/CD:** GitHub Actions
- **Qualidade:** ESLint + Prettier + Husky (pre-commit)

## Rodando localmente

### Pré-requisitos

- Node.js 20+
- Conta no [Supabase](https://supabase.com) (gratuita)

### 1. Clone o repositório

```bash
git clone git@github.com:4Zero02/Devpath.git
cd Devpath
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais do Supabase:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxx
```

### 4. Configure o banco de dados

Execute o SQL em `supabase/migrations/001_initial.sql` no SQL Editor do seu projeto Supabase. Ele cria as tabelas `progress` e `notes` com RLS.

### 5. Configure OAuth no Supabase

No painel do Supabase, em **Authentication → Providers**, habilite GitHub e/ou Google e adicione as credenciais OAuth.

### 6. Suba o servidor de desenvolvimento

```bash
npm run dev
```

Acesse em `http://localhost:5173`.

## Rodando com Docker

```bash
docker-compose up
```

A app fica disponível em `http://localhost:8080` (servida pelo nginx).

> As variáveis de ambiente são injetadas em build time — edite o `docker-compose.yml` com seus valores ou use um arquivo `.env`.

## Comandos

```bash
npm run dev          # servidor de desenvolvimento
npm run build        # build de produção
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
```

## Deploy na Vercel

1. Importe o repositório na Vercel
2. Em **Settings → Environment Variables**, adicione `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
3. A cada push na `main`, o deploy é feito automaticamente via GitHub Actions

## Estrutura

```
src/
├── components/       # UI: Dashboard, Roadmap, Project, TopicCard, etc.
├── data/
│   ├── roadmaps/     # Dados estáticos dos 5 roadmaps
│   └── projects/     # Dados estáticos dos 3 projetos
├── hooks/
│   ├── useAuth.ts    # Autenticação (Supabase OAuth)
│   └── useProgress.ts # Progresso e notas (Supabase DB)
├── lib/
│   └── supabase.ts   # Client do Supabase
└── types/            # Interfaces TypeScript
```

## Schema do banco

```sql
-- Progresso por tópico/tarefa
create table public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  topic_id text not null,   -- ex: 'backend_0_2' ou 'payflow_3_1'
  completed boolean default false,
  unique(user_id, topic_id)
);

-- Notas pessoais
create table public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  topic_id text not null,
  content text default '',
  unique(user_id, topic_id)
);
```

RLS habilitado — cada usuário acessa somente seus próprios dados.
