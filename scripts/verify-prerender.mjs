import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const seo = JSON.parse(readFileSync('src/content/seo.json', 'utf8'));
const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const paginas = ['index.html', 'projetos.html', 'como-funciona.html', 'planos.html',
  'parceiros.html', 'contato.html', 'caldas.html', 'criaker.html', 'lunar.html',
  'efraim.html', '404.html'];

for (const arquivo of paginas) {
  const html = readFileSync(join(dist, arquivo), 'utf8');
  assert.match(html, /<title>[^<]+<\/title>/, arquivo + ': título ausente');
  assert.match(html, /<h1\b/, arquivo + ': HTML sem H1 pré-renderizado');
  assert.match(html, /<main\b/, arquivo + ': HTML sem conteúdo principal pré-renderizado');
  assert.doesNotMatch(html, /<div id="root"><\/div>/, arquivo + ': root vazio');
  assert.match(html, /rel="canonical"/, arquivo + ': canonical ausente');
  const route = arquivo === 'index.html' ? '/' : arquivo === '404.html' ? '404' : '/' + arquivo.replace('.html', '');
  assert.ok(html.includes(`<title>${escape(seo[route].title)}</title>`), arquivo + ': título incorreto');
  assert.equal(html.match(/<meta\s+name="description"\s+content="([^"]*)"/)[1], escape(seo[route].description), arquivo + ': descrição incorreta');
  const canonical = 'https://www.webcariri.com.br' + (route === '404' ? '/' : route);
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`), arquivo + ': canonical incorreto');
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const org = schema['@graph'].find(item => item['@id']?.endsWith('#estudio'));
  assert.equal(org['@type'], 'Organization');
  for (const prop of ['address', 'geo', 'hasMap', 'openingHoursSpecification', 'priceRange']) assert.equal(org[prop], undefined);
}
const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
assert.equal(config.rewrites, undefined, 'Rewrite global descarta o HTML por rota');
for (const source of ['/servicos', '/servicos/:caminho*']) {
  assert.ok(config.redirects.some(r => r.source === source && r.destination === '/planos' && r.permanent));
}
const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
assert.match(sitemap, /https:\/\/www\.webcariri\.com\.br\/planos/);
assert.doesNotMatch(sitemap, /<lastmod>/, 'Datas artificiais em sitemap');
console.log('SEO verificado: ' + paginas.length + ' páginas com HTML inicial + sitemap.');
