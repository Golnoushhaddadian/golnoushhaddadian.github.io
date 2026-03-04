CREATE TABLE public.visitor_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  ip_address text,
  country text,
  city text,
  region text,
  latitude double precision,
  longitude double precision,
  user_agent text,
  browser text,
  os text,
  device text,
  referrer text,
  pages_visited jsonb DEFAULT '[]'::jsonb,
  first_page text,
  duration_seconds integer DEFAULT 0,
  started_at timestamptz DEFAULT now(),
  last_active_at timestamptz DEFAULT now(),
  email_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON public.visitor_sessions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public update" ON public.visitor_sessions
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Allow public select" ON public.visitor_sessions
  FOR SELECT TO anon USING (true);