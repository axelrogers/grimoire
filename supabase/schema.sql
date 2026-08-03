-- ─── Grimoire · schema v1 ────────────────────────────────────────────────
-- Paste into Supabase → SQL Editor → Run. Idempotent: safe to re-run.
--
-- Shape follows the settled spell model (DECISIONS.md 2026-07-27, revised
-- 2026-08-03): a cast is a purchase + a working; a verdict is the caster
-- answering whether it landed. Verdicts are the only thing that may ever
-- produce a success rate — fabricated rates were removed on 2026-08-03 and
-- must never come back.

-- ── profiles ──────────────────────────────────────────────────────────────
-- One row per account. Rank is NOT stored; it is derived from cast count so
-- it can never drift from reality.
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at  timestamptz not null default now()
);

-- Create the profile automatically on sign-up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── casts ─────────────────────────────────────────────────────────────────
-- spell_id is a text key into the catalogue, not a foreign key: spells will
-- become practitioner-authored rows later, and a cast must survive its spell
-- being edited or withdrawn. title/glyph are denormalised on purpose so a
-- caster's history still reads correctly if the spell changes underneath it.
create table if not exists public.casts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  spell_id    text not null,
  title       text not null,
  glyph       text,
  price_cents integer,
  currency    text default 'AUD',
  cast_at     timestamptz not null default now(),
  worked      boolean,                    -- null = not yet answered
  verdict_at  timestamptz,
  constraint verdict_needs_time check (
    (worked is null and verdict_at is null) or
    (worked is not null and verdict_at is not null)
  )
);

create index if not exists casts_user_idx    on public.casts (user_id, cast_at desc);
create index if not exists casts_spell_idx   on public.casts (spell_id);
create index if not exists casts_pending_idx on public.casts (user_id) where worked is null;

-- ── row-level security ────────────────────────────────────────────────────
-- A practice is private. Nobody reads anyone else's casts, ever.
alter table public.profiles enable row level security;
alter table public.casts    enable row level security;

drop policy if exists "own profile"       on public.profiles;
drop policy if exists "own profile write" on public.profiles;
create policy "own profile"       on public.profiles for select using (auth.uid() = id);
create policy "own profile write" on public.profiles for update using (auth.uid() = id);

drop policy if exists "own casts"        on public.casts;
drop policy if exists "insert own casts" on public.casts;
drop policy if exists "update own casts" on public.casts;
create policy "own casts"        on public.casts for select using (auth.uid() = user_id);
create policy "insert own casts" on public.casts for insert with check (auth.uid() = user_id);
-- A verdict can be set or changed; a cast can never be deleted or back-dated.
create policy "update own casts" on public.casts for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── the trust layer ───────────────────────────────────────────────────────
-- Success rates must aggregate across ALL casters, but no caster may read
-- another's rows. security_invoker=off lets this view see past RLS while
-- exposing only counts — never a user_id, never an individual verdict.
create or replace view public.spell_stats
with (security_invoker = off) as
select
  spell_id,
  count(*)                                        as casts,
  count(*) filter (where worked is not null)      as answered,
  count(*) filter (where worked)                  as worked,
  case
    when count(*) filter (where worked is not null) >= 5
    then round(100.0 * count(*) filter (where worked)
                     / count(*) filter (where worked is not null))
    else null                                     -- too few verdicts to claim a rate
  end                                             as rate
from public.casts
group by spell_id;

grant select on public.spell_stats to anon, authenticated;

comment on view public.spell_stats is
  'Aggregate only. `rate` stays NULL below 5 verdicts — a percentage drawn from
   one or two answers is noise presented as evidence, and on a paid product
   that is a claim. See DECISIONS.md 2026-08-03.';
