-- ============================================================
-- SnackFlow QR — Supabase Schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 10 permanent QR codes (never deleted or recreated)
create table public.qr_codes (
  id    integer primary key check (id between 1 and 10),
  label text    not null unique
);

insert into public.qr_codes (id, label) values
  (1, 'QR-001'), (2, 'QR-002'), (3, 'QR-003'),
  (4, 'QR-004'), (5, 'QR-005'), (6, 'QR-006'),
  (7, 'QR-007'), (8, 'QR-008'), (9, 'QR-009'),
  (10, 'QR-010');

-- Every batch that has ever been assigned to a QR code
create table public.batch_assignments (
  id            uuid        default gen_random_uuid() primary key,
  qr_code_id    integer     not null references public.qr_codes(id),
  batch_number  text        not null,
  batch_name    text        not null,
  product       text        not null,
  serial_number text        not null,
  batch_date    date        not null,
  notes         text,
  assigned_at   timestamptz not null default now(),
  unassigned_at timestamptz,
  created_at    timestamptz not null default now()
);

-- Enforce: at most one active (unassigned) assignment per QR code at a time
create unique index idx_one_active_per_qr_code
  on public.batch_assignments(qr_code_id)
  where unassigned_at is null;

-- Convenience view: current state of all 10 QR codes
create view public.qr_code_status as
select
  qc.id,
  qc.label,
  ba.id            as assignment_id,
  ba.batch_number,
  ba.batch_name,
  ba.product,
  ba.serial_number,
  ba.batch_date,
  ba.notes,
  ba.assigned_at,
  (ba.id is not null) as is_assigned
from public.qr_codes qc
left join public.batch_assignments ba
  on ba.qr_code_id = qc.id
  and ba.unassigned_at is null;

-- Disable RLS for now (enable and add policies when you add auth)
alter table public.qr_codes         disable row level security;
alter table public.batch_assignments disable row level security;
