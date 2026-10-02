# WebCariri — site (versão estática)

HTML, CSS e JS puros, sem build. Todos os arquivos ficam na raiz, prontos para a Vercel (`vercel.json` com `cleanUrls`).
As rotas antigas continuam valendo: /projetos, /como-funciona, /planos, /parceiros e /contato.

## Páginas
index, projetos, como-funciona, planos, parceiros, contato e 404 (a Vercel usa o 404.html sozinha).
Cases com página própria: caldas, criaker e lunar. Os dados de cada case ficam em `CASE_INFO`, no `build.py`.
Cada página tem título, descrição, canonical e Open Graph próprios. `sitemap.xml` e `robots.txt` incluídos.

## Editar
- Textos, cases, estudos, planos e FAQ: `build.py`. Depois de editar, rode `python3 build.py` para gerar os HTML.
  - Mexeu no `style.css` ou no `main.js`? Rode `python3 build.py` também: ele troca o número de versão (`?v=`) e ninguém fica com o arquivo antigo no cache.
  - Não edite os `.html` na mão: o `build.py` escreve por cima.
- Ver no computador: `python3 servir.py` e abra http://localhost:8000. Ele serve os endereços sem `.html` e a página 404, igual à Vercel.
  - Para abrir os arquivos direto da pasta, sem servidor: `python3 build.py --html`. Antes de subir, rode `python3 build.py` de novo (o `verificar_deploy.py` avisa se esquecer).
- WhatsApp e depoimentos: `main.js`, no topo (`WC.whatsapp` e `WC.depoimentos`).
  A seção de depoimentos aparece sozinha na página inicial quando a lista tiver pelo menos um item.
- Cores e layout: `style.css`. Linha editorial: fundo papel, tinta quase preta, linhas finas e seções numeradas (001, 002…). Três cores de impacto: vermelho `#E8401C`, azul `#1D47E0` e o Sol da marca `#F2B233`.
- Fontes hospedadas no próprio site, sem Google Fonts:
  - Big Shoulders: títulos condensados.
  - Instrument Sans: texto.
  - DM Mono: rótulos.
  - TeX Gyre Heros Cn itálico: faixa "Pensa, cria, publica".
  - Nothing You Could Do: anotações à mão.
  - Poppins Bold: só no logo "wc.".
- `cel-lastro.webp` é o print de celular do estudo Lastro usado na colagem do topo.

## Google (SEO)
- Título de cada página: assunto primeiro e "WebCariri" no fim (`ABA`, no `build.py`). Descrição, canonical e Open Graph próprios.
- Links internos já no endereço final (`/projetos`), sem passar pelo redirecionamento do `.html`.
- Dados estruturados (schema.org): na página inicial, o estúdio (cidade, telefone, planos com valor de partida) e as perguntas; nas outras, a trilha "Início / Projetos / Caldas".
- `sitemap.xml` e `robots.txt` gerados pelo `build.py`.
- O endereço oficial é `https://www.webcariri.com.br` (com www). Na Vercel, deixe o `www` como domínio principal e o endereço sem www redirecionando para ele.
- Depois de publicar: cadastre o site no Google Search Console e envie o `sitemap.xml`.

## Navegação
- Celular: a barra de cima (logo e Menu) aparece só no topo da página inicial e não fica fixa (sai ao rolar). Nas outras páginas e durante a troca ela não aparece. Barra de abas fixa embaixo (Início, Projetos, Processo, Planos e Contato), com o ponto amarelo marcando a página atual. O botão Menu leva a todas as páginas.
- Computador: menu no topo. Ao passar o mouse em "Projetos", abre a lista dos cases com miniatura.
- Toda página interna tem a trilha "Início / Projetos / Caldas" e termina com um bloco de "Próxima página" ou "Próximo case".
- Botões sem setas: no lugar delas fica o ponto amarelo da marca, que cresce até preencher o botão no hover. Os links de texto têm um grifo amarelo.

