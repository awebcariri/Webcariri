import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({executablePath:process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'});
mkdirSync('.prerender-ssr/screenshots', {recursive:true});
const errors=[];
try {
 for (const width of [360,375,390,414,768,1024,1440]) {
  const context=await browser.newContext({viewport:{width,height:900}});
  const page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error') errors.push(m.text());});
  await page.goto(base);
  await page.locator('.abertura').waitFor({state:'visible'});
  await page.locator('.abertura').waitFor({state:'hidden'});
  assert.equal(page.url(),base+'/');
  assert.equal(await page.locator('.cabecalho, .rodape, #cari-painel').count(),0);
  assert.equal(await page.locator('.biolink .links a').count(),4);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.ok(await page.locator('.biolink img').evaluateAll(imgs=>imgs.every(img=>img.complete && img.naturalWidth>0)));
  for(const link of await page.locator('.biolink .links a').all()) assert.ok((await link.boundingBox()).height>=44);
  const whatsapp=await page.getByRole('link',{name:'Fale conosco'}).getAttribute('href');
  assert.equal(new URL(whatsapp).hostname,'wa.me');
  assert.equal(new URL(whatsapp).pathname,'/5588999761315');
  await page.getByRole('button',{name:'Animar o Cari'}).click();
  await page.screenshot({path:'.prerender-ssr/screenshots/biolink-'+width+'.png',fullPage:true});
  for (const [label,path] of [['Conheça nosso site oficial','/inicio'],['Projetos','/projetos'],['Planos','/planos']]) {
   await page.getByRole('link',{name:label,exact:true}).click();
   await page.waitForURL(base+path);
   assert.ok(await page.locator('.cabecalho').isVisible());
   assert.equal(await page.locator('.abertura').count(),0);
   await page.goBack();
   await page.locator('.biolink').waitFor();
  }
  await context.close();
 }
 for(const options of [{javaScriptEnabled:false},{reducedMotion:'reduce'}]) {
  const context=await browser.newContext(options);
  const page=await context.newPage();
  await page.goto(base);
  assert.ok(await page.getByRole('link',{name:'Conheça nosso site oficial'}).isVisible());
  assert.equal(await page.locator('.abertura').count(),0);
  await page.getByRole('link',{name:'Conheça nosso site oficial'}).focus();
  await page.keyboard.press('Enter');
  await page.waitForURL(base+'/inicio');
  assert.ok(await page.locator('h1').isVisible());
  await context.close();
 }
 assert.deepEqual(errors,[]);
 console.log('Biolink aprovado: 7 larguras, abertura local, 3 destinos internos, WhatsApp, Cari, sem JS e movimento reduzido. Sem erros de console.');
} finally {await browser.close();}
