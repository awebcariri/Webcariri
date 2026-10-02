/* WebCariri · main.js — interações da linha editorial (sem dependências)
   As páginas trocam sem recarregar: o site busca a página nova, troca o conteúdo atrás
   de uma cortina, volta ao topo e revela. Assim toda página abre no começo, em qualquer
   navegador e dentro de qualquer prévia. Se algo falhar, cai na navegação normal. */
var WC = {
  whatsapp: '5588999761315',
  // Depoimentos reais. Quando houver pelo menos um, a seção aparece sozinha na página inicial.
  // Ex.: { texto: 'Frase do cliente', nome: 'Nome', negocio: 'Negócio, cidade' }
  depoimentos: []
};

(function () {
  'use strict';
  var d = document, raiz = d.documentElement, corpo = d.body;
  var $ = function (s, el) { return (el || d).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || d).querySelectorAll(s)); };
  var reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mouse = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  function link(msg) { return 'https://wa.me/' + WC.whatsapp + '?text=' + encodeURIComponent(msg); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function topo(y) { try { scrollTo({ top: y || 0, left: 0, behavior: 'instant' }); } catch (e) { scrollTo(0, y || 0); } }
  function principal() { return $('main#conteudo'); }

  /* ---------- Relógio de Juazeiro do Norte (cabeçalho, menu e rodapé) */
  function relogio() { var t; try { t = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Fortaleza' }).format(new Date()); } catch (e) { t = new Date().toTimeString().slice(0, 5); } $$('.hora').forEach(function (h) { h.textContent = t; }); }
  relogio(); setInterval(relogio, 20000);

  /* ---------- WhatsApp com mensagem pronta */
  function zaps(root) { $$('[data-zap]', root).forEach(function (a) { a.href = link(a.dataset.zap); }); }
  zaps(d);

  /* ---------- Blocos que entram ao rolar */
  var ALVOS = '.sec, .rv, .split, .etapas, .cc, .pl, .ix-linha, .srv';
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px' }) : null;
  d.addEventListener('transitionend', function (e) { var el = e.target; if (el.classList && el.classList.contains('vis') && el.style.transitionDelay) el.style.transitionDelay = ''; });

  /* ---------- Títulos divididos em letras (ou palavras) para subir em cascata */
  function divide(el, porPalavra) {
    if (el.classList.contains('split')) return;
    var n = 0, txt = el.textContent.replace(/\s+/g, ' ').trim();
    (function anda(no) {
      Array.prototype.slice.call(no.childNodes).forEach(function (f) {
        if (f.nodeType === 1) { anda(f); return; }
        if (f.nodeType !== 3) return;
        var frag = d.createDocumentFragment();
        f.textContent.split(/(\s+)/).forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(d.createTextNode(' ')); return; }
          var w = d.createElement('span'); w.className = 'pw';
          if (porPalavra) w.innerHTML = '<span class="ch" style="--c:' + (n++) + '">' + esc(p) + '</span>';
          else w.innerHTML = Array.from(p).map(function (c) { return '<span class="ch" style="--c:' + (n++) + '">' + esc(c) + '</span>'; }).join('');
          frag.appendChild(w);
        });
        f.replaceWith(frag);
      });
    })(el);
    el.setAttribute('aria-label', txt);
    Array.prototype.slice.call(el.children).forEach(function (c) { c.setAttribute('aria-hidden', 'true'); });
    el.classList.remove('rv'); el.classList.add('split'); if (porPalavra) el.classList.add('split-p');
  }

  /* ---------- Estado da página atual (tudo que é refeito a cada troca) */
  var P = {};
  var mxp = 0, myp = 0;

  function montaPagina(m) {
    P = { col: $('#colagem', m), camadas: [], heroVis: true, timer: 0 };
    zaps(m);
    if (!reduz) {
      $$('.t-cond, .prox-t', m).forEach(function (el) { divide(el, false); });
      $$('.t-forte', m).forEach(function (el) { divide(el, true); });
    }
    $$(ALVOS, m).forEach(function (el, i) {
      if (!io || reduz) { el.classList.add('vis'); return; }
      if (el.classList.contains('pl') || el.classList.contains('srv')) { el.classList.add('rv'); el.style.transitionDelay = ((i % 3) * 80) + 'ms'; }
    });
    // imagens aparecem suaves quando terminam de carregar
    if (!reduz) $$('img[loading="lazy"]', m).forEach(function (im) {
      if (im.closest('.b-imgs') || (im.complete && im.naturalWidth)) return;
      im.classList.add('fade');
      im.addEventListener('load', function () { im.classList.add('ok'); }, { once: true });
      im.addEventListener('error', function () { im.classList.add('ok'); }, { once: true });
    });

    // colagem do topo: sites que se revezam, camadas com profundidade
    var col = P.col;
    if (col) {
      var imgs = $$('.b-imgs img', col), rotulo = $('#bCase', col), at = 0;
      P.camadas = $$('[data-p]', col).concat([$('.b-tela', col)]);
      if ('IntersectionObserver' in window) { P.heroIO = new IntersectionObserver(function (es) { P.heroVis = es[0].isIntersecting; }); P.heroIO.observe(col); }
      if (!reduz && imgs.length > 1) P.timer = setInterval(function () {
        if (d.hidden || !P.heroVis) return;
        var velha = imgs[at]; at = (at + 1) % imgs.length;
        imgs.forEach(function (im) { im.classList.remove('sai'); });
        velha.classList.remove('on'); velha.classList.add('sai');
        imgs[at].classList.add('on');
        rotulo.textContent = imgs[at].dataset.rot;
        setTimeout(function () { velha.classList.remove('sai'); }, 1050);
      }, 3800);
      if (mouse && !reduz) col.parentNode.addEventListener('pointermove', function (e) {
        var r = col.getBoundingClientRect(); mxp = (e.clientX - r.left) / r.width - .5; myp = (e.clientY - r.top) / r.height - .5; pede();
      });
    }

    // referências usadas na rolagem
    P.palavras = $$('.fx-p', m); P.faixa = $('.faixa', m); P.fimSec = $('.fim', m); P.prox = $('.prox', m);
    P.linhasHero = $$('.hero-t .l', m); P.telas = $$('.ct-jan img', m);
    P.pino = $('#pino', m);
    if (P.pino) {
      P.pinoIn = $('.pino-in', P.pino); P.trilho = $('.cards', P.pino); P.cartas = $$('.cc', P.pino);
      P.pinoBarra = $('.pino-barra', P.pino); P.pinoN = $('#pinoN', P.pino); P.fotos = $$('.cc-foto img', P.pino);
    }

    // índice de estudos: prévia que segue o mouse
    var previa = $('#ixPrevia', m);
    if (previa && mouse && !reduz) {
      var pImg = $('img', previa), px = 0, py = 0, rodando = false;
      var segue = function () {
        px += (alvoMouse.x - px) * .16; py += (alvoMouse.y - py) * .16;
        previa.style.setProperty('--px', px.toFixed(1) + 'px'); previa.style.setProperty('--py', py.toFixed(1) + 'px');
        if (previa.classList.contains('on') || Math.abs(alvoMouse.x - px) > .5) requestAnimationFrame(segue); else rodando = false;
      };
      $$('.ix-linha', m).forEach(function (l) {
        l.addEventListener('pointerenter', function (e) { pImg.src = l.dataset.img; if (!previa.classList.contains('on') && !rodando) { px = e.clientX + 28; py = e.clientY - 110; } previa.classList.add('on'); if (!rodando) { rodando = true; requestAnimationFrame(segue); } });
        l.addEventListener('pointerleave', function () { previa.classList.remove('on'); });
      });
    }

    // depoimentos
    var depSec = $('#depoimentos', m);
    if (depSec && WC.depoimentos.length) {
      $('#depos', m).innerHTML = WC.depoimentos.map(function (x) { return '<figure class="depo"><blockquote>' + esc(x.texto) + '</blockquote><figcaption class="mono">' + esc(x.nome) + ', ' + esc(x.negocio) + '</figcaption></figure>'; }).join('');
      depSec.hidden = false;
    }

    // formulário: um clique e o WhatsApp abre com a mensagem pronta
    var form = $('#form', m);
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = form.nome.value.trim(), neg = form.negocio.value.trim(), erro = $('#formErro', form);
      form.nome.setAttribute('aria-invalid', !nome); form.negocio.setAttribute('aria-invalid', !neg);
      if (!nome || !neg) { erro.hidden = false; (nome ? form.negocio : form.nome).focus(); return; }
      erro.hidden = true;
      var plano = (form.querySelector('[name=plano]:checked') || {}).value || 'Ainda não sei';
      var msg = 'Olá, WebCariri! Meu nome é ' + nome + ' e meu negócio é ' + neg + '.';
      if (form.insta.value.trim()) msg += '\nInstagram: ' + form.insta.value.trim();
      msg += '\nProcuro: ' + plano;
      if (form.nota.value.trim()) msg += '\n' + form.nota.value.trim();
      var u = link(msg), w = open(u, '_blank', 'noopener'); if (!w) location.href = u;
    });
  }
  function desmontaPagina() {
    if (P.timer) clearInterval(P.timer);
    if (P.heroIO) P.heroIO.disconnect();
  }
  // começa as animações de entrada da página atual
  function comeca() {
    corpo.classList.add('pronto');
    var m = principal();
    if (io && !reduz) $$(ALVOS, m).forEach(function (el) { if (!el.classList.contains('vis')) io.observe(el); });
    medePino(); quadro();
  }
  var alvoMouse = { x: 0, y: 0 };
  if (mouse) addEventListener('pointermove', function (e) { alvoMouse.x = e.clientX + 28; alvoMouse.y = e.clientY - 110; }, { passive: true });

  /* ---------- Rolagem: um único quadro por frame para todos os efeitos ligados à posição */
  var topoEl = $('#topo'), pendente = false, modo = '', deslocMax = 0;
  function aplicaCamadas(y) {
    var prof = { 1: [7, .03], 2: [14, -.05], 3: [21, -.11] };
    P.camadas.forEach(function (c) {
      if (!c) return;
      var p = c.dataset.p ? prof[c.dataset.p] : [-14, .06];
      c.style.setProperty('--mx', (mxp * p[0]).toFixed(1) + 'px');
      c.style.setProperty('--my', (myp * p[0] * .7 + y * p[1]).toFixed(1) + 'px');
    });
  }
  function medePino() {
    var pino = P.pino; if (!pino) return;
    modo = innerWidth >= 1024 ? 'trilho' : innerWidth < 720 ? 'pilha' : '';
    pino.style.removeProperty('--pino-h'); P.trilho.style.removeProperty('--gx');
    P.cartas.forEach(function (c) { c.style.removeProperty('--esc'); c.style.removeProperty('--esc-o'); });
    pino.classList.toggle('ativo', modo === 'trilho' && !reduz);
    if (modo === 'trilho' && !reduz) {
      deslocMax = Math.max(0, P.trilho.scrollWidth - P.pinoIn.clientWidth);
      if (deslocMax > 0) pino.style.setProperty('--pino-h', (P.pinoIn.offsetHeight + deslocMax) + 'px'); else { modo = ''; pino.classList.remove('ativo'); }
    }
  }
  function quadro() {
    pendente = false;
    if (reduz) return;
    var vh = innerHeight, y = scrollY, docH = raiz.scrollHeight - vh;
    if (topoEl) topoEl.style.setProperty('--lido', docH > 0 ? clamp(y / docH, 0, 1).toFixed(4) : 0);
    if (P.col && P.heroVis) aplicaCamadas(Math.min(y, vh));
    if (P.linhasHero && P.linhasHero.length && y < vh * 1.3) {
      var dir = [-1, .7, -1.3];
      P.linhasHero.forEach(function (l, k) { l.style.setProperty('--dx', (y * .18 * dir[k % 3]).toFixed(1) + 'px'); });
    }
    var pino = P.pino;
    if (pino && modo) {
      var rp = pino.getBoundingClientRect();
      if (rp.bottom > -50 && rp.top < vh + 50) {
        if (modo === 'trilho') {
          var curso = pino.offsetHeight - P.pinoIn.offsetHeight, pr = curso > 0 ? clamp(-rp.top / curso, 0, 1) : 0;
          P.trilho.style.setProperty('--gx', (-pr * deslocMax).toFixed(1) + 'px');
          if (P.pinoBarra) P.pinoBarra.style.setProperty('--pp', pr.toFixed(4));
          if (P.pinoN) P.pinoN.textContent = String(Math.min(P.cartas.length, 1 + Math.round(pr * (P.cartas.length - 1)))).padStart(2, '0');
          P.fotos.forEach(function (f) { var r = f.parentNode.getBoundingClientRect(); f.style.setProperty('--ix', clamp(((r.left + r.width / 2) - innerWidth / 2) * -.03, -11, 11).toFixed(1) + 'px'); });
        } else {
          // celular: cada card encolhe e escurece quando o próximo passa por cima
          for (var k = 0; k < P.cartas.length - 1; k++) {
            var a = P.cartas[k].getBoundingClientRect(), b = P.cartas[k + 1].getBoundingClientRect();
            var p = clamp(1 - (b.top - a.top) / Math.max(a.height, 1), 0, 1);
            P.cartas[k].style.setProperty('--esc', (1 - p * .07).toFixed(4));
            P.cartas[k].style.setProperty('--esc-o', (p * .35).toFixed(3));
          }
        }
      }
    }
    if (P.faixa) {
      var rf = P.faixa.getBoundingClientRect();
      if (rf.bottom > 0 && rf.top < vh) {
        var pf = (rf.top + rf.height / 2 - vh / 2) / vh, amp = Math.min(90, innerWidth * .07);
        P.palavras.forEach(function (w) { w.style.setProperty('--fx', (pf * +w.dataset.v * amp).toFixed(1) + 'px'); });
      }
    }
    (P.telas || []).forEach(function (im) { var r = im.getBoundingClientRect(); if (r.bottom > 0 && r.top < vh) im.style.setProperty('--z', (1 + .1 * clamp(r.top / vh, 0, 1)).toFixed(4)); });
    if (P.fimSec) { var r2 = P.fimSec.getBoundingClientRect(); if (r2.top < vh * 1.2) P.fimSec.style.setProperty('--sobe', clamp((vh - r2.top) / (vh * .8), 0, 1).toFixed(3)); }
    if (P.prox) { var r3 = P.prox.getBoundingClientRect(); if (r3.top < vh) { var andou = vh - r3.top, falta = Math.max(0, docH - y); P.prox.style.setProperty('--enche', clamp(andou / Math.max(1, andou + falta), 0, 1).toFixed(3)); } else P.prox.style.setProperty('--enche', 0); }
  }
  function pede() { if (!pendente) { pendente = true; requestAnimationFrame(quadro); } }
  addEventListener('scroll', pede, { passive: true });
  addEventListener('resize', function () { medePino(); pede(); });
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(function () { medePino(); pede(); });
  addEventListener('load', function () { medePino(); pede(); });

  /* ---------- Primeira página: monta e começa (depois da transição nativa, se houver) */
  montaPagina(principal());
  medePino(); quadro();
  requestAnimationFrame(function () { requestAnimationFrame(function () {
    if (!location.hash) topo(0);
    if (raiz.classList.contains('vt')) {
      var foi = false, vai1 = function () { if (!foi) { foi = true; comeca(); } };
      addEventListener('wc-revelou', vai1, { once: true }); setTimeout(vai1, 1500);
    } else comeca();
  }); });

  /* ---------- Menu do celular */
  var menuBt = $('#menuBt'), menuEl = $('#menu');
  function menu(on) { if (!menuBt) return; corpo.classList.toggle('menu-aberto', on); menuBt.setAttribute('aria-expanded', on); }
  if (menuBt) {
    menuBt.addEventListener('click', function () { menu(!corpo.classList.contains('menu-aberto')); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') menu(false); });
    addEventListener('resize', function () { if (innerWidth >= 1024) menu(false); });
  }

  /* ---------- Rolagem suave com a roda do mouse (só computador; no celular a rolagem nativa já é fluida) */
  var animando = false, alvoY = scrollY, atualY = scrollY;
  function paraSuave() { animando = false; alvoY = atualY = scrollY; }
  if (mouse && !reduz) {
    var maxY = function () { return raiz.scrollHeight - innerHeight; };
    var passo = function () {
      if (!animando) return;
      atualY += (alvoY - atualY) * .1;
      if (Math.abs(alvoY - atualY) < .4) { atualY = alvoY; animando = false; }
      topo(atualY);
      if (animando) requestAnimationFrame(passo);
    };
    addEventListener('wheel', function (e) {
      if (e.ctrlKey || corpo.classList.contains('menu-aberto') || raiz.classList.contains('saindo')) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.target.closest && e.target.closest('textarea, .tabela-wrap, select')) return;
      e.preventDefault();
      var dlt = e.deltaY * (e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? innerHeight : 1);
      alvoY = clamp(alvoY + dlt, 0, maxY());
      if (!animando) { atualY = scrollY; animando = true; requestAnimationFrame(passo); }
    }, { passive: false });
    addEventListener('scroll', function () {
      if (!animando) { alvoY = atualY = scrollY; return; }
      if (Math.abs(scrollY - atualY) > 3) paraSuave();
    }, { passive: true });
    addEventListener('keydown', paraSuave);
  }

  /* ---------- Troca de página sem recarregar */
  var cache = {}, indo = false;
  function interno(a) {
    if (!a || !a.href || a.target === '_blank' || a.hasAttribute('download')) return false;
    if (a.origin !== location.origin || !/^https?:$/.test(a.protocol)) return false;
    if (a.pathname === location.pathname && a.search === location.search) return false; // âncora ou mesma página
    return /(\/|\.html)$/.test(a.pathname) || !/\.[a-z0-9]{2,5}$/i.test(a.pathname);
  }
  function busca(url) {
    if (!cache[url]) cache[url] = fetch(url, { credentials: 'same-origin' }).then(function (r) {
      if (!r.ok || !/text\/html/.test(r.headers.get('content-type') || 'text/html')) throw new Error('falhou');
      return r.text().then(function (t) { return { html: t, url: r.url || url }; });
    }).catch(function (e) { delete cache[url]; throw e; });
    return cache[url];
  }
  // já busca a página quando o dedo ou o mouse chega no link
  function antecipa(e) { var a = e.target.closest && e.target.closest('a'); if (interno(a)) busca(a.href).catch(function () {}); }
  d.addEventListener('pointerover', antecipa, { passive: true });
  d.addEventListener('touchstart', antecipa, { passive: true });

  function trocaConteudo(nd) {
    var novo = nd.querySelector('main#conteudo'); if (!novo) throw new Error('sem conteúdo');
    desmontaPagina();
    corpo.classList.remove('pronto');
    var velho = principal();
    velho.replaceWith(d.adoptNode(novo));
    d.title = nd.title || d.title;
    // endereço oficial e descrição da página nova (o compartilhar do iPhone usa o canonical)
    ['link[rel="canonical"]', 'meta[name="description"]', 'meta[name="robots"]', 'meta[property="og:url"]', 'meta[property="og:title"]', 'meta[property="og:description"]'].forEach(function (s) {
      var a = $(s, d.head), b = nd.head.querySelector(s); if (!b) { if (a) a.remove(); return; }
      if (a) a.replaceWith(d.importNode(b, true)); else d.head.appendChild(d.importNode(b, true));
    });
    var pag = (nd.querySelector('[data-pag]') || nd.body).getAttribute('data-pag'); if (pag) corpo.setAttribute('data-pag', pag);
    // estado da navegação: página atual no menu, nas abas e no cabeçalho
    ['.topo-nav', '.menu-links', '.abas', '.topo-onde'].forEach(function (s) { var a = $(s), b = nd.querySelector(s); if (a && b) a.innerHTML = b.innerHTML; });
    relogio();
    montaPagina(principal());
  }
  function vai(url, empurra, yFinal) {
    if (indo) return; indo = true;
    menu(false); paraSuave();
    if (empurra) { try { history.replaceState({ y: scrollY }, '', location.href); } catch (e) {} }
    raiz.classList.remove('chegando', 'revela');
    raiz.classList.add('saindo');
    var espera = new Promise(function (r) { setTimeout(r, reduz ? 0 : 430); });
    Promise.all([busca(url), espera]).then(function (res) {
      var dados = res[0], nd = new DOMParser().parseFromString(dados.html, 'text/html');
      if (empurra) { try { history.pushState({ y: 0 }, '', dados.url); } catch (e) {} }
      trocaConteudo(nd);
      // a cortina continua cobrindo enquanto a página nova vai para o topo
      raiz.classList.add('chegando'); raiz.classList.remove('saindo');
      topo(yFinal || 0);
      void raiz.offsetWidth;
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        topo(yFinal || 0);
        raiz.classList.add('revela');
        comeca();
        // leitor de tela e teclado continuam do começo da página nova
        try { principal().focus({ preventScroll: true }); } catch (e) {}
        setTimeout(function () { raiz.classList.remove('chegando', 'revela'); indo = false; }, reduz ? 0 : 750);
      }); });
    }).catch(function () { location.href = url; });
  }
  d.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a');
    // link para a própria página (ex.: tocar em Início estando no Início): só volta ao topo
    if (a && a.origin === location.origin && a.target !== '_blank' && a.pathname === location.pathname && !a.hash && a.search === location.search) {
      e.preventDefault(); menu(false); paraSuave();
      try { scrollTo({ top: 0, behavior: reduz ? 'instant' : 'smooth' }); } catch (er) { scrollTo(0, 0); }
      return;
    }
    if (!interno(a) || !window.fetch || !window.DOMParser) return;
    e.preventDefault();
    vai(a.href, true, 0);
  });
  addEventListener('popstate', function (e) { vai(location.href, false, (e.state && e.state.y) || 0); });
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
})();
