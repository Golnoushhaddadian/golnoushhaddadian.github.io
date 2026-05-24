const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { session_id, action, page, duration_seconds } = await req.json();

    // Validate session_id format: alphanumeric + hyphen, max 64 chars
    if (typeof session_id !== 'string' || !/^[A-Za-z0-9-]{1,64}$/.test(session_id)) {
      return new Response(JSON.stringify({ error: 'Invalid session_id' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const sid = encodeURIComponent(session_id);

    // Validate page param when provided: must look like a URL path
    if (page !== undefined && page !== null) {
      if (typeof page !== 'string' || page.length > 256 || !/^\/[A-Za-z0-9/_\-]*$/.test(page)) {
        return new Response(JSON.stringify({ error: 'Invalid page' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const OWNER_IP = Deno.env.get('OWNER_IP_ADDRESS') || '';
    const ownerIPs = OWNER_IP.split(',').map(ip => ip.trim()).filter(Boolean);

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('cf-connecting-ip')
      || 'unknown';

    // Skip tracking for owner IPs or lovable preview/refresh
    const referrer = req.headers.get('referer') || '';
    const origin = req.headers.get('origin') || '';
    const isLovable = referrer.includes('lovable.app') || referrer.includes('lovable.dev') 
      || origin.includes('lovable.app') || origin.includes('lovable.dev');
    if ((ownerIPs.length > 0 && ownerIPs.includes(ip)) || isLovable) {
      return new Response(JSON.stringify({ success: true, skipped: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'start') {
      let geo: any = {};
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,lat,lon`);
        geo = await geoRes.json();
      } catch (e) {
        console.error('Geo lookup failed:', e);
      }

      const userAgent = req.headers.get('user-agent') || '';
      const browser = parseBrowser(userAgent);
      const os = parseOS(userAgent);
      const device = parseDevice(userAgent);
      const referrer = req.headers.get('referer') || '';

      const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/visitor_sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
          session_id,
          ip_address: ip,
          country: geo.country || 'Unknown',
          city: geo.city || 'Unknown',
          region: geo.regionName || 'Unknown',
          latitude: geo.lat || null,
          longitude: geo.lon || null,
          user_agent: userAgent,
          browser,
          os,
          device,
          referrer,
          first_page: page || '/',
          pages_visited: [{ page: page || '/', timestamp: new Date().toISOString() }],
        }),
      });

      if (!insertRes.ok) {
        const err = await insertRes.text();
        console.error('Insert failed:', err);
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'update') {
      const patchBody: any = { last_active_at: new Date().toISOString() };
      if (duration_seconds) patchBody.duration_seconds = duration_seconds;

      const getRes = await fetch(
        `${SUPABASE_URL}/rest/v1/visitor_sessions?session_id=eq.${sid}&select=pages_visited&limit=1`,
        {
          headers: {
            'apikey': SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          },
        }
      );
      const rows = await getRes.json();

      if (rows.length > 0 && page) {
        const existingPages = rows[0].pages_visited || [];
        const lastPage = existingPages[existingPages.length - 1]?.page;
        if (page !== lastPage) {
          existingPages.push({ page, timestamp: new Date().toISOString() });
          patchBody.pages_visited = existingPages;
        }
      }

      await fetch(
        `${SUPABASE_URL}/rest/v1/visitor_sessions?session_id=eq.${sid}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          },
          body: JSON.stringify(patchBody),
        }
      );

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'end') {
      await fetch(
        `${SUPABASE_URL}/rest/v1/visitor_sessions?session_id=eq.${sid}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          },
          body: JSON.stringify({
            duration_seconds,
            last_active_at: new Date().toISOString(),
          }),
        }
      );

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[track-visitor] error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function parseBrowser(ua: string): string {
  if (ua.includes('Firefox/')) return 'Firefox';
  if (ua.includes('Edg/')) return 'Edge';
  if (ua.includes('OPR/') || ua.includes('Opera/')) return 'Opera';
  if (ua.includes('Chrome/') && !ua.includes('Edg/')) return 'Chrome';
  if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari';
  return 'Unknown';
}

function parseOS(ua: string): string {
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac OS')) return 'macOS';
  if (ua.includes('Linux') && !ua.includes('Android')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  return 'Unknown';
}

function parseDevice(ua: string): string {
  if (ua.includes('Mobile') || ua.includes('iPhone') || ua.includes('Android')) return 'Mobile';
  if (ua.includes('iPad') || ua.includes('Tablet')) return 'Tablet';
  return 'Desktop';
}
