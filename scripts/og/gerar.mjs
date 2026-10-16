// Gera os banners de compartilhamento (WhatsApp, Instagram, Facebook, LinkedIn) em public/og/.
// Rode depois de mudar textos ou imagens:  npm run og
// Precisa do Google Chrome instalado (caminho em CHROME_PATH, se não for o padrão do Windows).
// Os JPGs gerados ficam no repositório; a Vercel não roda este script.
import { chromium } from 'playwright-core';
import { mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const saida = join(aqui, '..', '..', 'public', 'og');
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

import { BANNERS } from './banners.mjs';

{
  mkdirSync(saida, { recursive: true });
  const modelo = pathToFileURL(join(aqui, 'modelo.html')).href;
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const [nome, dados] of Object.entries(BANNERS)) {
    await page.goto(`${modelo}#${encodeURIComponent(JSON.stringify(dados))}`);
    await page.reload(); // o hash não recarrega a página sozinho
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0));
    const arquivo = join(saida, `${nome}.jpg`);
    await page.screenshot({ path: arquivo, type: 'jpeg', quality: 86 });
    console.log(`  og/${nome}.jpg`, Math.round(statSync(arquivo).size / 1024) + ' KB');
  }
  await browser.close();
}
