# Gera as páginas do site da WebCariri (todas na raiz, prontas para a Vercel).
# Uso: python3 build.py          links limpos e caminhos a partir da raiz (/projetos, /style.css): é o que vai para a Vercel
#      python3 build.py --html   links com .html e caminhos relativos, para abrir os arquivos direto da pasta, sem servidor
# Para ver o site no computador como ele fica na Vercel: python3 servir.py
import json, re, sys, hashlib, datetime
HOJE = datetime.date.today().isoformat()
LOCAL = '--html' in sys.argv

def versao(arq):
    # muda sozinha quando o arquivo muda: o navegador nunca fica com CSS ou JS antigo no cache
    return hashlib.md5(open(arq, 'rb').read().replace(b'\r\n', b'\n')).hexdigest()[:8]

SITE = 'https://www.webcariri.com.br'
ZAP = '5588999761315'
ZAP_TXT = '(88) 99976-1315'
MAPS = 'https://maps.google.com/maps?cid=755831847868329975'  # Perfil da Empresa no Google
ANO = '2026'
MSG = 'Olá, WebCariri! Quero conversar sobre um site para o meu negócio.'
MSG_PREVIA = 'Olá, WebCariri! Quero uma prévia do site do meu negócio.'
SETA = ''
SETA_B = ''
SETA_D = ''
ON = ' class="on"'
LARG = {'caldas': 1333}  # largura real do print maior de cada case
ALT = {'caldas': 926}    # altura real (as outras têm 1100 x 773); o navegador reserva o espaço certo antes de a imagem chegar
PONTO = '<i class="ponto" aria-hidden="true"></i>'
ATUAL = {'slug': 'index'}

def bt(txt, sub, href=None, msg=None, cls='', ext=False):
    inner = f'<span class="bt-t">{txt}</span><span class="bt-s mono">{sub}</span>{PONTO}'
    c = 'bt' + (' ' + cls if cls else '')
    if msg is not None:
        return zap(msg, inner, c)
    alvo = ' target="_blank" rel="noopener"' if ext else ''
    return f'<a class="{c}" href="{href}"{alvo}>{inner}</a>'

def zap(msg, txt, cls='link', extra=''):
    c = f' class="{cls}"' if cls else ''
    return f'<a{c} href="https://wa.me/{ZAP}" data-zap="{msg}" target="_blank" rel="noopener"{extra}>{txt}</a>'

# ---------------------------------------------------------------- dados
# (chave, nome curto, nome, segmento, url, domínio, cor do bloco, texto)
CASES = [
    ('caldas', 'Caldas', 'Balneário do Caldas', 'Turismo e lazer · Barbalha', 'https://balneariodocaldas.com.br/', 'balneariodocaldas.com.br', 'papel',
     'Um balneário com 50 anos de história ganhou um lugar para o visitante planejar o passeio.'),
    ('criaker', 'Criaker', 'Criaker', 'Agência de publicidade · Juazeiro', 'https://www.criaker.com.br/', 'criaker.com.br', 'azul',
     'Uma agência criativa ganhou um site com a mesma personalidade das campanhas que faz.'),
    ('lunar', 'Lunar', 'Lunar Doceria', 'Gastronomia · Cariri', 'https://lunardoceria.lovable.app/', 'lunardoceria.lovable.app', 'papel',
     'Uma doceria artesanal ganhou uma vitrine delicada, com encomenda direto pelo WhatsApp.'),
]
CASE_INFO = {
    'caldas': {'h1': [('Balneário', 0), ('do Caldas.', 1)], 'cidade': 'Barbalha, CE', 'cor': 'azul',
               'pedido': 'O Balneário Termas do Caldas tem 50 anos de história com águas termais na Chapada do Araripe. O visitante precisava de um lugar só para planejar o passeio, sem depender de perguntar tudo pelo telefone ou pelo Instagram.',
               'tem': ['A história do balneário e das águas termais', 'Horários e ingressos', 'Galeria de fotos', 'Guia do visitante', 'Hospedagem', 'Como chegar', 'Página de transparência', 'Botão de planejar a visita sempre à mão']},
    'criaker': {'h1': [('Criaker.', 1)], 'cidade': 'Juazeiro do Norte, CE', 'cor': 'tinta',
               'pedido': 'A Criaker é uma agência de publicidade de Juazeiro do Norte. O site precisava ter a mesma personalidade das campanhas que a agência entrega e levar quem visita direto para o contato.',
               'tem': ['Visual escuro com a identidade da marca', 'Apresentação dos serviços', 'Equipe da agência', 'Avaliações de clientes', 'Contato em destaque em todas as telas']},
    'lunar': {'h1': [('Lunar', 0), ('Doceria.', 1)], 'cidade': 'Cariri, CE', 'cor': 'sol',
               'pedido': 'A Lunar é uma doceria artesanal. Os doces já faziam sucesso no Instagram, e faltava uma vitrine própria que mostrasse o cardápio e facilitasse a encomenda.',
               'tem': ['Cardápio visual', 'História da marca', 'Encomenda direto pelo WhatsApp', 'Visual delicado com a paleta da marca']},
}
ESTUDOS = [
    ('nascente', 'Nascente Azul', 'Balneário', 'https://nascente-azul-balneario.vercel.app/', 'Água que ondula ao toque, mapa do parque e montagem do ingresso.'),
    ('lastro', 'Lastro Advocacia', 'Advocacia', 'https://lastro-advocacia.vercel.app/', 'Triagem do caso em três perguntas, dentro das regras da OAB.'),
    ('vao', 'Vão Arquitetura', 'Arquitetura', '', 'Ambiente que nasce como desenho e vira projeto, com plantas clicáveis.'),
    ('nacar', 'Nácar', 'Odontologia', '', 'Tratamentos explicados com calma e agendamento guiado.'),
    ('quadra', 'Quadra Imóveis', 'Imobiliária', '', 'Busca por bairro, mapa de preços e simulação de financiamento.'),
    ('navalha', 'Navalha', 'Barbearia', '', 'Escolha do barbeiro em cartas e ticket de agendamento.'),
]
PASSOS = [
    ('Conversa', 'Você conta como o negócio funciona e o que o site precisa resolver. Pode ser pelo WhatsApp.', 'Dia 1'),
    ('Prévia', 'Você vê a primeira tela do seu site antes de fechar. Escopo e valor ficam definidos na proposta.', 'Antes de fechar'),
    ('Criação', 'Montamos as páginas com seus textos, fotos e contatos, pensando primeiro no celular.', 'Dias 2 a 10'),
    ('No ar', 'Revisamos juntos, publicamos e explicamos os próximos passos.', 'Por volta do dia 12'),
]
PLANOS = [
    ('Landing Express', '497', 'Uma página direta para começar a aparecer.', ['Uma página completa', 'Contato pelo WhatsApp', 'Horários, endereço e mapa', 'Adaptado ao celular']),
    ('Site Profissional', '897', 'Mais espaço para apresentar o seu negócio.', ['Várias seções ou páginas', 'Serviços, cardápio ou catálogo', 'Galeria de fotos', 'Estrutura preparada para o Google']),
    ('Site Premium', '1.497', 'Um site pensado sob medida.', ['Tudo do Site Profissional', 'Pedidos, reservas ou agendamento, conforme o escopo', 'Interações personalizadas', 'Planejamento das funções do projeto']),
]
FAQ = [
    ('Preciso ter todos os textos prontos?', 'Não. Começamos com o que você já tem, como Instagram, fotos e cardápio, e ajudamos a organizar o resto.'),
    ('Posso ver o site antes de pagar?', 'Sim. Você recebe uma prévia da primeira tela antes de fechar. O pagamento é 50% no início e 50% na entrega.'),
    ('Quanto tempo leva?', 'O prazo médio é de 12 dias. Depende do plano e de quando os materiais chegam.'),
    ('Como fica a hospedagem?', 'No começo a hospedagem é gratuita. Se o site crescer muito em acessos, indicamos uma hospedagem dedicada, em torno de R$ 80 por mês.'),
    ('O site funciona no celular?', 'Ele é pensado primeiro para o celular e testado também no computador antes da entrega.'),
]

