/**
 * Conteúdo editável do site: planos, perguntas, etapas, cases e estudos.
 * Itens marcados com "REVISAR" aguardam confirmação comercial antes de publicar (veja o README).
 */

export type PlanoId = 'landing-express' | 'site-profissional' | 'site-premium';

export interface Plano {
  id: PlanoId;
  nome: string;
  preco: string;
  resumo: string;
  /** Texto curto usado no resumo da página inicial. */
  resumoInicio: string;
  itens: string[];
  /** Itens resumidos usados nos cards da página inicial. */
  itensInicio: string[];
  destaque?: boolean;
}

export const PLANOS: Plano[] = [
  {
    id: 'landing-express',
    nome: 'Landing Express',
    preco: '497',
    resumo: 'Uma página completa para começar a aparecer',
    resumoInicio: 'Uma página completa para começar com o essencial',
    itens: ['Uma página completa', 'Contato pelo WhatsApp', 'Horários, endereço e mapa', 'Adaptado ao celular'],
    itensInicio: ['Uma página completa', 'Contato pelo WhatsApp', 'Horários e endereço', 'Adaptado ao celular'],
  },
  {
    id: 'site-profissional',
    nome: 'Site Profissional',
    preco: '897',
    resumo: 'Mais espaço para apresentar o seu negócio',
    resumoInicio: 'Para quem precisa de mais páginas e um site completo',
    itens: ['Várias seções ou páginas', 'Serviços, cardápio ou catálogo', 'Galeria de fotos', 'Estrutura preparada para o Google'],
    itensInicio: ['Várias seções ou páginas', 'Serviços ou catálogo', 'Galeria de fotos', 'Estrutura para o Google'],
    destaque: true,
  },
  {
    id: 'site-premium',
    nome: 'Site Premium',
    preco: '1.497',
    resumo: 'Um site pensado sob medida',
    resumoInicio: 'Para projetos maiores e recursos personalizados',
    itens: ['Tudo do Site Profissional', 'Pedidos ou agendamento conforme escopo', 'Interações personalizadas', 'Planejamento das funções'],
    itensInicio: ['Tudo do Profissional', 'Funções conforme escopo', 'Interações personalizadas', 'Planejamento do projeto'],
  },
];

export const PAGAMENTO = {
  titulo: '50% no início e 50% na entrega.',
  texto: 'Valores de partida. O valor final fica fechado antes de começar, após entendermos as suas necessidades.',
};

/** Linhas do comparativo. true = incluso, false = não incluso, texto = descrição. */
export const COMPARATIVO: { recurso: string; valores: [boolean | string, boolean | string, boolean | string] }[] = [
  { recurso: 'Páginas', valores: ['Uma página completa', 'Várias seções ou páginas', 'Sob medida'] },
  { recurso: 'Contato pelo WhatsApp', valores: [true, true, true] },
  { recurso: 'Adaptado ao celular', valores: [true, true, true] },
  { recurso: 'Serviços e galeria de fotos', valores: [false, true, true] },
  { recurso: 'Estrutura preparada para o Google', valores: [false, true, true] },
  { recurso: 'Funções personalizadas', valores: [false, false, 'Conforme escopo'] },
];

// REVISAR: condições de hospedagem, domínio e manutenção antes de publicar.
export const POS_LANCAMENTO = [
  {
    id: 'hospedagem',
    titulo: 'Hospedagem e domínio',
    texto: 'Hospedagem gratuita para começar. Domínio e manutenção opcionais.',
  },
  {
    id: 'manutencao',
    titulo: 'Manutenção (opcional)',
    texto: 'Oferecemos planos de manutenção para atualizações, ajustes e suporte contínuo, conforme a sua necessidade',
  },
];

export interface Pergunta {
  p: string;
  r: string;
}

// REVISAR: respostas montadas só com informações já publicadas no site atual.
const R = {
  prazo:
    'O prazo médio do projeto é de cerca de 12 dias. Ele depende do escopo e de quando os materiais chegam, por isso não é um prazo garantido.',
  conteudo:
    'Não precisa ter tudo pronto. Começamos com o que você já tem, como Instagram, fotos e cardápio, e ajudamos a organizar o resto.',
  google:
    'Os planos Site Profissional e Site Premium já saem com estrutura preparada para o Google. A posição nos resultados depende de vários fatores e não é prometida.',
  hospedagem:
    'A hospedagem é gratuita para começar. Se o site crescer muito em acessos, indicamos uma hospedagem dedicada, em torno de R$ 80 por mês. Domínio próprio e manutenção mensal são opcionais.',
  alteracoes:
    'Sim. Antes de publicar, revisamos o site junto com você. Depois que ele está no ar, atualizações e ajustes podem entrar num plano de manutenção, combinado conforme o seu site.',
  celular: 'Sim. O site é pensado primeiro para o celular e testado também no computador antes da entrega.',
  cidades: 'Sim. Estamos em Juazeiro do Norte, no Ceará, e o atendimento é online para todo o Brasil.',
  comecar:
    'Chame a gente no WhatsApp ou preencha a página de contato. Você conta como o negócio funciona e vê uma prévia da primeira tela antes de fechar.',
  criamConteudo:
    'Ajudamos a organizar textos, fotos e informações a partir do que você já tem, como Instagram, fotos e cardápio.',
  materiais:
    'Começamos com o que você já tem e a gente te orienta sobre o que falta. O prazo do projeto acompanha a chegada dos materiais.',
};