## Desempenho e iPhone
- Nenhum elemento passa da largura da tela (o `main` corta qualquer sobra). Isso evita o "zoom de PDF" do Safari no iPhone.
- `format-detection` desliga o link automático do iOS no telefone. Respeita o notch e a barra de baixo (safe areas). Sem zoom por toque duplo.
- No iPhone e no iPad, o hover só vale com mouse; no toque, a resposta vem na hora (`:active`).
- Fontes em WOFF2 com subconjunto de caracteres (82 KB no total). Imagens em duas larguras (700 px e 1100 px) com `srcset`. A imagem do topo é pré-carregada e o resto carrega sob demanda.
- `vercel.json` com cache longo para fontes, imagens, CSS e JS, e cabeçalhos básicos de segurança.
- `.vercelignore` deixa de fora os arquivos de trabalho (`build.py`, `servir.py`, `verificar_deploy.py`, `README.md`).
- Tabela de planos: no celular vira grade (o recurso em cima, os três planos embaixo), sem rolagem lateral.
- Texto de rótulo com 12 px no mínimo e vermelho mais escuro (`--verm-t`) no texto pequeno, para dar contraste.
- Se o `main.js` não carregar, o conteúdo aparece do mesmo jeito, só sem as animações.
- Transição entre páginas nativa onde o navegador suporta (Chrome e Safari 18.2+). O cabeçalho e as abas ficam parados e o ponto amarelo desliza até a aba nova. Nos iPhones mais antigos, entra uma cortina rápida.

## Rolagem
- As páginas trocam sem recarregar. O site busca a página nova (já no toque ou na passagem do mouse), troca o conteúdo atrás de uma cortina, coloca no topo e revela.
  - O cabeçalho e as abas ficam parados durante a troca.
  - O botão voltar devolve ao ponto em que você estava.
  - Se algo falhar, o link abre do jeito normal.
- Computador: rolagem suave com a roda do mouse. Ela cede na hora para a barra de rolagem, o teclado e os links.
- Trabalhos:
  - Computador: a seção fica presa na tela e os cases passam na horizontal conforme você rola, com contador e barra de progresso.
  - Celular: os cards se empilham, e o de baixo encolhe e escurece quando o próximo passa por cima.
- Título do topo com as três linhas deslizando em sentidos opostos.
- Barra vermelha de leitura no pé do cabeçalho.
- Print dos cases com zoom de saída.
- O bloco "Próxima página" se pinta de amarelo até o fim da página.

## Movimento
- Título que sobe linha por linha. Os títulos das seções sobem letra por letra e as frases grandes, palavra por palavra.
- Linhas das seções e da margem que se desenham ao rolar.
- Imagens dos cases que se revelam de baixo para cima com um leve zoom de saída. Parallax suave nas camadas da colagem.
- Colagem do topo:
  - O bloco azul se revela e os três sites no ar se revezam dentro dele.
  - O celular cai no lugar.
  - As camadas acompanham o mouse em profundidades diferentes.
  - A faixa amarela corre com "Do Cariri pro mundo".
- Etapas do processo com linhas que se desenham.
- Cases em blocos de cor com zoom no hover, e um rabisco que se desenha no card "O seu".
- Faixa preta: "Pensa, cria, publica" desliza para lados opostos conforme a rolagem.
- Índice de estudos: no computador, uma prévia do site segue o mouse; no celular, cada linha tem miniatura.
- Sol que nasce no bloco final.
- Menu do celular em tela cheia.
- Transição entre páginas em cortina.
- Com "reduzir movimento" ativado no aparelho, tudo fica estático.

## Pendências
- [ ] Depoimentos reais (nome, negócio e frase). Não há nenhum inventado no site.
- [ ] Links públicos dos estudos Vão, Nácar, Quadra e Navalha (hoje aparecem como "Em breve").
      Os endereços com "-webcariri.vercel.app" pedem login: use o domínio de produção de cada projeto.
      Atenção: vao-arquitetura.vercel.app, nacar.vercel.app, quadra.vercel.app e navalha.vercel.app são de outras pessoas.
- [ ] Uma foto sua ou do estúdio, se quiser incluir na apresentação.
- [ ] CNPJ e e-mail para o rodapé, se quiser exibir.
- [ ] Analytics (Vercel Analytics ou Google Analytics) e perfil no Google Meu Negócio.

## Publicar
Rode `python3 build.py` e depois `python3 verificar_deploy.py`. Com o OK, suba todos os arquivos da pasta (substituindo o projeto React atual).
