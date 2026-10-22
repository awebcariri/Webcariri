# WebCariri — site (React + TypeScript + Vite)

Implementação do redesign descrito no PDF **WebCariri-Redesign-Desktop-Mobile** (15/10/2026), com a identidade do kit **WebCariri + Cari**.
Dez rotas e uma página 404, versões desktop e mobile, pronto para a Vercel.

| Rota | Página |
| --- | --- |
| `/` | Início (o antigo `/inicio` redireciona para cá) |
| `/projetos` | Projetos |
| `/como-funciona` | Processo |
| `/planos` | Planos |
| `/parceiros` | Para agências |
| `/contato` | Contato |
| `/caldas`, `/criaker`, `/lunar`, `/efraim` | Cases |

Qualquer outro endereço mostra a página 404 do site.

---

## Rodar no computador

Precisa do Node 18 ou mais novo.

```bash
npm install
```

```bash
npm run dev
```

Abra http://localhost:5173. As alterações aparecem na hora.

Outros comandos:

- `npm run typecheck` — confere os tipos do TypeScript.
- `npm run build` — verifica os tipos, gera os bundles de navegador e pré-renderização e cria um HTML completo por rota com conteúdo, título, descrição e prévia próprios (`scripts/prerender.mjs`). O navegador hidrata esse HTML para ativar as interações.
- `npm run verify:seo` — verifica as 12 páginas geradas, metadados por rota, dados estruturados, redirecionamentos configurados e sitemap.
- `npm run preview` — abre a versão de produção gerada em `dist/`.
- `node scripts/verify-browser.mjs` — com o preview em execução, testa as dez rotas em 390 e 1440px, hidratação, Cari, menu, abertura e conteúdo sem JavaScript. Usa o Chrome instalado; aceita `CHROME_PATH` e `PREVIEW_URL`. Capturas ficam em `.prerender-ssr/screenshots/` (ignorada pelo Git).

A integração contínua em `.github/workflows/seo-check.yml` executa instalação pelo lockfile, typecheck, build e verificação de SEO nos pull requests e pushes para main. Nenhuma dependência foi adicionada para a pré-renderização.

O bundle `.prerender-ssr/` só é usado durante o build; a publicação continua estática. O sitemap não usa datas de atualização artificiais. Os dados estruturados representam a WebCariri como `Organization`, com atendimento online, sem endereço de estabelecimento físico.

---

## Onde editar (VS Code ou Antigravity)

```
src/
  config/site.ts        WhatsApp, Instagram, cidade, mensagens prontas de cada botão, menu
  content/conteudo.ts   planos, preços, comparativo, perguntas, etapas, cases, estudos, opções do formulário
  content/seo.json      título e descrição de cada página (Google e WhatsApp)
  pages/                uma página por arquivo (Inicio.tsx, Projetos.tsx, CaseCaldas.tsx...)
  components/           cabeçalho, rodapé, Cari assistente, abertura, ícones, captura ampliável
  styles/
    base.css            cores, fontes, tamanhos de título, botões, balões, acordeão
    layout.css          cabeçalho, menu do celular, rodapé, Cari, abertura
    paginas.css         Início e Projetos (+ tamanho dos títulos de cada página)
    processo.css  planos.css  parceiros.css  contato.css  cases.css
public/
  fonts/                Bricolage Grotesque, DM Sans, Fraunces Italic (WOFF2) + licenças OFL; DM Mono e Nothing You Could Do (já usadas no site anterior)
  img/marca/            logos webcariri. e wc.
  img/cari/             poses da Cari (WebP)
  img/stickers/         stickers do kit (WebP)
  img/projetos/         capturas reais de Caldas, Criaker, Lunar e dos estudos
  og.jpg, favicon.ico, apple-touch-icon.png, icon-192/512.png, site.webmanifest, robots.txt, sitemap.xml
```

