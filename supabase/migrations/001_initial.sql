-- Schema inicial do DevPath
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
