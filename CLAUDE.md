# devpath

Plataforma pessoal de acompanhamento de estudos para transição de dev júnior para pleno/sênior. Login com GitHub/Google OAuth. Progresso salvo no Supabase (PostgreSQL). Deploy na Vercel.

## Stack
- React + Vite + TypeScript (strict)
- Tailwind CSS
- Supabase — auth (GitHub + Google OAuth) + PostgreSQL + RLS
- Deploy: Vercel
- Containerização: Docker multi-stage (node builder → nginx alpine)
- CI/CD: GitHub Actions
- Qualidade: ESLint + Prettier + Husky (pre-commit)

## Estrutura de arquivos
```
devpath/
├── .github/workflows/ci.yml
├── .husky/pre-commit
├── public/
├── src/
│   ├── data/roadmaps/
│   │   ├── backend.ts
│   │   ├── frontend.ts
│   │   ├── devops.ts
│   │   ├── database.ts
│   │   └── system-design.ts
│   ├── components/
│   ├── hooks/
│   │   ├── useProgress.ts
│   │   └── useAuth.ts
│   ├── lib/
│   │   └── supabase.ts        ← client do Supabase
│   ├── types/index.ts
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   └── migrations/
│       └── 001_initial.sql    ← schema + RLS
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── .env.example               ← nunca commitar .env
├── .eslintrc.json
├── .prettierrc
├── CLAUDE.md
└── docs/
    ├── roadmap-backend.md
    ├── roadmap-frontend.md
    ├── roadmap-devops.md
    ├── roadmap-database.md
    ├── roadmap-system-design.md
    └── projects.md
```

## Variáveis de ambiente
Arquivo `.env.local` (nunca commitar — adicionar ao .gitignore):
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxx
```
Essas mesmas variáveis devem ser configuradas no painel da Vercel em Settings → Environment Variables.

## Schema do banco (Supabase/PostgreSQL)
```sql
-- Tabela de progresso por tópico
create table public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  topic_id text not null,                  -- ex: 'backend_0_2'
  completed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, topic_id)
);

-- Tabela de notas por tópico
create table public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  topic_id text not null,
  content text default '',
  updated_at timestamptz default now(),
  unique(user_id, topic_id)
);

-- RLS: usuário só acessa seus próprios dados
alter table public.progress enable row level security;
alter table public.notes enable row level security;

create policy "users own progress"
  on public.progress for all
  using (auth.uid() = user_id);

create policy "users own notes"
  on public.notes for all
  using (auth.uid() = user_id);
```

## Tipos principais (src/types/index.ts)
```ts
export type Difficulty = 'easy' | 'medium' | 'hard'
export type Level = 'junior' | 'mid' | 'senior'

export interface Resource {
  type: 'article' | 'video' | 'docs' | 'course'
  title: string
  url: string
  free: boolean
}

export interface Topic {
  id: string
  title: string
  level: Level
  difficulty: Difficulty
  estimatedHours: number
  description: string
  whyItMatters: string
  mustKnowWithout: string[]
  resources: Resource[]
}

export interface Phase {
  id: string
  title: string
  topics: Topic[]
}

export interface Roadmap {
  id: string
  title: string
  description: string
  phases: Phase[]
}

export interface UserProgress {
  topicId: string
  completed: boolean
}

export interface UserNote {
  topicId: string
  content: string
}
```

## Cliente Supabase (src/lib/supabase.ts)
```ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Auth (src/hooks/useAuth.ts)
```ts
// Padrão a seguir — implementar com supabase.auth.getSession(),
// supabase.auth.onAuthStateChange(), signInWithOAuth({ provider: 'github' }),
// signInWithOAuth({ provider: 'google' }), signOut()
```

## Regras de código
- TypeScript strict — zero `any`, zero `as unknown`
- Nunca use `var` — apenas `const` e `let`
- Componentes em PascalCase, hooks com prefixo `use`
- Comentários em português
- IDs de tópicos no formato `{roadmapId}_{phaseIndex}_{topicIndex}` (ex: `backend_0_2`)
- Dados dos roadmaps são estáticos em `src/data/` — nunca buscá-los do banco
- Apenas progresso e notas vão ao Supabase

## Comandos do projeto
- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run lint` — ESLint
- `npm run typecheck` — tsc --noEmit
- `docker-compose up` — sobe app em container nginx

## CI/CD (GitHub Actions)
Pipeline em `.github/workflows/ci.yml`:
1. lint → 2. typecheck → 3. build → 4. deploy (Vercel CLI)
Rodar em push para `main` e em pull requests.
PRs geram preview deploy automático no Vercel.
Secrets necessários no GitHub: `VERCEL_TOKEN`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.

## Husky (pre-commit)
Bloquear commit se lint ou typecheck falhar:
```sh
npm run lint && npm run typecheck
```

## Docker
Dockerfile multi-stage obrigatório:
- Stage 1 (`builder`): `node:20-alpine` — instala deps e roda `npm run build`
- Stage 2 (`runner`): `nginx:alpine` — serve o `dist/` gerado
- `nginx.conf` deve redirecionar todas as rotas para `index.html` (SPA)
- Variáveis de ambiente são injetadas em build time via `--build-arg`

## O que não fazer
- Não usar localStorage para progresso ou notas — tudo vai ao Supabase
- Não commitar `.env.local` — apenas `.env.example` vai ao repositório
- Não usar `useEffect` para buscar dados dos roadmaps (são estáticos)
- Não adicionar bibliotecas de UI prontas (shadcn, MUI, etc.) — apenas Tailwind
- Não expor a service role key do Supabase no frontend — apenas a anon key

## Conteúdo dos roadmaps e projetos
Arquivos separados por área — referencie apenas o necessário para a tarefa em curso:
- @docs/roadmap-backend.md — Backend (Java + TypeScript/Node.js)
- @docs/roadmap-frontend.md — Frontend (React + Next.js)
- @docs/roadmap-devops.md — DevOps / Infra
- @docs/roadmap-database.md — Banco de Dados
- @docs/roadmap-system-design.md — System Design
- @docs/project-payflow.md — Projeto 1: payflow-api (Java/Spring Boot)
- @docs/project-taskflow.md — Projeto 2: taskflow-api (NestJS/TypeScript)
- @docs/project-nexus.md — Projeto 3: nexus-platform (Kubernetes/Infra)