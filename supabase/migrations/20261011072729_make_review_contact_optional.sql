-- A review may be submitted without sharing a phone number or email address.
-- Approval is a publishing decision, not a claim of identity verification.
alter table public.reviews
  drop constraint if exists reviews_contact_check,
  drop constraint if exists approval_requires_verification;

alter table public.reviews
  alter column contact drop not null;

alter table public.reviews
  add constraint reviews_contact_optional_length
    check (contact is null or char_length(contact) between 5 and 150);

alter table public.reviews
  rename column verified_at to approved_at;

alter table public.reviews
  add constraint approval_requires_approval_time
    check (status <> 'approved' or approved_at is not null);