# ---------------------------------------------------------------- moldura
# Título da aba e do resultado no Google: o assunto da página primeiro, a marca no fim, até uns 60 caracteres.
ABA = {'index': 'Criação de sites em Juazeiro do Norte, CE | WebCariri', 'projetos': 'Projetos: sites publicados e estudos | WebCariri',
       'como-funciona': 'Como funciona: seu site no ar em 12 dias | WebCariri', 'planos': 'Planos e preços de sites a partir de R$ 497 | WebCariri',
       'parceiros': 'Sites para clientes de agências | WebCariri', 'contato': 'Contato e prévia do seu site | WebCariri', '404': 'Página não encontrada | WebCariri',
       'caldas': 'Balneário do Caldas: case de site | WebCariri', 'criaker': 'Criaker: case de site | WebCariri', 'lunar': 'Lunar Doceria: case de site | WebCariri'}

# Dados estruturados (schema.org): dizem ao Google quem é o estúdio, onde fica, os planos e a trilha de cada página.
def ld_json(*blocos):
    return '<script type="application/ld+json">' + json.dumps({"@context": "https://schema.org", "@graph": list(blocos)}, ensure_ascii=False).replace('<', '\\u003c') + '</script>\n'

def ld_estudio():
    ofertas = [{"@type": "Offer", "name": n, "description": d, "url": SITE + "/planos",
                "priceSpecification": {"@type": "PriceSpecification", "minPrice": float(v.replace('.', '')), "priceCurrency": "BRL"}} for n, v, d, _i in PLANOS]
    return [
        {"@type": "WebSite", "@id": SITE + "/#site", "url": SITE + "/", "name": "WebCariri", "alternateName": ["Web Cariri", "Webcariri", "WC"], "inLanguage": "pt-BR", "publisher": {"@id": SITE + "/#estudio"}},
        {"@type": "ProfessionalService", "@id": SITE + "/#estudio", "name": "WebCariri",
         "alternateName": ["Web Cariri", "Webcariri"],
         "description": "Estúdio de criação de sites, landing pages e sites premium em Juazeiro do Norte, Ceará. Atende o Cariri e todo o Brasil, 100% online.",
         "url": SITE + "/", "image": SITE + "/og.jpg", "logo": SITE + "/apple-touch-icon.png", "telephone": "+55 88 99976-1315",
         "address": {"@type": "PostalAddress", "addressLocality": "Juazeiro do Norte", "addressRegion": "CE", "addressCountry": "BR"},
         "geo": {"@type": "GeoCoordinates", "latitude": -7.2131, "longitude": -39.3151},
         "areaServed": ["Juazeiro do Norte", "Crato", "Barbalha", "Cariri", "Brasil"],
         "sameAs": ["https://www.instagram.com/awebcariri/", MAPS], "hasMap": MAPS,
         "openingHoursSpecification": [{"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:00", "closes": "18:00"}],
         "knowsAbout": ["Criação de sites", "Landing page", "Web design", "SEO local"], "priceRange": "R$ 497 a R$ 1.497",
         "contactPoint": {"@type": "ContactPoint", "contactType": "customer service", "telephone": "+55 88 99976-1315", "availableLanguage": "Portuguese", "url": f"https://wa.me/{ZAP}"},
         "hasOfferCatalog": {"@type": "OfferCatalog", "name": "Planos de criação de sites", "itemListElement": ofertas}},
        {"@type": "FAQPage", "@id": SITE + "/#duvidas", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in FAQ]},
    ]

def ld_trilha(slug):
    # mesma trilha que aparece na página (Início / Projetos / Caldas)
    itens = [('Início', SITE + '/')]
    if slug in GRUPO: itens.append(('Projetos', SITE + '/projetos'))
    itens.append((ONDE[slug].split(' / ')[-1], SITE + '/' + slug))
    return {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n, "item": u} for i, (n, u) in enumerate(itens)]}

