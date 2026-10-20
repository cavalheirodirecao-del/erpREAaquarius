create table if not exists app_user (
  id bigint generated always as identity primary key,
  username text not null unique,
  display_name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists branch (
  id bigint generated always as identity primary key,
  name text not null,
  code text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists audit_log (
  id bigint generated always as identity primary key,
  actor_user_id bigint references app_user(id),
  action text not null,
  entity text,
  entity_id text,
  created_at timestamptz not null default now()
);
