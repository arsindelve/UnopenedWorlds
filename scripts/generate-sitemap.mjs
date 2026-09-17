// Writes dist/client/sitemap.xml after the static export.
//
// The sitemap is derived from the prerendered HTML rather than from games.ts,
// so it cannot drift: whatever the build actually published is what Google is
// told about, and a new page is listed the first time it exists. Each URL is
// named in its canonical form — apex host, no .html, no trailing slash — the
// same spelling the CloudFront function redirects every other variant to, and
// the one each page's own canonical tag uses.
//
// This runs as the second half of `pnpm build`, so there is no extra step to
// remember before a deploy.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const outDir = resolve('dist/client');
const siteUrl = readFileSync('app/site.ts', 'utf8').match(/siteUrl = '([^']+)'/)?.[1];

if (!siteUrl) {
  console.error('Could not read siteUrl from app/site.ts.');
  process.exit(1);
}

// Every prerendered page, and only those: _next holds the assets pages load.
function prerenderedPages(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) return entry.name === '_next' ? [] : prerenderedPages(join(dir, entry.name));
    return entry.name.endsWith('.html') ? [join(dir, entry.name)] : [];
  });
}

const paths = prerenderedPages(outDir)
  .map((file) => `/${relative(outDir, file).replaceAll('\\', '/').replace(/\.html$/, '')}`)
  // The wall is the root, and the 404 page is not one to send anybody to.
  .map((path) => (path === '/index' ? '/' : path))
  .filter((path) => path !== '/404')
  .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

if (paths.length === 0) {
  console.error(`No prerendered pages found in ${outDir}. The build did not produce a site.`);
  process.exit(1);
}

const urls = paths.map((path) => `  <url>\n    <loc>${siteUrl}${path}</loc>\n  </url>`).join('\n');
writeFileSync(join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

console.log(`Sitemap written: ${paths.length} canonical URLs.`);