def head(slug, titulo, desc):
    url = SITE + ('/' if slug == 'index' else '/' + slug)
    aba = ABA.get(slug, titulo)
    canon = '' if slug == '404' else f'<link rel="canonical" href="{url}">\n'
    ld = ld_json(*ld_estudio()) if slug == 'index' else '' if slug == '404' else ld_json(ld_trilha(slug))
    pre = ('<link rel="preload" as="image" href="case-caldas.webp" imagesrcset="case-caldas-700.webp 700w, case-caldas.webp 1333w" imagesizes="(min-width: 1024px) 46vw, 92vw" fetchpriority="high">\n' if slug == 'index' else '')
    return f'''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{aba}</title>
<meta property="og:title" content="{titulo}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{SITE}/og.jpg">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="WebCariri, estúdio de criação de sites em Juazeiro do Norte">
<meta property="og:type" content="website">
<meta property="og:site_name" content="WebCariri">
<meta property="og:locale" content="pt_BR">
<meta property="og:url" content="{url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{titulo}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{SITE}/og.jpg">
<meta itemprop="name" content="{titulo}">
<meta itemprop="description" content="{desc}">
<meta itemprop="image" content="{SITE}/og.jpg">
<meta name="description" content="{desc}">
{canon}<meta name="robots" content="{'noindex' if slug == '404' else 'index, follow, max-image-preview:large'}">
<meta name="theme-color" content="#F3EFE7">
<meta name="format-detection" content="telephone=no, address=no, email=no">
<link rel="icon" href="favicon.ico" sizes="32x32">
<link rel="icon" href="icone.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="apple-touch-icon.png">

<link rel="preload" href="bigshoulders-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="instrument-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="dmmono-400.woff2" as="font" type="font/woff2" crossorigin>
{pre}
<link rel="stylesheet" href="style.css?v={versao("style.css")}">
{ld}<script>(function(h){{h.classList.add('js');if('scrollRestoration' in history)history.scrollRestoration='manual';if(!location.hash){{try{{scrollTo({{top:0,left:0,behavior:'instant'}})}}catch(e){{scrollTo(0,0)}}}};addEventListener('pagereveal',function(e){{if(!e.viewTransition)return;h.classList.add('vt');e.viewTransition.finished.finally(function(){{h.classList.remove('vt');dispatchEvent(new Event('wc-revelou'))}})}})}})(document.documentElement)</script>
</head>'''

MENU = [('./', 'Início', 'index'), ('projetos', 'Projetos', 'projetos'), ('como-funciona', 'Processo', 'como-funciona'), ('planos', 'Planos', 'planos'), ('parceiros', 'Para agências', 'parceiros'), ('contato', 'Contato', 'contato')]

GRUPO = {'caldas': 'projetos', 'criaker': 'projetos', 'lunar': 'projetos'}
ONDE = {'index': 'Início', 'projetos': 'Projetos', 'como-funciona': 'Processo', 'planos': 'Planos', 'parceiros': 'Para agências', 'contato': 'Contato', '404': 'Fora do mapa',
        'caldas': 'Projetos / Caldas', 'criaker': 'Projetos / Criaker', 'lunar': 'Projetos / Lunar'}
ABAS = [('./', 'Início', 'index'), ('projetos', 'Projetos', 'projetos'), ('como-funciona', 'Processo', 'como-funciona'), ('planos', 'Planos', 'planos'), ('contato', 'Contato', 'contato')]

def nav_desk(slug):
    AC = ' aria-current="page"'
    g = GRUPO.get(slug, slug)
    sub = ''.join(f'<a href="{k}"{AC if k == slug else ""}><span class="mono">{i+1:02d}</span><b>{curto}</b><span class="mono">{seg.split(" · ")[0]}</span><img src="case-{k}-700.webp" width="700" height="492" alt="" loading="lazy" decoding="async"></a>' for i, (k, curto, n, seg, *_r) in enumerate(CASES))
    out = f'<div class="nav-sub"><a href="projetos"{AC if g == "projetos" else ""}>Projetos</a><div class="nav-painel"><p class="mono">Sites no ar</p>{sub}<a class="nav-todos mono" href="projetos">Todos os projetos e estudos</a></div></div>'
    out += ''.join(f'<a href="{h}"{AC if s == g else ""}>{n}</a>' for h, n, s in MENU[2:])
    return out

def topo(slug):
    ATUAL['slug'] = slug
    AC = ' aria-current="page"'
    g = GRUPO.get(slug, slug)
    nav = nav_desk(slug)
    abas = ''.join(f'<a href="{h}"{AC if s == g else ""}>{PONTO}<span>{n}</span></a>' for h, n, s in ABAS)
    itens = ''.join(f'<li style="--i:{i}"><a href="{h}"{AC if s == g else ""}><span class="mono">{i+1:02d}</span>{n}</a></li>' for i, (h, n, s) in enumerate(MENU))
    return f'''<body data-pag="{slug}">
<div class="cortina" aria-hidden="true"><i class="ponto"></i></div>
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo" id="topo">
  <div class="topo-marca"><a class="logo" href="./" aria-label="WebCariri, início">wc<span></span></a><p class="mono topo-sob">Estúdio de sites<br>independente</p><p class="mono topo-onde">{ONDE.get(slug, "")}</p></div>
  <nav class="topo-nav" aria-label="Menu principal">{nav}</nav>
  <p class="mono topo-hora">Juazeiro / <b class="hora">--:--</b> local</p>
  {zap(MSG_PREVIA, "Pedir prévia" + PONTO, "topo-cta")}
  <button type="button" class="menu-bt mono" id="menuBt" aria-expanded="false" aria-controls="menu"><span class="mb-abrir">Menu</span><span class="mb-fechar">Fechar</span></button>
</header>
<nav class="menu" id="menu" aria-label="Menu completo">
  <ul class="menu-links">{itens}</ul>
  <div class="menu-pe mono">
    {zap(MSG, "WhatsApp " + ZAP_TXT, "")}
    <a href="https://www.instagram.com/awebcariri/" target="_blank" rel="noopener">Instagram @awebcariri</a>
    <p>Juazeiro do Norte, CE / <b class="hora">--:--</b></p>
  </div>
</nav>
<nav class="abas" aria-label="Navegação principal">{abas}</nav>
<main id="conteudo" tabindex="-1">'''

