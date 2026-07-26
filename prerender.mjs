// Static prerender for the SPA.
// Serves the built dist/ folder, loads each public route in a real headless
// browser, waits for React to render, and writes the fully-rendered HTML back
// to dist/<route>/index.html. This gives crawlers, social preview bots, and AI
// assistants real content instead of an empty JavaScript shell.
//
// It runs a real browser (not Node SSR) so browser-only libraries in the app
// (framer-motion, recharts, react-pdf, etc.) work without modification.
// Wired into CI as a non-blocking step: if it ever fails, the normal SPA build
// still deploys unchanged.

import http from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const PORT = 4179;

// Public routes to prerender. The private /admin-analytics route is excluded.
const ROUTES = [
  '/',
  '/research',
  '/cv',
  '/projects',
  '/teaching',
  '/education',
  '/awards',
  '/resources',
  '/timeline',
  '/gallery',
  '/contact',
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

// Minimal static server with SPA fallback to index.html.
function startServer() {
  const indexHtml = path.join(DIST, 'index.html');
  const server = http.createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname);
      const filePath = path.join(DIST, urlPath);
      const ext = path.extname(filePath);
      if (ext && existsSync(filePath)) {
        const body = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(body);
        return;
      }
      // No extension or missing file: SPA fallback.
      const body = await readFile(indexHtml);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(body);
    } catch (err) {
      res.writeHead(500);
      res.end('prerender server error');
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function autoScroll(page) {
  // Trigger any content that renders on scroll (whileInView, IntersectionObserver).
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight + 1000) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 60);
    });
  });
}

async function run() {
  if (!existsSync(path.join(DIST, 'index.html'))) {
    console.error('[prerender] dist/index.html not found; run the build first.');
    process.exit(1);
  }
  const server = await startServer();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  let ok = 0;
  for (const route of ROUTES) {
    try {
      const url = `http://localhost:${PORT}${route}`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      // Wait for the app root to have real content.
      await page
        .waitForFunction(
          () => {
            const root = document.getElementById('root');
            return root && root.innerText && root.innerText.trim().length > 30;
          },
          { timeout: 20000 }
        )
        .catch(() => {});
      await autoScroll(page);
      await page.waitForTimeout(400);

      const html = await page.evaluate(() => '<!DOCTYPE html>\n' + document.documentElement.outerHTML);

      const outDir = route === '/' ? DIST : path.join(DIST, route);
      await mkdir(outDir, { recursive: true });
      await writeFile(path.join(outDir, 'index.html'), html, 'utf-8');
      const chars = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length;
      console.log(`[prerender] ${route} -> ${path.relative(DIST, path.join(outDir, 'index.html'))} (${chars} text chars)`);
      ok++;
    } catch (err) {
      console.error(`[prerender] FAILED ${route}: ${err.message}`);
    }
  }

  await browser.close();
  server.close();
  console.log(`[prerender] done: ${ok}/${ROUTES.length} routes prerendered.`);
}

run().catch((err) => {
  console.error('[prerender] fatal:', err);
  process.exit(1);
});
