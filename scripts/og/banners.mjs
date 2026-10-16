// Conteúdo dos banners de compartilhamento, um por rota (inicio = "/").
// Editou? Rode `npm run og` para gerar os JPGs de novo.
const cariNotebook = { pose: 'no-notebook', estilo: 'left:-40px;bottom:-16px;width:330px' };
const balaoPadrao = { texto: 'Sites<br>ideias<br>pessoas<br>negócios<br>em movimento', estilo: 'right:14px;top:30px' };

export const BANNERS = {
  inicio: {
    rotulo: 'Estúdio criativo digital',
    titulo: 'Seu negócio<br>merece <em>presença.</em>',
    sub: 'Sites do Cariri para todo o Brasil',
    tela: 'img/projetos/hero-efraim.webp',
    recorte: 2.14,
    telaTopo: 120,
    cari: cariNotebook,
    balao: balaoPadrao,
  },
  projetos: {
    rotulo: 'Projetos',
    titulo: 'Ideias que já<br>estão <em>no ar.</em>',
    sub: 'Caldas, Criaker, Lunar, Efraim e estudos autorais',
    tela: 'img/projetos/caldas-hd.webp',
    cari: { pose: 'curioso', estilo: 'left:-30px;bottom:-30px;width:250px' },
    balao: { texto: 'Sites<br>que conectam<br>o Cariri<br>e mais longe', estilo: 'right:12px;top:28px' },
  },
  'como-funciona': {
    rotulo: 'Como funciona',
    titulo: 'Do papo<br><em>ao site no ar.</em>',
    sub: 'Você vê a primeira tela antes de fechar',
    chips: ['Conversa', 'Prévia', 'Criação', 'No ar'],
    cari: { pose: 'no-notebook', estilo: 'left:10px;bottom:10px;width:470px' },
    balao: { texto: 'Sites<br>que colocam<br>o Cariri no<br>mapa', estilo: 'right:20px;top:36px' },
  },
  planos: {
    rotulo: 'Planos e investimento',
    titulo: 'Seu próximo passo<br><em>começa aqui.</em>',
    tituloTamanho: 74,
    chips: ['Landing <b>R$&nbsp;497</b>', 'Profissional <b>R$&nbsp;897</b>', 'Premium <b>R$&nbsp;1.497</b>'],
    cari: { pose: 'no-notebook', estilo: 'left:10px;bottom:10px;width:470px' },
    balao: { texto: '50% no início<br>50% na entrega', estilo: 'right:20px;top:36px' },
  },
  parceiros: {
    rotulo: 'Para agências',
    titulo: 'Sua estratégia.<br><em>Nosso design<br>e código.</em>',
    tituloTamanho: 74,
    cari: { pose: 'no-notebook', estilo: 'left:10px;bottom:10px;width:470px' },
    balao: { texto: 'Sites para os<br>clientes da<br>sua agência', estilo: 'right:20px;top:36px' },
  },
  contato: {
    rotulo: 'Contato',
    titulo: 'Bora dar vida<br><em>à sua ideia?</em>',
    sub: 'WhatsApp (88) 99976-1315 · @awebcariri',
    cari: { pose: 'saudando', estilo: 'left:70px;bottom:-40px;width:380px' },
    sol: 'right:40px;top:50px;width:150px',
    faiscas: 'left:40px;top:70px;transform:rotate(-30deg)',
  },
  caldas: {
    rotulo: 'Case · Turismo e lazer · Barbalha',
    titulo: 'Balneário<br><em>do Caldas.</em>',
    sub: 'Site Premium para planejar o próximo passeio',
    tela: 'img/projetos/caldas-hd.webp',
    cari: { pose: 'curioso', estilo: 'left:-30px;bottom:-30px;width:230px' },
  },
  criaker: {
    rotulo: 'Case · Agência · Juazeiro do Norte',
    titulo: 'Criaker<em>.</em>',
    tituloTamanho: 120,
    sub: 'Site Premium com a personalidade da agência',
    tela: 'img/projetos/criaker-hd.webp',
    cari: { pose: 'curioso', estilo: 'left:-30px;bottom:-30px;width:230px' },
  },
  lunar: {
    rotulo: 'Case · Gastronomia · Cariri',
    titulo: 'Lunar<br><em>Doceria.</em>',
    sub: 'Site Profissional, vitrine para encomendas',
    tela: 'img/projetos/lunar-hd.webp',
    cari: { pose: 'curioso', estilo: 'left:-30px;bottom:-30px;width:230px' },
  },
  efraim: {
    rotulo: 'Case · Advocacia · João Pessoa',
    titulo: 'Efraim<br><em>Vitaliano.</em>',
    sub: 'Landing Express para direito canábico',
    tela: 'img/projetos/hero-efraim.webp',
    recorte: 2.14,
    telaTopo: 120,
    cari: { pose: 'curioso', estilo: 'left:-30px;bottom:-30px;width:230px' },
  },
};