- **Trocar um texto ou preço:** `src/content/conteudo.ts`. Os itens marcados com `REVISAR` aguardam confirmação.
- **Trocar o WhatsApp:** só `src/config/site.ts` (`whatsappNumero` e `whatsappExibicao`). Todos os botões usam esse número.
- **Cores e fontes:** variáveis no topo de `src/styles/base.css` (`--creme`, `--tomate`, `--amarelo`, `--vinho`, `--preto`).
- **Largura do conteúdo:** `--largura` em `base.css` (1320px, ver "Decisões").
- **Tamanho do título principal de cada página:** final de `src/styles/paginas.css` (`--h1` no desktop, `--h1-m` no celular).
- **Trocar uma imagem:** substitua o arquivo em `public/img/...` mantendo o nome, ou aponte o novo caminho em `conteudo.ts`.

---

## Banners de compartilhamento (WhatsApp, Instagram, Facebook, LinkedIn)

Cada página tem um banner próprio em `public/og/`. A página inicial usa `capa-webcariri.jpg` (1600x900), a capa fornecida pela WebCariri, preservada sem cortes. As demais usam os banners gerados de 1200x630 (planos.jpg, caldas.jpg...). É a imagem indicada quando alguém compartilha o link no WhatsApp, no direct do Instagram, no Facebook ou no LinkedIn.

A capa original não é sobrescrita por `npm run og`. Para trocá-la, substitua `public/og/capa-webcariri.jpg`; se mudar as dimensões, atualize também `index.html` e `scripts/prerender.mjs`.

- **Textos e imagens dos banners:** `scripts/og/banners.mjs`. **Visual:** `scripts/og/modelo.html`.
- **Gerar de novo:** `npm run og` (usa o Google Chrome instalado no computador; para outro caminho, defina `CHROME_PATH`). Depois faça commit dos JPGs.
- **Página nova:** acrescente um item em `banners.mjs` com o nome da rota (ex.: `efraim` para `/efraim`) e rode `npm run og`. Sem banner próprio, a página usa o da Início.
- **Cache do WhatsApp:** o build coloca `?v=` com um código do arquivo na URL da imagem. Mudou o banner, muda o código, e o WhatsApp busca a imagem nova. Links já enviados antes continuam com a prévia antiga.
- **Conferir uma prévia:** cole o link em https://developers.facebook.com/tools/debug/ e clique em "Extrair novamente" (vale para WhatsApp e Instagram, que usam o mesmo leitor).

## Publicar na Vercel

1. Suba o projeto para o GitHub.
2. Na Vercel: **Add New → Project**, escolha o repositório. A Vercel reconhece Vite; o `vercel.json` já define `npm run build` e a pasta `dist`.
3. Em **Domains**, deixe `www.webcariri.com.br` como principal e o endereço sem `www` redirecionando para ele.
4. Depois de publicar: envie `https://www.webcariri.com.br/sitemap.xml` no Google Search Console.

O `vercel.json` mantém os redirecionamentos antigos (`/portfolio` → `/projetos`, `/servicos` → `/planos`), cache longo para fontes e scripts, e cabeçalhos básicos de segurança. Cada rota tem seu próprio HTML completo (gerado no build), servido por `cleanUrls`, sem rewrite global para a página inicial. Se a prévia antiga continuar aparecendo no WhatsApp, compartilhe com `?v=2` no fim do link.

Antes de publicar, execute `npm run typecheck`, `npm run build` e `npm run verify:seo`, e revise o preview. Os redirecionamentos e o status HTTP 404 precisam também ser conferidos no preview da Vercel; o servidor local do Vite não executa as regras de `vercel.json`.

Não há variáveis de ambiente: nenhuma integração precisa de chave hoje, por isso não há `.env.example`.

---

## Comportamentos

