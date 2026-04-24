/**
 * Static server for the built Astro site. Run on Railway (or any host) via
 * `bun run start`. Serves files from ./dist, normalises /foo → /foo/index.html,
 * and falls back to dist/404.html for unknown paths if present.
 */
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(here, 'dist');
const PORT = Number(process.env.PORT ?? 4321);
const HOST = process.env.HOST ?? '0.0.0.0';

Bun.serve({
  port: PORT,
  hostname: HOST,
  async fetch(req) {
    const url = new URL(req.url);
    let path = decodeURIComponent(url.pathname);

    if (path.endsWith('/')) path += 'index.html';
    else if (!/\.[a-z0-9]+$/i.test(path)) path += '/index.html';

    const file = Bun.file(DIST + path);
    if (await file.exists()) {
      return new Response(file, {
        headers: cacheHeadersFor(path),
      });
    }

    const notFound = Bun.file(DIST + '/404.html');
    if (await notFound.exists()) {
      return new Response(notFound, { status: 404, headers: { 'Content-Type': 'text/html' } });
    }
    return new Response('Not Found', { status: 404 });
  },
});

console.log(`Serving ${DIST} on http://${HOST}:${PORT}`);

function cacheHeadersFor(path: string): HeadersInit {
  // Hashed assets under /_astro can be cached forever.
  if (path.startsWith('/_astro/')) {
    return { 'Cache-Control': 'public, max-age=31536000, immutable' };
  }
  // HTML + everything else: short cache so deploys replace content quickly.
  return { 'Cache-Control': 'public, max-age=300, must-revalidate' };
}
