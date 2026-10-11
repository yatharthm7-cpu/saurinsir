-- Private review queue. Only the server-side secret key may use the Data API.
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  role text not null check (role in ('student', 'parent')),
  course text not null check (char_length(course) between 1 and 100),
  quote text not null check (char_length(quote) between 30 and 1200),
  rating smallint check (rating between 1 and 5),
  contact text not null check (char_length(contact) between 5 and 150),
  source_url text not null default '',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  consent_at timestamptz not null default now(),
  verified_at timestamptz,
  constraint featured_requires_approval check (not featured or status = 'approved'),
  constraint approval_requires_verification check (status <> 'approved' or verified_at is not null)
);

create index if not exists reviews_status_created_at_idx
  on public.reviews (status, created_at desc);

alter table public.reviews enable row level security;
revoke all on table public.reviews from anon, authenticated;
grant select, insert, update, delete on table public.reviews to service_role;
-- No anon/authenticated policies: even a leaked publishable key cannot read
-- verification contacts or move a review into the approved state.

-- Projects with automatic RLS create this helper in public. Event triggers
-- still work without letting browser roles call its SECURITY DEFINER body.
do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    execute 'revoke execute on function public.rls_auto_enable() from public, anon, authenticated';
  end if;
end
$$;
