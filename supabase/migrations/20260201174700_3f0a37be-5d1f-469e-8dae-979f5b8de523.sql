-- Add unique constraint on email to prevent duplicates
ALTER TABLE public.waitlist ADD CONSTRAINT waitlist_email_unique UNIQUE (email);