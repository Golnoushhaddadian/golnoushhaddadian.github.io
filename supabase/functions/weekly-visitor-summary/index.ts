const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get sessions from the past 7 days
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const getRes = await fetch(
      `${SUPABASE_URL}/rest/v1/visitor_sessions?started_at=gte.${weekAgo}&order=started_at.desc`,
      {
        headers: {
          'apikey': SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
      }
    );

    const sessions = await getRes.json();
    const totalVisitors = sessions.length;

    if (totalVisitors === 0) {
      // Still send a "no visitors" email
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Visitor Alert <onboarding@resend.dev>',
          to: ['liahaddadian@gmail.com'],
          subject: '📊 Weekly Visitor Report — No visitors this week',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
              <h2 style="color: #1a1a2e;">Weekly Visitor Summary</h2>
              <p style="color: #666;">No visitors recorded in the past 7 days.</p>
            </div>
          `,
        }),
      });

      return new Response(JSON.stringify({ success: true, visitors: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Compute stats
    const totalDuration = sessions.reduce((sum: number, s: any) => sum + (s.duration_seconds || 0), 0);
    const avgDuration = Math.round(totalDuration / totalVisitors);

    // Country breakdown
    const countries: Record<string, number> = {};
    sessions.forEach((s: any) => {
      const loc = [s.city, s.country].filter(Boolean).join(', ') || 'Unknown';
      countries[loc] = (countries[loc] || 0) + 1;
    });

    // Device breakdown
    const devices: Record<string, number> = {};
    sessions.forEach((s: any) => {
      devices[s.device || 'Unknown'] = (devices[s.device || 'Unknown'] || 0) + 1;
    });

    // Browser breakdown
    const browsers: Record<string, number> = {};
    sessions.forEach((s: any) => {
      browsers[s.browser || 'Unknown'] = (browsers[s.browser || 'Unknown'] || 0) + 1;
    });

    // Top pages
    const pageCounts: Record<string, number> = {};
    sessions.forEach((s: any) => {
      const pages = s.pages_visited || [];
      pages.forEach((p: any) => {
        pageCounts[p.page] = (pageCounts[p.page] || 0) + 1;
      });
    });
    const topPages = Object.entries(pageCounts)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 10);

    // Referrer breakdown
    const referrers: Record<string, number> = {};
    sessions.forEach((s: any) => {
      const ref = s.referrer ? new URL(s.referrer).hostname : 'Direct';
      referrers[ref] = (referrers[ref] || 0) + 1;
    });

    // Format helpers
    const fmtDur = (secs: number) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return m > 0 ? `${m}m ${s}s` : `${s}s`;
    };

    const sortedCountries = Object.entries(countries).sort((a, b) => b[1] - a[1]);
    const sortedDevices = Object.entries(devices).sort((a, b) => b[1] - a[1]);
    const sortedBrowsers = Object.entries(browsers).sort((a, b) => b[1] - a[1]);
    const sortedReferrers = Object.entries(referrers).sort((a, b) => b[1] - a[1]);

    // Build detailed visitor table (last 20)
    const recentSessions = sessions.slice(0, 20);
    const visitorRows = recentSessions.map((s: any) => {
      const location = [s.city, s.region, s.country].filter(Boolean).join(', ');
      const dur = fmtDur(s.duration_seconds || 0);
      const pages = (s.pages_visited || []).map((p: any) => p.page).join(' → ');
      const time = new Date(s.started_at).toLocaleString('en-US', { timeZone: 'America/New_York' });
      return `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 6px 8px; font-size: 12px;">${time}</td>
          <td style="padding: 6px 8px; font-size: 12px;">${location}</td>
          <td style="padding: 6px 8px; font-size: 12px;">${s.device} · ${s.browser}</td>
          <td style="padding: 6px 8px; font-size: 12px;">${dur}</td>
          <td style="padding: 6px 8px; font-size: 12px; max-width: 200px; overflow: hidden; text-overflow: ellipsis;">${pages}</td>
        </tr>`;
    }).join('');

    const tableRow = (label: string, value: string) =>
      `<tr><td style="padding:4px 8px;color:#666;font-size:13px;">${label}</td><td style="padding:4px 8px;font-size:13px;"><strong>${value}</strong></td></tr>`;

    const listItems = (entries: [string, number][]) =>
      entries.map(([k, v]) => `<li style="font-size:13px;">${k}: <strong>${v}</strong></li>`).join('');

    const weekStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric' });
    const weekEnd = new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric', year: 'numeric' });

    const html = `
      <div style="font-family: -apple-system, sans-serif; max-width: 700px; padding: 20px; color: #1a1a2e;">
        <h2 style="margin-bottom: 4px;">📊 Weekly Visitor Report</h2>
        <p style="color: #888; font-size: 13px; margin-top: 0;">${weekStart} — ${weekEnd}</p>

        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          ${tableRow('👥 Total Visitors', String(totalVisitors))}
          ${tableRow('⏱️ Avg. Duration', fmtDur(avgDuration))}
          ${tableRow('⏱️ Total Time on Site', fmtDur(totalDuration))}
        </table>

        <h3 style="margin-top:20px;">📍 Locations</h3>
        <ul style="padding-left:20px;">${listItems(sortedCountries.slice(0, 10))}</ul>

        <h3>📄 Top Pages</h3>
        <ul style="padding-left:20px;">${listItems(topPages as [string, number][])}</ul>

        <h3>🖥️ Devices</h3>
        <ul style="padding-left:20px;">${listItems(sortedDevices)}</ul>

        <h3>🔎 Browsers</h3>
        <ul style="padding-left:20px;">${listItems(sortedBrowsers)}</ul>

        <h3>🔗 Referrers</h3>
        <ul style="padding-left:20px;">${listItems(sortedReferrers.slice(0, 5))}</ul>

        <h3 style="margin-top:24px;">🕐 Recent Visitors (Last 20)</h3>
        <table style="width:100%;border-collapse:collapse;font-size:12px;">
          <thead>
            <tr style="background:#f5f5f5;">
              <th style="padding:6px 8px;text-align:left;">Time (ET)</th>
              <th style="padding:6px 8px;text-align:left;">Location</th>
              <th style="padding:6px 8px;text-align:left;">Device</th>
              <th style="padding:6px 8px;text-align:left;">Duration</th>
              <th style="padding:6px 8px;text-align:left;">Pages</th>
            </tr>
          </thead>
          <tbody>${visitorRows}</tbody>
        </table>

        ${totalVisitors > 20 ? `<p style="color:#888;font-size:12px;">Showing 20 of ${totalVisitors} sessions.</p>` : ''}
      </div>
    `;

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Visitor Report <onboarding@resend.dev>',
        to: ['liahaddadian@gmail.com'],
        subject: `📊 Weekly Visitor Report — ${totalVisitors} visitor${totalVisitors !== 1 ? 's' : ''} (${weekStart}–${weekEnd})`,
        html,
      }),
    });

    return new Response(JSON.stringify({ success: true, visitors: totalVisitors }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Weekly summary error:', error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