- **Menu do celular:** abre em tela cheia, mantém o foco dentro, fecha com Esc (o foco volta ao botão) e ao trocar de página.
- **Abertura:** aparece a cada carregamento do site (abrir, recarregar ou chegar por um link), não ao navegar pelo menu. Tela preta, logotipo revelado da esquerda para a direita, ponto tomate por último, linha de carregamento e a tela subindo (cerca de 2,4 s, rolagem travada só durante esse tempo). Com "reduzir movimento" no aparelho, mostra o logotipo parado e esmaece (cerca de 1,2 s). Edite `src/components/Abertura.tsx` e o bloco "abertura" em `src/styles/layout.css`.
- **Entradas suaves:** blocos sobem de leve ao aparecer. Sem JavaScript ou com movimento reduzido, tudo aparece direto.
- **Formulário de contato:** nome e nome do negócio são obrigatórios. Erros aparecem junto do campo e o foco vai para o primeiro inválido. Ao enviar, o site **prepara** a mensagem e abre o WhatsApp em outra aba; a tela diz que a mensagem ainda não foi enviada. Nada passa por servidor.
- **Planos → contato:** "Quero este plano" abre `/contato?plano=...` com a opção marcada; "Para agências" abre com "Parceria".
- **Cases:** a captura do site abre ampliada ao clicar. "Visitar o site" abre o site do cliente em nova aba.
- **Projetos:** "Clientes reais" e "Estudos autorais" são âncoras; a ativa acompanha a rolagem.

### Cari, assistente virtual

O avatar no canto abre a Cari só quando a pessoa toca (nunca sozinha). Desktop: painel lateral compacto. Celular: painel largo com fechar sempre visível.

**Hoje ela funciona com caminhos e respostas prontas** (Quero um site / Ver projetos / Falar com a equipe), escritos com o conteúdo aprovado do site. O painel avisa: "Respostas prontas, sem IA. Nada do que você escolhe aqui é enviado."

Para ligar uma IA no futuro:

1. Crie uma função no servidor (ex.: `api/cari.ts` na Vercel) que chame o modelo com a chave guardada em variável de ambiente da Vercel. **Nunca** coloque a chave no código do navegador.
2. Dê à função só a base comercial aprovada (`src/content/conteudo.ts` e `05-Guias/Cari-Guia-do-Assistente.md` do kit) e a regra "Vou deixar isso com a equipe para confirmar com você."
3. Adicione um aviso de privacidade no painel antes de enviar qualquer texto da pessoa.
4. Só então crie o `.env.example` com o nome da variável.

---

## Decisões em relação ao PDF

- **Largura do conteúdo:** o guia fala em 1200px, mas as pranchas mostram o conteúdo ocupando cerca de 92% de 1440px. Para bater com as pranchas usei 1320px (margens de 60px em 1440). Para voltar a 1200px, troque `--largura` em `base.css`.
- **Escala do texto:** os títulos foram medidos nas pranchas (largura e altura das letras). O texto corrido ficou entre 16 e 19px, como pede o guia; nas pranchas ele aparece um pouco maior.
- **Cabeçalho e rodapé:** cada prancha desenha um rodapé diferente. Unifiquei em um só (logo e "Do Cariri pro mundo.", cidade, Instagram, WhatsApp, menu e direitos), baseado nas pranchas de Planos e Contato. A data escrita no rodapé de algumas pranchas foi omitida.
- **Botões tomate:** seguem as pranchas. Texto creme sobre tomate tem contraste de 3,6:1 (passa em texto grande, não em texto pequeno). Links e textos pequenos em tomate usam um tom mais escuro (`--tomate-texto`, 4,8:1). Para contraste AA estrito em todos os botões, use a classe `btn--vinho`.
- **Balões manuscritos** ("Sites, ideias, pessoas, negócios em movimento" etc.): são texto real em HTML com a Bricolage condensada, não imagens, porque não vieram no kit.
- **Fotos do Processo:** as pranchas mostram notebook com caneca, tela de código e a Chapada. Não vieram no kit e o guia pede para não apresentá-las como fotos reais; no lugar, cada etapa usa uma composição com stickers do kit, e a etapa "Prévia" usa uma mini prévia em HTML.
- **Mobile do Processo:** o detalhe das quatro etapas fica em blocos expansíveis (o guia permite). Na Início, as quatro primeiras dúvidas aparecem e "Ver mais dúvidas" mostra as outras.