export const FAQ_INICIO: Pergunta[] = [
  { p: 'Quanto tempo leva para ficar pronto?', r: R.prazo },
  { p: 'Preciso ter o conteúdo do site?', r: R.conteudo },
  { p: 'O site aparece no Google?', r: R.google },
  { p: 'Vocês também cuidam do domínio e hospedagem?', r: R.hospedagem },
  { p: 'Posso solicitar alterações?', r: R.alteracoes },
  { p: 'O site funciona bem no celular?', r: R.celular },
  { p: 'Vocês atendem outras cidades?', r: R.cidades },
  { p: 'Como faço para começar?', r: R.comecar },
];

export const FAQ_PROCESSO: Pergunta[] = [
  { p: 'Em quanto tempo meu site fica pronto?', r: R.prazo },
  { p: 'Vocês também criam o conteúdo?', r: R.criamConteudo },
  { p: 'E se eu ainda não tiver todos os materiais?', r: R.materiais },
];

export type IconeEtapa = 'conversa' | 'previa' | 'criacao' | 'noar';

/** texto = desktop; curto = versão resumida do celular (como na prancha). */
export const ETAPAS_INICIO: { n: string; titulo: string; texto: string; curto: string; icone: IconeEtapa }[] = [
  { n: '01', titulo: 'Conversa', texto: 'Entendemos seu negócio, seus objetivos e o que você precisa', curto: 'Entendemos seu negócio e seus objetivos', icone: 'conversa' },
  { n: '02', titulo: 'Prévia', texto: 'Você recebe uma proposta personalizada e uma prévia do seu projeto', curto: 'Você recebe uma proposta personalizada', icone: 'previa' },
  { n: '03', titulo: 'Criação', texto: 'Desenvolvemos o site com design, conteúdo e todas as páginas', curto: 'Desenvolvemos o site com design e conteúdo', icone: 'criacao' },
  // REVISAR: a prancha dizia "com todo o suporte para crescer"; trocado para não prometer suporte fora da manutenção opcional.
  { n: '04', titulo: 'No ar', texto: 'Seu site pronto, revisado e publicado, com orientação para os próximos passos', curto: 'Seu site pronto, revisado e publicado', icone: 'noar' },
];

export const ETAPAS_PROCESSO: {
  n: string;
  titulo: string;
  resumo: string;
  icone: IconeEtapa;
  rotulo: string;
  detalheTitulo: string;
  detalhe: string;
}[] = [
  {
    n: '01',
    titulo: 'Conversa',
    resumo: 'Você conta como o seu negócio funciona e o que o site precisa resolver',
    icone: 'conversa',
    rotulo: 'Conversa',
    detalheTitulo: 'Tudo começa com uma boa conversa.',
    detalhe:
      'Entendemos o seu negócio, seu público e o que o site precisa resolver. Pode ser pelo WhatsApp, de forma simples e direta.',
  },
  {
    n: '02',
    titulo: 'Prévia',
    resumo: 'Você vê a primeira tela antes de fechar',
    icone: 'previa',
    rotulo: 'Prévia',
    detalheTitulo: 'Você vê a primeira tela antes de fechar.',
    detalhe: 'Antes de fechar, você conhece a proposta visual da primeira tela. Escopo e valor ficam definidos na proposta.',
  },
  {
    n: '03',
    titulo: 'Criação',
    resumo: 'Com tudo alinhado, criamos o site com atenção aos detalhes',
    icone: 'criacao',
    rotulo: 'Criação',
    detalheTitulo: 'Um site feito com propósito.',
    detalhe:
      'Com a aprovação da prévia, desenvolvemos as demais páginas, aplicamos a identidade da sua marca e cuidamos de cada detalhe para um resultado consistente.',
  },
  {
    n: '04',
    titulo: 'No ar',
    resumo: 'Prazo médio do projeto: cerca de 12 dias, conforme escopo e envio dos materiais',
    icone: 'noar',
    rotulo: 'No ar',
    detalheTitulo: 'Seu negócio no mapa.',
    detalhe:
      'Com tudo revisado, colocamos seu site no ar e te orientamos sobre os próximos passos. Você sai com um site pronto para receber novas oportunidades.',
  },
];

export const MATERIAIS = ['Logo', 'Fotos', 'Serviços', 'Contatos', 'Redes sociais'] as const;

export type CaseId = 'caldas' | 'criaker' | 'lunar' | 'efraim';

export interface Case {
  id: CaseId;
  nome: string;
  nomeCurto: string;
  segmento: string;
  segmentoCurto: string;
  cidade: string;
  /** Plano contratado (Landing Express, Site Profissional ou Site Premium). */
  tipo: string;
  resumoCard: string;
  url: string;
  dominio: string;
  imagem: string;
  imagemPequena: string;
  imagemLargura: number;
  imagemAltura: number;
  alt: string;
  /** true = tem página de case própria (/caldas...). false = o card leva direto ao site do cliente. */
  pagina: boolean;
}