def num(n, rot=''):
    r = f'<span class="num-rot">{rot}</span>' if rot else ''
    return f'<p class="num mono" aria-hidden="true"><span>{n}</span>{r}</p>'

def cruz(x, y):
    return f'<span class="cruz" style="--x:{x};--y:{y}" aria-hidden="true"></span>'

def fim(n):
    return f'''<section class="sec fim">
  {num(n, "Contato")}
  <div class="sec-in fim-in">
    <div class="fim-sol" aria-hidden="true"><div class="fs-disco"></div><span class="logo logo-c">wc<span></span></span>{cruz("88%","14%")}</div>
    <div class="fim-txt">
      <h2 class="t-forte rv">Vamos fazer algo <span class="verm">que apareça.</span></h2>
      <p>Conte como funciona o seu negócio. Em poucos dias você vê a primeira tela, antes de fechar qualquer coisa.</p>
      {bt("Chamar no WhatsApp", ZAP_TXT, msg=MSG, cls="bt-verm")}
    </div>
    <div class="fim-dados mono">
      <p>{zap(MSG, ZAP_TXT, "")}<br><a href="https://www.instagram.com/awebcariri/" target="_blank" rel="noopener">@awebcariri</a><br>Juazeiro do Norte / CE</p>
      <p>Atendimento online<br>para todo o Brasil</p>
    </div>
  </div>
</section>'''

PROX = {'index': ('projetos', 'Projetos', 'Os sites no ar e os estudos por segmento.'), 'projetos': ('como-funciona', 'Processo', 'Como sai um site em cerca de 12 dias.'),
        'como-funciona': ('planos', 'Planos', 'Valores de partida e o que entra em cada plano.'), 'planos': ('parceiros', 'Para agências', 'Sites para os clientes da sua agência.'),
        'parceiros': ('contato', 'Contato', 'Conte do seu negócio e receba uma prévia.'), 'contato': ('./', 'Início', 'Volte para a página inicial.'),
        'caldas': ('criaker', 'Criaker', 'Próximo case: agência de publicidade.'), 'criaker': ('lunar', 'Lunar Doceria', 'Próximo case: doceria artesanal.'),
        'lunar': ('caldas', 'Balneário do Caldas', 'Próximo case: turismo e lazer.')}

def proxima():
    slug = ATUAL['slug']
    if slug not in PROX: return ''
    h, n, d = PROX[slug]
    rot = 'Próximo case' if slug in GRUPO else 'Próxima página'
    return f'''<a class="prox" href="{h}"><span class="prox-rot mono">{rot}</span><span class="prox-t">{n}</span><span class="prox-d">{d}</span>{PONTO}</a>'''

def rodape():
    return proxima() + f'''</main>
<footer class="rodape mono">
  <p class="rod-marca"><span class="logo">wc<span></span></span> WebCariri © {ANO}</p>
  <nav class="rod-nav" aria-label="Rodapé"><a href="projetos">Projetos</a><a href="como-funciona">Processo</a><a href="planos">Planos</a><a href="parceiros">Para agências</a><a href="contato">Contato</a></nav>
  <p class="rod-lema">Do Cariri pro mundo. <a href="#conteudo" class="rod-topo">Voltar ao topo</a></p>
</footer>
<script src="main.js?v={versao("main.js")}" defer onerror="document.documentElement.classList.remove('js')"></script>
</body>
</html>
'''

# ---------------------------------------------------------------- blocos
def cartoes(proximo=True):
    out = ''
    for i, (k, curto, n, seg, url, dom, cor, txt) in enumerate(CASES):
        img = f'<img src="case-{k}-700.webp" srcset="case-{k}-700.webp 700w, case-{k}.webp {LARG.get(k, 1100)}w" sizes="(min-width: 1024px) 34vw, (min-width: 720px) 50vw, 100vw" width="{LARG.get(k, 1100)}" height="{ALT.get(k, 773)}" alt="Página inicial do site {n}" loading="lazy" decoding="async">'
        if i == 0:
            arte = f'<span class="cc-arte cc-foto">{img}</span>'
        elif i == 1:
            arte = f'<span class="cc-arte cc-tela"><span class="cc-jan"><span class="cc-jbar mono">{dom}</span>{img}</span></span>'
        else:
            arte = f'<span class="cc-arte cc-recorte">{cruz("6%","10%")}{cruz("92%","86%")}<span class="cc-papel">{img}</span></span>'
        out += f'''<a class="cc cc-{cor}" href="{k}" aria-label="Ver o case {n}" style="--i:{i}">
  <span class="cc-n">{i+1:02d}</span>
  <span class="cc-nome">{curto}</span>
  <span class="cc-seg mono">{seg}<br>Site no ar</span>
  {arte}
  <span class="cc-pe"><span class="cc-dom mono">Ver o case</span>{PONTO}</span>
</a>'''
    if proximo:
        out += f'''<a class="cc cc-sol" href="https://wa.me/{ZAP}" data-zap="{MSG_PREVIA}" target="_blank" rel="noopener" style="--i:3">
  <span class="cc-n">04</span>
  <span class="cc-nome">O seu</span>
  <span class="cc-seg mono">Próximo case<br>{ANO}</span>
  <span class="cc-arte cc-vazio" aria-hidden="true"><span class="cc-mao mao">seu negócio<br>aqui</span><svg class="cc-rabisco" viewBox="0 0 200 120"><path d="M24 74 C 58 14, 146 10, 176 58 S 118 116, 64 98 C 40 90, 30 70, 52 52"/></svg></span>
  <span class="cc-pe"><span class="cc-dom mono">Pedir prévia</span>{PONTO}</span>
</a>'''
    barra = '<div class="pino-pe" aria-hidden="true"><span class="mono">Role para ver os cases</span><i class="pino-barra"><i id="pinoBarra"></i></i><span class="mono"><b id="pinoN">01</b> / 04</span></div>'
    return f'<div class="pino" id="pino"><div class="pino-in"><div class="cards">{out}</div>{barra}</div></div>'

