const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const SCHOLAR_USER_ID = '8MQCFZQAAAAJ';
const SELF_NAME = 'G Haddadian';
const SELF_ALIASES = ['G Haddadian', 'Golnoush Haddadian', 'G. Haddadian', 'Haddadian G', 'GH Haddadian'];

function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

function isSelf(name: string): boolean {
  const normalized = normalizeName(name).toLowerCase();
  return SELF_ALIASES.some(alias => normalized.includes(alias.toLowerCase()));
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
  if (!resp.ok) {
    throw new Error(`Google Scholar returned ${resp.status}`);
  }
  return resp.text();
}

function extractAuthorsFromHTML(html: string): string[][] {
  // Each publication row has class "gsc_a_tr"
  // Inside each row, author info is in the second <div class="gs_gray">
  // Pattern: <td class="gsc_a_t">...<div class="gs_gray">AUTHORS</div><div class="gs_gray">JOURNAL</div>
  const publications: string[][] = [];
  
  // Match all author lines - they appear as the first gs_gray div after the title link
  const rowRegex = /<tr class="gsc_a_tr">[\s\S]*?<\/tr>/g;
  let match;
  while ((match = rowRegex.exec(html)) !== null) {
    const row = match[0];
    // Extract gs_gray divs - first one is authors, second is venue
    const grayRegex = /<div class="gs_gray">(.*?)<\/div>/g;
    const firstGray = grayRegex.exec(row);
    if (firstGray) {
      const authorStr = firstGray[1].replace(/<[^>]*>/g, '').trim();
      if (authorStr && authorStr !== '...') {
        const authors = authorStr.split(',').map(a => normalizeName(a)).filter(a => a.length > 0);
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
    
    // Fetch first page (up to 100 publications)
    const html1 = await fetchScholarPage(0);
    let allPublications = extractAuthorsFromHTML(html1);
    
    // Check if there are more pages (if we got close to 100 results)
    if (allPublications.length >= 95) {
      try {
        const html2 = await fetchScholarPage(100);
        const more = extractAuthorsFromHTML(html2);
        allPublications = allPublications.concat(more);
      } catch (e) {
        console.log('Could not fetch page 2:', e);
      }
    }

    console.log(`Found ${allPublications.length} publications`);

    // Count co-authorships
    const coauthorCounts: Record<string, number> = {};
    
    for (const authors of allPublications) {
      // Check if self is in this publication
      const hasSelf = authors.some(a => isSelf(a));
      if (!hasSelf) continue;
      
      for (const author of authors) {
        if (isSelf(author)) continue;
        if (author === '...' || author.length < 2) continue;
        
        // Normalize: try to merge similar names
        const key = author;
        coauthorCounts[key] = (coauthorCounts[key] || 0) + 1;
      }
    }

    // Sort by count descending
    const coauthors = Object.entries(coauthorCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    console.log(`Found ${coauthors.length} unique co-authors`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        coauthors, 
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
