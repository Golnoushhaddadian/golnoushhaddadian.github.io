-- Remove dangerous public RLS policies on visitor_sessions.
-- Edge functions (track-visitor, weekly-visitor-summary, admin-visitor-sessions)
-- use the service role key which bypasses RLS, so removing public policies
-- does not affect tracking/admin functionality.

DROP POLICY IF EXISTS "Allow public select" ON public.visitor_sessions;
DROP POLICY IF EXISTS "Allow public update" ON public.visitor_sessions;
DROP POLICY IF EXISTS "Allow public delete" ON public.visitor_sessions;
DROP POLICY IF EXISTS "Allow public insert" ON public.visitor_sessions;

-- RLS stays enabled; with no policies, anon/auth clients have no access.
-- Only the service role (used inside our edge functions) can read/write.