def indice():
    linhas = ''
    for i, (k, n, seg, url, txt) in enumerate(ESTUDOS):
        tag, attrs = ('a', f' href="{url}" target="_blank" rel="noopener"') if url else ('div', '')
        acao = f'<span class="ix-acao mono">Ver estudo{PONTO}</span>' if url else '<span class="ix-acao mono ix-breve">Em breve</span>'
        linhas += f'''<{tag} class="ix-linha" data-img="estudo-{k}-600.webp"{attrs}>
  <span class="ix-n mono">{i+1:02d}</span><span class="ix-nome">{n}</span><span class="ix-seg mono">{seg}</span><span class="ix-txt">{txt}</span>{acao}
  <span class="ix-mini"><img src="estudo-{k}-600.webp" width="600" height="375" alt="" loading="lazy" decoding="async"></span>
</{tag}>'''
    return f'<div class="indice" id="indice">{linhas}<div class="ix-previa" id="ixPrevia" aria-hidden="true"><img alt="" width="1200" height="750"></div></div>'

def etapas():
    return '<ol class="etapas">' + ''.join(f'<li style="--i:{i}"><b>{i+1:02d}</b><span class="mono">{t}</span><i aria-hidden="true"></i></li>' for i, (t, d, q) in enumerate(PASSOS)) + '</ol>'

def passos_det():
    return '<ol class="passos">' + ''.join(f'<li class="rv"><b class="ps-n">{i+1:02d}</b><div><p class="mono ps-q">{q}</p><h3>{t}</h3><p>{d}</p></div></li>' for i, (t, d, q) in enumerate(PASSOS)) + '</ol>'

def planos():
    cols = ''
    for i, (n, v, d, itens) in enumerate(PLANOS):
        lis = ''.join(f'<li>{t}</li>' for t in itens)
        selo = '<span class="pl-selo mono">Mais escolhido</span>' if i == 1 else ''
        cols += f'''<article class="pl{' pl-d' if i == 1 else ''}">
  <p class="mono pl-n">{i+1:02d} / {len(PLANOS):02d}{selo}</p>
  <h3>{n}</h3><p class="pl-desc">{d}</p>
  <p class="pl-preco"><span class="mono">A partir de</span><b>R$ {v}</b></p>
  <ul class="mono">{lis}</ul>
  {bt("Quero este plano", n, msg=f"Olá, WebCariri! Tenho interesse no plano {n}.", cls="bt-claro" if i == 1 else "")}
</article>'''
    return f'<div class="planos">{cols}</div><p class="nota mono">50% no início e 50% na entrega. Hospedagem gratuita para começar. Domínio próprio e manutenção mensal são opcionais.</p>'

def faq():
    return '<div class="faq">' + ''.join(f'<details><summary><span class="mono">{i+1:02d}</span><span class="fq-p">{q}</span><i aria-hidden="true"></i></summary><div class="faq-r"><p>{a}</p></div></details>' for i, (q, a) in enumerate(FAQ)) + '</div>'

def faixa(n):
    return f'''<section class="faixa" aria-label="Pensa, cria, publica">
  <p class="fx-num mono" aria-hidden="true">{n}</p>
  <div class="fx-palavras"><span class="fx-p" data-v="-1">Pensa</span><i></i><span class="fx-p" data-v="1">Cria</span><i></i><span class="fx-p fx-sol" data-v="-1">Publica</span></div>
  <p class="fx-lado mono">Sites que trabalham<br>por você.<br><br>Do Cariri<br>pro mundo.</p>
</section>'''

def migalha():
    slug = ATUAL['slug']
    if slug in GRUPO:
        return f'<nav class="migalha mono" aria-label="Você está em"><a href="./">Início</a><span>/</span><a href="projetos">Projetos</a><span>/</span><span aria-current="page">{ONDE[slug].split(" / ")[1]}</span></nav>'
    return f'<nav class="migalha mono" aria-label="Você está em"><a href="./">Início</a><span>/</span><span aria-current="page">{ONDE.get(slug, "")}</span></nav>'

def pag_topo(n, titulo, txt, rot):
    return f'''<section class="sec pag-topo">
  {num(n, rot)}
  <div class="sec-in">
    {migalha()}
    <h1 class="pt-t">{titulo}</h1>
    <p class="pt-txt">{txt}</p>
  </div>
</section>'''

def linhas(*ls):
    return ''.join(f'<span class="l{" verm" if v else ""}"><span>{t}</span></span>' for t, v in ls)

# ---------------------------------------------------------------- páginas
def colagem():
    PRIM, LAZ = ON + ' fetchpriority="high"', ' loading="lazy" decoding="async"'
    imgs = ''.join(f'<img src="case-{k}.webp" srcset="case-{k}-700.webp 700w, case-{k}.webp {LARG.get(k, 1100)}w" sizes="(min-width: 1024px) 46vw, 92vw" width="{LARG.get(k, 1100)}" height="{ALT.get(k, 773)}" alt="Página inicial do site {n}"{PRIM if i == 0 else LAZ} data-rot="Case {i+1:02d} — {n}">' for i, (k, curto, n, *_r) in enumerate(CASES))
    return f'''<div class="colagem" id="colagem">
      {cruz("0%","0%")}{cruz("100%","0%")}{cruz("100%","100%")}
      <div class="bloco-azul" data-p="1">
        <p class="mono b-rot">WC / 26<br>Estúdio ©</p>
        <p class="mono b-case" id="bCase" aria-live="polite">Case 01 — Balneário do Caldas</p>
        <div class="b-tela"><span class="b-barra" aria-hidden="true"><i></i><i></i><i></i></span><div class="b-imgs">{imgs}</div></div>
      </div>
      <div class="faixa-sol" data-p="2" aria-hidden="true"><span>Do Cariri pro mundo · Do Cariri pro mundo · Do Cariri pro mundo ·</span></div>
      <figure class="recorte" data-p="3">
        <svg class="rec-fundo" viewBox="0 0 100 160" preserveAspectRatio="none" aria-hidden="true"><path d="M14 4 L92 0 L100 38 L94 72 L100 120 L88 158 L30 154 L0 140 L6 96 L0 52 Z"/></svg>
        <span class="rec-cel"><img src="cel-lastro.webp" width="360" height="720" alt="Estudo Lastro Advocacia aberto no celular" decoding="async"></span>
      </figure>
      <p class="fig mao" aria-hidden="true">fig. 02<svg viewBox="0 0 90 50"><path d="M84 44 C 62 14, 34 8, 8 14 M19 5 L8 14 L19 23"/></svg></p>
      <p class="coord mono"><span class="sr">Coordenadas de Juazeiro do Norte: </span>7.2131° S<br>39.3151° O</p>
    </div>'''

