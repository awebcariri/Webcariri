// Depois do `vite build`: gera o sitemap.xml e cria um HTML por rota (dist/projetos.html, dist/caldas.html...)
// com título, descrição, canonical e Open Graph próprios. Assim cada link compartilhado
// mostra a prévia certa, e a Vercel serve a rota direto (cleanUrls).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(raiz, 'dist');
const seo = JSON.parse(readFileSync(join(raiz, 'src/content/seo.json'), 'utf8'));
const base = readFileSync(join(dist, 'index.html'), 'utf8');
const SITE = 'https://www.webcariri.com.br';

const esc = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function pagina(rota) {
  const { title, description } = seo[rota];
  const url = SITE + (rota === '/' || rota === '404' ? '/' : rota);
  return base
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(description)}$2`);
}

for (const rota of Object.keys(seo)) {
  if (rota === '/') continue;
  const arquivo = rota === '404' ? '404.html' : `${rota.slice(1)}.html`;
  writeFileSync(join(dist, arquivo), pagina(rota));
  console.log('  rota', rota.padEnd(15), '→ dist/' + arquivo);
}
writeFileSync(join(dist, 'index.html'), pagina('/'));

// sitemap.xml gerado a partir das rotas do seo.json: página nova no seo.json entra sozinha no sitemap.
const hoje = new Date().toISOString().slice(0, 10);
const urls = Object.keys(seo)
  .filter((rota) => rota !== '404')
  .map((rota) => {
    const prioridade = rota === '/' ? '1.0' : ['/projetos', '/planos', '/contato'].includes(rota) ? '0.8' : '0.6';
    return `  <url>
    <loc>${SITE}${rota === '/' ? '/' : rota}</loc>
    <lastmod>${hoje}</lastmod>
    <priority>${prioridade}</priority>
  </url>`;
  })
  .join('\n');
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
);
console.log('  sitemap.xml   →', Object.keys(seo).length - 1, 'URLs');