export const CASES: Case[] = [
  {
    id: 'caldas',
    nome: 'Balneário do Caldas',
    nomeCurto: 'Balneário do Caldas',
    segmento: 'Turismo e lazer',
    segmentoCurto: 'Turismo e lazer',
    cidade: 'Barbalha',
    tipo: 'Site Premium',
    resumoCard: 'Site Premium com foco em turismo, estrutura e fácil acesso às informações para visitantes',
    url: 'https://balneariodocaldas.com.br/',
    dominio: 'balneariodocaldas.com.br',
    imagem: '/img/projetos/caldas-hd.webp',
    imagemPequena: '/img/projetos/caldas-hd-700.webp',
    imagemLargura: 1600,
    imagemAltura: 1111,
    alt: 'Página inicial do site do Balneário do Caldas, com o título "Águas termais que renovam há 50 anos"',
    pagina: true,
  },
  {
    id: 'criaker',
    nome: 'Criaker',
    nomeCurto: 'Criaker',
    segmento: 'Agência de publicidade',
    segmentoCurto: 'Agência',
    cidade: 'Juazeiro do Norte',
    tipo: 'Site Premium',
    resumoCard: 'Site Premium que apresenta a equipe, serviços e cases da agência',
    url: 'https://www.criaker.com.br/',
    dominio: 'criaker.com.br',
    imagem: '/img/projetos/criaker-hd.webp',
    imagemPequena: '/img/projetos/criaker-hd-700.webp',
    imagemLargura: 1600,
    imagemAltura: 1124,
    alt: 'Página inicial do site da Criaker, fundo escuro com foto das sócias e o título "Criando de todas as formas e em todos os lugares"',
    pagina: true,
  },
  {
    id: 'lunar',
    nome: 'Lunar Doceria',
    nomeCurto: 'Lunar',
    segmento: 'Gastronomia',
    segmentoCurto: 'Gastronomia',
    cidade: 'Cariri',
    tipo: 'Site Profissional',
    resumoCard: 'Site Profissional com foco em cardápio, história da marca e contato',
    url: 'https://lunardoceria.lovable.app/',
    dominio: 'lunardoceria.lovable.app',
    imagem: '/img/projetos/lunar-hd.webp',
    imagemPequena: '/img/projetos/lunar-hd-700.webp',
    imagemLargura: 1600,
    imagemAltura: 1124,
    alt: 'Página inicial do site da Lunar Doceria, em tons de lilás, com o título "Momentos que iluminam o paladar"',
    pagina: true,
  },
  {
    id: 'efraim',
    nome: 'Efraim Vitaliano',
    nomeCurto: 'Efraim Vitaliano',
    segmento: 'Advocacia',
    segmentoCurto: 'Advocacia',
    cidade: 'João Pessoa',
    tipo: 'Landing Express',
    resumoCard: 'Landing Express para advocacia em direito canábico, com serviços, manifesto e contato direto',
    url: 'https://www.efraimvitaliano.com.br/',
    dominio: 'efraimvitaliano.com.br',
    imagem: '/img/projetos/case-efraim.webp',
    imagemPequena: '/img/projetos/case-efraim-700.webp',
    imagemLargura: 1100,
    imagemAltura: 773,
    alt: 'Página inicial do site de Efraim Vitaliano, fundo claro com ilustrações botânicas e o título "a lei também faz parte da sua saúde"',
    pagina: true,
  },
];

/** Clientes com página de case (usados na Início e na sequência "próximo case"). */
export const CASES_COM_PAGINA = () => CASES.filter((c) => c.pagina);

export const caseById = (id: CaseId) => CASES.find((c) => c.id === id)!;

export const ESTUDOS = [
  {
    id: 'nascente',
    nome: 'Nascente Azul',
    segmento: 'Turismo',
    local: 'Cariri',
    url: 'https://nascente-azul-balneario.vercel.app/',
    imagem: '/img/projetos/estudo-nascente-600.webp',
    alt: 'Estudo Nascente Azul: página de balneário com água azul ondulando e o título "Mergulha que o dia é seu"',
  },
  {
    id: 'lastro',
    nome: 'Lastro Advocacia',
    segmento: 'Jurídico',
    local: 'Cariri',
    url: 'https://lastro-advocacia.vercel.app/',
    imagem: '/img/projetos/estudo-lastro-600.webp',
    alt: 'Estudo Lastro Advocacia: página escura com o título "Direito com clareza"',
  },
];

/** Opções do formulário de contato. */
export const OPCOES_CONTATO = [
  { id: 'ainda-nao-sei', label: 'Ainda não sei' },
  { id: 'landing-express', label: 'Landing Express' },
  { id: 'site-profissional', label: 'Site Profissional' },
  { id: 'site-premium', label: 'Site Premium' },
  { id: 'parceria', label: 'Parceria' },
  { id: 'manutencao', label: 'Manutenção' },
] as const;

export type OpcaoContato = (typeof OPCOES_CONTATO)[number]['id'];