def pag_index():
    return head('index', 'WebCariri · Estúdio de criação de sites em Juazeiro do Norte',
                'Estúdio de criação de sites em Juazeiro do Norte, Ceará. Prévia antes de fechar, entrega em cerca de 12 dias e pagamento 50% no início e 50% na entrega.') + topo('index') + f'''
<section class="sec hero">
  {num("001")}
  <div class="sec-in hero-in">
    <h1 class="hero-t">{linhas(("Seu", 0), ("negócio", 0), ("no mapa.", 1))}</h1>
    {colagem()}
    <div class="hero-pe">
      <p class="hero-sub">Estúdio independente de criação de sites em Juazeiro do Norte. Sites com a cara do seu negócio, feitos para aparecer no Google e vender pelo WhatsApp.</p>
      <p class="mono hero-mono">Trabalhos selecionados / {ANO}<br>Sites · Landing pages · Cardápios e catálogos</p>
      <div class="hero-links">{bt("Pedir minha prévia", "Pelo WhatsApp", msg=MSG_PREVIA, cls="bt-verm")}<a class="sublinha" href="projetos">Ver projetos</a></div>
    </div>
  </div>
</section>
<section class="sec">
  {num("002", "Estúdio")}
  <div class="sec-in manif">
    <h2 class="t-forte rv">Fazemos sites para negócios que não querem <span class="verm">passar batido.</span></h2>
    <p class="manif-lado rv">Trabalhamos com donos de negócio do Cariri e de todo o Brasil. Cada site começa do zero, com a cara de quem contrata, e termina com cliente chamando no WhatsApp.</p>
    {etapas()}
  </div>
</section>
<section class="sec sec-cards" id="trabalhos">
  {num("003", "Trabalhos")}
  <div class="sec-in">
    <p class="mono rotulo">Trabalhos selecionados</p>
    {cartoes()}
  </div>
</section>
{faixa("004")}
<section class="sec" id="laboratorio">
  {num("005", "Laboratório")}
  <div class="sec-in">
    <div class="cab"><h2 class="t-cond rv">Estudos</h2><p class="cab-txt">Sites completos para marcas fictícias. Mostram o que dá para fazer em cada segmento.</p></div>
    {indice()}
  </div>
</section>
<section class="sec" id="planos">
  {num("006", "Planos")}
  <div class="sec-in">
    <div class="cab"><h2 class="t-cond rv">Investimento</h2><p class="cab-txt">Valores de partida. O valor final fica fechado antes de começar.<br><a class="sublinha" href="planos">Comparar os planos</a></p></div>
    {planos()}
  </div>
</section>
<section class="sec">
  {num("007", "Dúvidas")}
  <div class="sec-in duas">
    <h2 class="t-cond rv">Perguntas</h2>
    {faq()}
  </div>
</section>
<section class="sec depo-sec" id="depoimentos" hidden>{num("—", "Clientes")}<div class="sec-in"><h2 class="t-cond">Quem já tem site</h2><div class="depos" id="depos"></div></div></section>
''' + fim("008") + rodape()

def pag_projetos():
    return head('projetos', 'Projetos · WebCariri', 'Sites publicados pela WebCariri, como Balneário do Caldas, Criaker e Lunar Doceria, e estudos para advocacia, arquitetura, odontologia e outros segmentos.') + topo('projetos') + pag_topo('001', linhas(("Projetos", 0), ("no ar.", 1)), 'Sites no ar de clientes reais e estudos completos para outros segmentos.', 'Projetos') + f'''
<section class="sec sec-cards">
  {num("002", "Sites no ar")}
  <div class="sec-in"><p class="mono rotulo">Clientes</p>{cartoes()}</div>
</section>
<section class="sec" id="estudos">
  {num("003", "Laboratório")}
  <div class="sec-in"><div class="cab"><h2 class="t-cond rv">Estudos</h2><p class="cab-txt">Marcas fictícias, sites de verdade.</p></div>{indice()}</div>
</section>
''' + fim("004") + rodape()

def pag_como():
    precisa = ['Logo da marca, se tiver', 'Fotos do negócio, dos produtos ou do espaço', 'Serviços, cardápio ou tabela de preços', 'Endereço, horários e WhatsApp', 'Instagram e outras redes']
    lis = ''.join(f'<li><span class="mono">{i+1:02d}</span>{t}</li>' for i, t in enumerate(precisa))
    return head('como-funciona', 'Processo · WebCariri', 'Da conversa ao site no ar em cerca de 12 dias: prévia antes de fechar, criação pensada para o celular e revisão junto com você.') + topo('como-funciona') + pag_topo('001', linhas(("Do papo", 0), ("ao site no ar.", 1)), 'Da primeira conversa ao site no ar, em cerca de 12 dias. Você vê a primeira tela antes de fechar.', 'Processo') + f'''
<section class="sec">
  {num("002", "Etapas")}
  <div class="sec-in"><h2 class="sr">Etapas do projeto</h2>{passos_det()}</div>
</section>
<section class="sec">
  {num("003", "Materiais")}
  <div class="sec-in duas"><div><h2 class="t-cond rv">O que você manda</h2><p class="cab-txt">Pode mandar tudo pelo WhatsApp. Se faltar alguma coisa, a gente ajuda a resolver.</p></div><ul class="lista">{lis}</ul></div>
</section>
<section class="sec">
  {num("004", "Dúvidas")}
  <div class="sec-in duas"><h2 class="t-cond rv">Perguntas</h2>{faq()}</div>
</section>
''' + fim("005") + rodape()

