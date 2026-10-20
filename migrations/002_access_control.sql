create table if not exists role (
  id bigint generated always as identity primary key,
  name text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists permission (
  id bigint generated always as identity primary key,
  code text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists user_role (
  user_id bigint not null references app_user(id) on delete cascade,
  role_id bigint not null references role(id) on delete cascade,
  primary key (user_id, role_id)
);

create table if not exists role_permission (
  role_id bigint not null references role(id) on delete cascade,
  permission_id bigint not null references permission(id) on delete cascade,
  primary key (role_id, permission_id)
);

create table if not exists user_branch (
  user_id bigint not null references app_user(id) on delete cascade,
  branch_id bigint not null references branch(id) on delete cascade,
  primary key (user_id, branch_id)
);