### O que não estava no kit (substituído e sinalizado)

| Na prancha | No site |
| --- | --- |
| Cari espiando por cima de uma linha (Projetos, Caldas), deitada (Caldas, Lunar), de cabeça inclinada (Lunar), em linha (Caldas) | poses do kit: `cari-curioso`, `cari-saudando`, `cari-no-notebook` |
| Fotos ilustrativas do Processo | composições com stickers do kit |
| Capturas de celular dos sites dos clientes (cases no mobile) | a captura desktop real, ajustada à largura e ampliável |
| Foto de doces e da piscina em "Próximo projeto" | capturas reais da Lunar e do Caldas |
| Fonte mono dos rótulos e fonte dos balões manuscritos | DM Mono (já usada no site anterior) e Bricolage condensada |

Se houver essas imagens, basta colocá-las em `public/img/` e trocar o caminho na página.

---

## Para revisar antes de publicar

Preços e condições (confirmar na data de lançamento):

- Landing Express a partir de R$ 497; Site Profissional a partir de R$ 897; Site Premium a partir de R$ 1.497; pagamento 50% no início e 50% na entrega.
- Hospedagem gratuita para começar e hospedagem dedicada "em torno de R$ 80 por mês" se o site crescer (texto do site atual, usado na resposta da FAQ).
- Manutenção: a prancha diz "planos de manutenção para atualizações, ajustes e suporte contínuo". Confirmar escopo.
- Prazo: "cerca de 12 dias, conforme escopo e materiais", apresentado como prazo médio, não garantido.

Textos que eu ajustei para não prometer o que não está confirmado:

- Início, etapa "No ar": a prancha dizia "com todo o suporte para crescer"; ficou "Seu site pronto, revisado e publicado, com orientação para os próximos passos".
- Projetos, convite: a prancha dizia "um site que gera resultados"; ficou "um site com a cara do seu negócio".
- Lunar, convite: a prancha dizia "Resultados reais."; ficou "Presença com propósito.".
- Para agências: "com qualidade e no prazo" virou "no prazo combinado".
- Respostas da FAQ: a prancha só tem as perguntas. As respostas usam apenas informações publicadas no site atual; confirmar as de alterações, Google, domínio/hospedagem e criação de conteúdo.
- Divisão "Sua agência / WebCariri": proposta de comunicação, combinada por projeto (o guia pede validação).
- Nos planos, os itens resumidos da Início seguem a prancha; a página de Planos usa a lista completa do site atual.
- Case Efraim (`/efraim`): não estava no PDF. Segue o modelo do Caldas; desafio e entregas foram escritos a partir do site publicado e precisam de revisão. A Início passou a mostrar 4 projetos (a prancha tinha 3).

---

## Verificação feita

- `npm run build` e `npm run typecheck` sem erros.
- Capturas de todas as rotas em 360, 390, 768, 1024 e 1440px, comparadas com as pranchas; nenhuma página tem rolagem horizontal.
- Testes automatizados (Chrome headless) na versão de produção: menu do celular (foco, Esc, retorno do foco), alvos de toque, FAQ, formulário vazio/com erro/válido e mensagem preparada, link do WhatsApp com o número e o texto certos, Cari no celular e no desktop, âncoras de Projetos, imagem ampliada dos cases, rotas diretas e 404, movimento reduzido. Sem erros de JavaScript.

Não testado: leitores de tela reais (VoiceOver/TalkBack), Safari/iPhone físico e a abertura real do aplicativo do WhatsApp.

## Fontes e licenças

Bricolage Grotesque, DM Sans, Fraunces, DM Mono e Nothing You Could Do são OFL. As licenças das três fontes do kit estão em `public/fonts/`.
O site anterior (HTML gerado pelo `build.py`) continua no histórico do Git, no commit `69c6938`.