def pag_planos():
    linhas_t = [
        ('Páginas', 'Uma página', 'Várias seções ou páginas', 'Sob medida'),
        ('Contato pelo WhatsApp', 1, 1, 1), ('Horários, endereço e mapa', 1, 1, 1), ('Adaptado ao celular', 1, 1, 1),
        ('Serviços, cardápio ou catálogo', 0, 1, 1), ('Galeria de fotos', 0, 1, 1), ('Estrutura preparada para o Google', 0, 1, 1),
        ('Pedidos, reservas ou agendamento', 0, 0, 'Conforme o escopo'), ('Interações personalizadas', 0, 0, 1),
    ]
    def cel(v):
        if v == 1: return '<td role="cell"><span class="ok" role="img" aria-label="Incluído">+</span></td>'
        if v == 0: return '<td role="cell" class="nao"><span role="img" aria-label="Não incluído">—</span></td>'
        return f'<td role="cell">{v}</td>'
    corpo = ''.join(f'<tr role="row"><th scope="row" role="rowheader">{l[0]}</th>{cel(l[1])}{cel(l[2])}{cel(l[3])}</tr>' for l in linhas_t)
    cols = ''.join(f'<th scope="col" role="columnheader">{n}</th>' for n, *_r in PLANOS)
    tabela = f'<div class="tabela-wrap"><table class="tabela" role="table" aria-label="Comparação dos planos"><thead role="rowgroup"><tr role="row"><th scope="col" role="columnheader" class="mono">Recurso</th>{cols}</tr></thead><tbody role="rowgroup">{corpo}</tbody></table></div>'
    manut = f'<div class="texto"><p>No começo a hospedagem é gratuita. Se o site crescer muito em acessos, indicamos uma hospedagem dedicada, em torno de R$ 80 por mês.</p><p>Atualizações e suporte podem entrar num plano mensal, combinado conforme o seu site.</p>{zap("Olá, WebCariri! Quero saber sobre manutenção do site.", "Perguntar sobre manutenção", "sublinha")}</div>'
    return head('planos', 'Planos e investimento · WebCariri', 'Landing Express a partir de R$ 497, Site Profissional a partir de R$ 897 e Site Premium a partir de R$ 1.497. Pagamento 50% no início e 50% na entrega.') + topo('planos') + pag_topo('001', linhas(("Planos e", 0), ("investimento.", 1)), 'Valores de partida. O valor final fica fechado antes de começar.', 'Planos') + f'''
<section class="sec">
  {num("002", "Investimento")}
  <div class="sec-in"><h2 class="sr">Planos e valores</h2>{planos()}</div>
</section>
<section class="sec" id="comparar">
  {num("003", "Comparação")}
  <div class="sec-in"><div class="cab"><h2 class="t-cond rv">Compare</h2></div>{tabela}</div>
</section>
<section class="sec">
  {num("004", "Depois")}
  <div class="sec-in duas"><h2 class="t-cond rv">Depois do lançamento</h2>{manut}</div>
</section>
''' + fim("005") + rodape()

def pag_parceiros():
    itens = [('Sites institucionais', 'Uma presença própria para os clientes da sua agência.'), ('Landing pages', 'Páginas para uma oferta ou campanha, prontas para receber tráfego.'), ('Projetos sob medida', 'Escopo, prazo e responsabilidades combinados em cada projeto.')]
    cols = ''.join(f'<article class="srv rv"><p class="mono">{i+1:02d}</p><h3>{t}</h3><p>{d}</p></article>' for i, (t, d) in enumerate(itens))
    comeco = f'<div class="texto"><p>Você apresenta o perfil dos seus clientes e o tipo de demanda. Combinamos juntos o formato da parceria, o fluxo de atendimento e a entrega.</p>{zap("Olá, WebCariri! Tenho uma agência e quero conversar sobre parceria.", "Conversar sobre parceria", "sublinha")}</div>'
    return head('parceiros', 'Para agências · WebCariri', 'Sua agência cuida da estratégia e a WebCariri entra com design e desenvolvimento de sites, landing pages e projetos sob medida.') + topo('parceiros') + pag_topo('001', linhas(("Para", 0), ("agências.", 1)), 'Sua agência cuida da estratégia. A WebCariri entra com o design e o desenvolvimento dos sites.', 'Parceria') + f'''
<section class="sec">
  {num("002", "Serviços")}
  <div class="sec-in"><h2 class="sr">O que fazemos para agências</h2><div class="servicos">{cols}</div></div>
</section>
<section class="sec">
  {num("003", "Começo")}
  <div class="sec-in duas"><h2 class="t-cond rv">Como começamos</h2>{comeco}</div>
</section>
''' + fim("004") + rodape()

