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

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    // Get visitor IP from headers
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
      || req.headers.get('cf-connecting-ip') 
      || 'unknown';

    if (action === 'start') {
      // Get geolocation from IP
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

      // Insert session
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

      // Send email notification
      if (RESEND_API_KEY) {
        const location = [geo.city, geo.regionName, geo.country].filter(Boolean).join(', ') || 'Unknown';
        const time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Visitor Alert <onboarding@resend.dev>',
            to: ['liahaddadian@gmail.com'],
            subject: `🌐 New Visitor from ${location}`,
            html: `
              <div style="font-family: sans-serif; max-width: 500px; padding: 20px;">
                <h2 style="color: #1a1a2e; margin-bottom: 16px;">New Visitor on Your Website</h2>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr><td style="padding: 8px 0; color: #666;">📍 Location</td><td style="padding: 8px 0;"><strong>${location}</strong></td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">🌐 IP Address</td><td style="padding: 8px 0;">${ip}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">🖥️ Device</td><td style="padding: 8px 0;">${device}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">🔎 Browser</td><td style="padding: 8px 0;">${browser}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">💻 OS</td><td style="padding: 8px 0;">${os}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">📄 Page</td><td style="padding: 8px 0;">${page || '/'}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">🔗 Referrer</td><td style="padding: 8px 0;">${referrer || 'Direct'}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;">🕐 Time (ET)</td><td style="padding: 8px 0;">${time}</td></tr>
                </table>
              </div>
            `,
          }),
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'update') {
      // Update session with new page or duration
      const patchBody: any = { last_active_at: new Date().toISOString() };
      if (duration_seconds) patchBody.duration_seconds = duration_seconds;

      // First get existing session to append page
      const getRes = await fetch(
        `${SUPABASE_URL}/rest/v1/visitor_sessions?session_id=eq.${session_id}&select=pages_visited&limit=1`,
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
        `${SUPABASE_URL}/rest/v1/visitor_sessions?session_id=eq.${session_id}`,
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
      // Send summary email with duration
      if (RESEND_API_KEY && duration_seconds) {
        const getRes = await fetch(
          `${SUPABASE_URL}/rest/v1/visitor_sessions?session_id=eq.${session_id}&select=*&limit=1`,
          {
            headers: {
              'apikey': SUPABASE_SERVICE_ROLE_KEY,
              'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            },
          }
        );
        const rows = await getRes.json();
        if (rows.length > 0) {
          const s = rows[0];
          const mins = Math.floor(duration_seconds / 60);
          const secs = duration_seconds % 60;
          const durationStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
          const pages = (s.pages_visited || []).map((p: any) => `<li>${p.page} <span style="color:#999;font-size:12px;">(${new Date(p.timestamp).toLocaleTimeString('en-US')})</span></li>`).join('');
          const location = [s.city, s.region, s.country].filter(Boolean).join(', ');

          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: 'Visitor Alert <onboarding@resend.dev>',
              to: ['liahaddadian@gmail.com'],
              subject: `👋 Visitor Left — ${durationStr} from ${location}`,
              html: `
                <div style="font-family: sans-serif; max-width: 500px; padding: 20px;">
                  <h2 style="color: #1a1a2e;">Visitor Session Summary</h2>
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr><td style="padding: 8px 0; color: #666;">📍 Location</td><td><strong>${location}</strong></td></tr>
                    <tr><td style="padding: 8px 0; color: #666;">⏱️ Duration</td><td><strong>${durationStr}</strong></td></tr>
                    <tr><td style="padding: 8px 0; color: #666;">🖥️ Device</td><td>${s.device} · ${s.browser} · ${s.os}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;">🌐 IP</td><td>${s.ip_address}</td></tr>
                  </table>
                  <h3 style="margin-top: 16px; color: #1a1a2e;">Pages Visited</h3>
                  <ol style="font-size: 14px; padding-left: 20px;">${pages}</ol>
                </div>
              `,
            }),
          });
        }
      }

      // Update final duration
      await fetch(
        `${SUPABASE_URL}/rest/v1/visitor_sessions?session_id=eq.${session_id}`,
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
            email_sent: true,
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
    console.error('Track visitor error:', error);
    return new Response(JSON.stringify({ error: String(error) }), {
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
