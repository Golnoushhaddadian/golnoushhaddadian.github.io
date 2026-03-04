const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const SCHOLAR_USER_ID = '8MQCFZQAAAAJ';
const SELF_ALIASES = ['g haddadian', 'golnoush haddadian', 'g. haddadian', 'haddadian g', 'gh haddadian'];

function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

function isSelf(name: string): boolean {
  const normalized = normalizeName(name).toLowerCase();
  return SELF_ALIASES.some(alias => normalized.includes(alias));
}

function linkKey(a: string, b: string): string {
  return [a, b].sort().join('|||');
}

async function fetchScholarPage(start: number): Promise<string> {
  const url = `https://scholar.google.com/citations?user=${SCHOLAR_USER_ID}&hl=en&cstart=${start}&pagesize=100&sortby=pubdate`;
  const resp = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  if (!resp.ok) throw new Error(`Google Scholar returned ${resp.status}`);
  return resp.text();
}

function extractAuthorsFromHTML(html: string): string[][] {
  const publications: string[][] = [];
  const rowRegex = /<tr class="gsc_a_tr">[\s\S]*?<\/tr>/g;
  let match;
  while ((match = rowRegex.exec(html)) !== null) {
    const row = match[0];
    const grayRegex = /<div class="gs_gray">(.*?)<\/div>/g;
    const firstGray = grayRegex.exec(row);
    if (firstGray) {
      const authorStr = firstGray[1].replace(/<[^>]*>/g, '').trim();
      if (authorStr && authorStr !== '...') {
        const authors = authorStr.split(',').map(a => normalizeName(a)).filter(a => a.length > 1);
        publications.push(authors);
      }
    }
  }
  return publications;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching Google Scholar profile...');
    const html1 = await fetchScholarPage(0);
    let allPublications = extractAuthorsFromHTML(html1);

    if (allPublications.length >= 95) {
      try {
        const html2 = await fetchScholarPage(100);
        allPublications = allPublications.concat(extractAuthorsFromHTML(html2));
      } catch (e) {
        console.log('Could not fetch page 2:', e);
      }
    }

    console.log(`Found ${allPublications.length} publications`);

    // Count co-authorships with self
    const coauthorCounts: Record<string, number> = {};
    // Count co-author to co-author links
    const pairCounts: Record<string, number> = {};

    for (const authors of allPublications) {
      const hasSelf = authors.some(a => isSelf(a));
      if (!hasSelf) continue;

      const coauthors = authors.filter(a => !isSelf(a) && a.length > 1);

      for (const ca of coauthors) {
        coauthorCounts[ca] = (coauthorCounts[ca] || 0) + 1;
      }

      // Build inter-co-author links (pairs who co-authored together on this paper)
      for (let i = 0; i < coauthors.length; i++) {
        for (let j = i + 1; j < coauthors.length; j++) {
          const key = linkKey(coauthors[i], coauthors[j]);
          pairCounts[key] = (pairCounts[key] || 0) + 1;
        }
      }
    }

    const coauthors = Object.entries(coauthorCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Build inter-links array
    const interLinks = Object.entries(pairCounts)
      .map(([key, weight]) => {
        const [source, target] = key.split('|||');
        return { source, target, weight };
      })
      .sort((a, b) => b.weight - a.weight);

    console.log(`Found ${coauthors.length} co-authors, ${interLinks.length} inter-links`);

    return new Response(
      JSON.stringify({
        success: true,
        coauthors,
        interLinks,
        totalPublications: allPublications.length,
        scholarId: SCHOLAR_USER_ID,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error crawling Google Scholar:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to crawl Google Scholar',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