def pag_contato():
    chips = ''.join(f'<label><input type="radio" name="plano" value="{o}"{" checked" if i == 0 else ""}><span>{o}</span></label>' for i, o in enumerate(['Ainda não sei', 'Landing Express', 'Site Profissional', 'Site Premium', 'Parceria', 'Manutenção']))
    return head('contato', 'Contato · WebCariri', f'Fale com a WebCariri pelo WhatsApp {ZAP_TXT} e peça uma prévia do site do seu negócio.') + topo('contato') + pag_topo('001', linhas(("Vamos", 0), ("conversar.", 1)), 'Conte um pouco do seu negócio. A mensagem sai pronta para o WhatsApp.', 'Contato') + f'''
<section class="sec">
  {num("002", "Formulário")}
  <div class="sec-in contato">
    <form class="form" id="form" novalidate>
      <label class="campo"><span class="mono">01 / Seu nome</span><input name="nome" required autocomplete="name" maxlength="100"></label>
      <label class="campo"><span class="mono">02 / Nome do negócio</span><input name="negocio" required autocomplete="organization" maxlength="140"></label>
      <label class="campo"><span class="mono">03 / Instagram do negócio (opcional)</span><input name="insta" maxlength="80"></label>
      <fieldset class="escolha"><legend class="mono">04 / O que você procura</legend><div class="chips">{chips}</div></fieldset>
      <label class="campo"><span class="mono">05 / Algo mais (opcional)</span><textarea name="nota" rows="3" maxlength="1200"></textarea></label>
      <p class="form-erro" id="formErro" role="alert" hidden>Preencha seu nome e o nome do negócio.</p>
      <button class="bt bt-verm" type="submit"><span class="bt-t">Enviar pelo WhatsApp</span><span class="bt-s mono">A mensagem sai pronta</span>{PONTO}</button>
      <p class="form-nota mono">Nada é salvo aqui. O WhatsApp abre com a mensagem e você decide se envia.</p>
    </form>
    <aside class="contato-info">
      <p class="mono">WhatsApp</p>{zap(MSG, ZAP_TXT, "ci-link")}
      <p class="mono">Instagram</p><a class="ci-link" href="https://www.instagram.com/awebcariri/" target="_blank" rel="noopener">@awebcariri</a>
      <p class="mono">Onde estamos</p><p class="ci-txt">Juazeiro do Norte, Ceará.<br>7.2131° S / 39.3151° O<br>Atendimento online para todo o Brasil.</p>
    </aside>
  </div>
</section>
''' + rodape()

def pag_404():
    return head('404', 'Página não encontrada · WebCariri', 'Esta página não existe no site da WebCariri.') + topo('404') + pag_topo('404', linhas(("Página", 0), ("fora do mapa.", 1)), 'O endereço pode ter mudado. <a class="sublinha" href="./">Voltar ao início</a>', 'Fora do mapa') + rodape()

def pag_case(i):
    k, curto, n, seg, url, dom, cor, txt = CASES[i]
    inf = CASE_INFO[k]
    tem = ''.join(f'<li><span class="mono">{j+1:02d}</span>{t}</li>' for j, t in enumerate(inf['tem']))
    meta = f'''<dl class="case-meta mono">
      <div><dt>Cliente</dt><dd>{n}</dd></div><div><dt>Segmento</dt><dd>{seg.split(" · ")[0]}</dd></div>
      <div><dt>Cidade</dt><dd>{inf["cidade"]}</dd></div><div><dt>Endereço</dt><dd>{dom}</dd></div>
    </dl>'''
    return head(k, f'{n} · Projetos · WebCariri', f'Case {n}: site criado pela WebCariri. {txt}') + topo(k) + f'''
<section class="sec pag-topo case-topo">
  {num(f"{i+1:02d}", "Case")}
  <div class="sec-in">
    {migalha()}
    <h1 class="pt-t">{linhas(*inf["h1"])}</h1>
    <p class="pt-txt">{txt}</p>
    {meta}
    <div class="hero-links">{bt("Visitar o site", dom, href=url, ext=True)}<a class="sublinha" href="projetos">Ver todos os projetos</a></div>
  </div>
</section>
<section class="sec">
  {num("02", "O site")}
  <div class="sec-in"><div class="case-tela case-{inf["cor"]} rv"><span class="mono ct-rot">{dom}</span><div class="ct-jan"><span class="b-barra" aria-hidden="true"><i></i><i></i><i></i></span><img src="case-{k}.webp" srcset="case-{k}-700.webp 700w, case-{k}.webp {LARG.get(k, 1100)}w" sizes="(min-width: 1024px) 80vw, 100vw" width="{LARG.get(k, 1100)}" height="{ALT.get(k, 773)}" decoding="async" alt="Página inicial do site {n}"></div></div></div>
</section>
<section class="sec">
  {num("03", "O pedido")}
  <div class="sec-in duas"><h2 class="t-cond rv">O pedido</h2><div class="texto"><p class="case-pedido">{inf["pedido"]}</p></div></div>
</section>
<section class="sec">
  {num("04", "Entrega")}
  <div class="sec-in duas"><h2 class="t-cond rv">O que o site tem</h2><ul class="lista">{tem}</ul></div>
</section>
''' + fim("05") + rodape()

PAGS = {'index': pag_index, 'projetos': pag_projetos, 'como-funciona': pag_como, 'planos': pag_planos, 'parceiros': pag_parceiros, 'contato': pag_contato, '404': pag_404,
        'caldas': lambda: pag_case(0), 'criaker': lambda: pag_case(1), 'lunar': lambda: pag_case(2)}

def html_links(h):
    # --html: links com .html e caminhos relativos, para abrir direto da pasta
    return re.sub(r'href="(projetos|como-funciona|planos|parceiros|contato|caldas|criaker|lunar)(#[^"]*)?"', lambda m: f'href="{m.group(1)}.html{m.group(2) or ""}"', h)

def da_raiz(h):
    # Vercel: tudo a partir da raiz (/projetos, /style.css). Sem redirecionamento do .html para o endereço limpo,
    # e a página 404 funciona em qualquer endereço, inclusive com barra no meio (/qualquer/coisa).
    h = re.sub(r'((?:href|src|data-img)=")(?!https?:|/|#|mailto:|tel:|data:)(?:\./)?', r'\1/', h)
    return re.sub(r'((?:srcset|imagesrcset)=")([^"]+)"', lambda m: m.group(1) + ', '.join('/' + p.strip() for p in m.group(2).split(',')) + '"', h)

saida = html_links if LOCAL else da_raiz
for slug, fn in PAGS.items():
    open(slug + '.html', 'w', encoding='utf-8', newline='\n').write(saida(fn()))
open('sitemap.xml', 'w', newline='\n').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    ''.join(f'  <url><loc>{SITE}{"/" if s == "index" else "/" + s}</loc><lastmod>{HOJE}</lastmod></url>\n' for s in PAGS if s != '404') + '</urlset>\n')
open('robots.txt', 'w', newline='\n').write(f'User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n')
print('ok:', ', '.join(s + '.html' for s in PAGS))
print('links:', 'com .html, para abrir direto da pasta. Antes de subir para a Vercel, rode sem --html.' if LOCAL else 'limpos, a partir da raiz (prontos para a Vercel). Para ver no computador: python3 servir.py')
