-- ==============================================================================
-- FINANÇAS - SCHEMA COMPLETO SUPABASE POSTGRESQL COM ROW LEVEL SECURITY (RLS)
-- Execute este script no SQL Editor do seu projeto Supabase (supabase.com)
-- ==============================================================================

-- 1. PERFIS DE USUÁRIO (Vinculado a auth.users)
create table if not exists public.profiles (
  id             uuid primary key references auth.users on delete cascade,
  full_name      text not null,
  phone          text default '' not null,
  email          text not null,
  currency_code  text default 'BRL' not null,
  is_pro         boolean default false not null,
  created_at     timestamptz default now() not null,
  updated_at     timestamptz default now() not null
);

alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- 2. CATEGORIAS DE TRANSAÇÃO
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users not null,
  name        text not null,
  icon_name   text not null,
  color_hex   text not null,
  type_raw    text default 'Despesa' not null,
  updated_at  timestamptz default now() not null
);

alter table public.categories enable row level security;
create policy "Users can manage own categories" on public.categories for all using (auth.uid() = user_id);

-- 3. CONTAS BANCÁRIAS E CARTEIRAS
create table if not exists public.accounts (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references auth.users not null,
  name             text not null,
  type_raw         text not null,
  initial_balance  numeric default 0 not null,
  color_hex        text not null,
  icon_name        text not null,
  due_day          int,
  closing_day      int,
  credit_limit     numeric,
  updated_at       timestamptz default now() not null
);

alter table public.accounts enable row level security;
create policy "Users can manage own accounts" on public.accounts for all using (auth.uid() = user_id);

-- 4. TRANSAÇÕES FINANCEIRAS
create table if not exists public.transactions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users not null,
  name         text not null,
  amount       numeric not null,
  date         timestamptz not null,
  type_raw     text not null,
  notes        text,
  category_id  uuid references public.categories(id) on delete set null,
  account_id   uuid references public.accounts(id) on delete set null,
  goal_id      uuid,
  updated_at   timestamptz default now() not null
);

alter table public.transactions enable row level security;
create policy "Users can manage own transactions" on public.transactions for all using (auth.uid() = user_id);

-- 5. REGRAS RECORRENTES (CONTAS A VENCER & ASSINATURAS)
create table if not exists public.recurring_transactions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users not null,
  name          text not null,
  amount        numeric not null,
  type_raw      text not null,
  frequency_raw text not null,
  next_due_date timestamptz not null,
  category_id   uuid references public.categories(id) on delete set null,
  account_id    uuid references public.accounts(id) on delete set null,
  is_active     boolean default true not null,
  notes         text,
  updated_at    timestamptz default now() not null
);

alter table public.recurring_transactions enable row level security;
create policy "Users can manage own recurring rules" on public.recurring_transactions for all using (auth.uid() = user_id);

-- 6. METAS DE POUPANÇA (SAVING GOALS)
create table if not exists public.saving_goals (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users not null,
  name            text not null,
  target_amount   numeric not null,
  current_amount  numeric default 0 not null,
  deadline        timestamptz,
  color_hex       text not null,
  icon_name       text not null,
  is_completed    boolean default false not null,
  created_at      timestamptz default now() not null,
  updated_at      timestamptz default now() not null
);

alter table public.saving_goals enable row level security;
create policy "Users can manage own goals" on public.saving_goals for all using (auth.uid() = user_id);

-- 7. ORÇAMENTOS MENSAIS (BUDGETS)
create table if not exists public.budgets (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users not null,
  month        int not null,
  year         int not null,
  category_id  uuid references public.categories(id) on delete cascade,
  total_limit  numeric not null,
  updated_at   timestamptz default now() not null
);

alter table public.budgets enable row level security;
create policy "Users can manage own budgets" on public.budgets for all using (auth.uid() = user_id);

-- 8. PARCELAMENTOS (INSTALLMENTS)
create table if not exists public.installments (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid references auth.users not null,
  base_name          text not null,
  total_amount       numeric not null,
  installment_amount numeric not null,
  paid_count         int default 0 not null,
  total_count        int not null,
  first_due_date     timestamptz not null,
  next_due_date      timestamptz not null,
  category_id        uuid references public.categories(id) on delete set null,
  account_id         uuid references public.accounts(id) on delete set null,
  is_fully_paid      boolean default false not null,
  updated_at         timestamptz default now() not null
);

alter table public.installments enable row level security;
create policy "Users can manage own installments" on public.installments for all using (auth.uid() = user_id);

-- 9. ESPAÇOS COMPARTILHADOS (MODO CASAL)
create table if not exists public.shared_spaces (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid references auth.users not null,
  name               text not null,
  partner_name       text not null,
  partner_email      text,
  default_split_ratio numeric default 0.5 not null,
  invite_code        text not null,
  created_at         timestamptz default now() not null
);

alter table public.shared_spaces enable row level security;
create policy "Users can manage own shared spaces" on public.shared_spaces for all using (auth.uid() = user_id);

create table if not exists public.shared_settlements (
  id         uuid primary key default gen_random_uuid(),
  space_id   uuid references public.shared_spaces(id) on delete cascade not null,
  user_id    uuid references auth.users not null,
  amount     numeric not null,
  date       timestamptz not null,
  payer      text not null,
  notes      text,
  created_at timestamptz default now() not null
);

alter table public.shared_settlements enable row level security;
create policy "Users can manage own shared settlements" on public.shared_settlements for all using (auth.uid() = user_id);
