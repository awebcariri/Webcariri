import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
import { mkdirSync, readFileSync } from 'node:fs';

const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const errors = [];
const seo = JSON.parse(readFileSync('src/content/seo.json', 'utf8'));
mkdirSync('.prerender-ssr/screenshots', { recursive: true });
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    for (const route of Object.keys(seo).filter(r => r !== '404' && r !== '/')) {
      await page.goto(base + route);
      await page.waitForTimeout(1800);
      assert.equal(await page.title(), seo[route].title);
      assert.equal(await page.locator('h1').count(), 1);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route + ': overflow');
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(600);
      await page.screenshot({ path: `.prerender-ssr/screenshots/${route.slice(1) || 'inicio'}-${width}.png`, fullPage: true });
    }
    await page.getByRole('button', { name: 'Abrir conversa com Cari, assistente virtual', exact: true }).click();
    assert.ok(await page.locator('#cari-painel').isVisible());
    await page.locator('#cari-painel').getByRole('button', { name: 'Quero um site', exact: true }).click();
    await page.keyboard.press('Escape');
    assert.ok(await page.locator('#cari-painel').isHidden());
    if (width === 390) {
      await page.getByRole('button', { name: 'Menu', exact: true }).click();
      assert.equal(await page.locator('.cabecalho__menu').getAttribute('aria-expanded'), 'true');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.cabecalho__menu').getAttribute('aria-expanded'), 'false');
    }
    await page.goto(base + '/contato?plano=site-premium');
    await page.waitForTimeout(400);
    assert.equal(await page.locator('input[name="procura"]:checked').inputValue(), 'site-premium');
    await context.close();
  }
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(base);
  await page.locator('.abertura').waitFor({ state: 'visible' });
  await page.screenshot({ path: '.prerender-ssr/screenshots/abertura.png' });
  await page.locator('.abertura').waitFor({ state: 'hidden' });
  assert.equal(await page.evaluate(() => sessionStorage.getItem('wc-abertura')), '1');
  await page.reload();
  await page.waitForTimeout(300);
  assert.equal(await page.locator('.abertura').count(), 0);
  await context.close();
  const reduced = await browser.newContext({ reducedMotion: 'reduce' });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(base);
  await reducedPage.waitForTimeout(300);
  assert.equal(await reducedPage.locator('.abertura').count(), 0);
  await reduced.close();
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  for (const route of ['/', '/planos', '/projetos', '/contato', '/criaker']) {
    await staticPage.goto(base + route);
    assert.ok(await staticPage.locator('h1').isVisible());
    assert.ok((await staticPage.locator('main').innerText()).length > 200);
  }
  await noJs.close();
  assert.deepEqual(errors, [], 'Erros de console/hidratação');
  console.log('Navegador: 10 rotas em desktop/mobile, Cari, menu, abertura, movimento reduzido, contato e conteúdo sem JS aprovados.');
} finally {
  await browser.close();
}
