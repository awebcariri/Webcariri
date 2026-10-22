/**
 * Textos das páginas de case (/caldas, /criaker, /lunar, /efraim).
 * Os dados básicos de cada projeto (nome, segmento, imagens, link) ficam em conteudo.ts (CASES).
 * Descrições feitas a partir do que está publicado em cada site; não há números de resultado.
 */
import type { CaseId } from './conteudo';

export interface DetalheCase {
  subtitulo: string;
  resumo: string;
  desafio: string;
  entregas: { titulo: string; texto?: string }[];
  complemento?: string;
  proximo: CaseId;
}

export const DETALHES: Record<CaseId, DetalheCase> = {
  caldas: {
    subtitulo: 'Um site para planejar a visita ao balneário',
    resumo:
      'Um balneário com 50 anos de história, em Barbalha, passou a reunir num só lugar tudo o que o visitante precisa para planejar o passeio.',
    desafio:
      'Organizar as informações do balneário de forma clara e acessível, para que o visitante encontre tudo o que precisa para planejar a visita: o que fazer, como chegar, onde se hospedar e outras informações importantes.',
    entregas: [
      { titulo: 'Horários e ingressos', texto: 'Informações claras sobre funcionamento e acesso' },
      { titulo: 'Guia do visitante', texto: 'Principais atrações, dicas e orientações para o passeio' },
      { titulo: 'Hospedagem', texto: 'Opções de hospedagem na região em destaque' },
      { titulo: 'Como chegar', texto: 'Rotas e dicas de acesso para facilitar o planejamento' },
    ],
    complemento:
      'O site também reúne a história do balneário, a galeria de fotos, a página de transparência e o botão de planejar a visita sempre à mão.',
    proximo: 'criaker',
  },
  criaker: {
    subtitulo: 'A personalidade da agência, também no digital',
    resumo:
      'Site institucional para uma agência de publicidade de Juazeiro do Norte, com a mesma linguagem visual das campanhas que ela entrega.',
    desafio:
      'Traduzir a essência criativa da Criaker para o digital, com um site que comunicasse sua personalidade, seus serviços e sua equipe de forma clara, envolvente e visualmente marcante.',
    entregas: [
      { titulo: 'Visual escuro', texto: 'Fiel à identidade da agência' },
      { titulo: 'Serviços', texto: 'Apresentação do que a agência entrega' },
      { titulo: 'Equipe', texto: 'As pessoas por trás do trabalho em destaque' },
      { titulo: 'Avaliações e contato', texto: 'Avaliações de clientes e contato em destaque em todas as telas' },
    ],
    proximo: 'lunar',
  },
  lunar: {
    subtitulo: 'Uma vitrine para encomendas',
    resumo: 'Site para uma doceria artesanal do Cariri apresentar o cardápio, contar sua história e receber encomendas pelo WhatsApp.',
    desafio:
      'A Lunar Doceria precisava de uma vitrine própria para apresentar seu cardápio e facilitar as encomendas, traduzindo a delicadeza da marca em um site simples, bonito e direto.',
    entregas: [
      { titulo: 'Cardápio visual', texto: 'Os doces em destaque, com uma apresentação leve' },
      { titulo: 'História da marca', texto: 'Um espaço para contar a essência da Lunar' },
      { titulo: 'Encomendas pelo WhatsApp', texto: 'Botão direto para o contato e os pedidos' },
      { titulo: 'Identidade da marca', texto: 'Cores e tipografia da doceria aplicadas ao site' },
    ],
    complemento:
      'Um site que conecta o cardápio, a história e o contato numa experiência leve, pensada para levar quem visita até a encomenda de forma prática.',
    proximo: 'efraim',
  },
  efraim: {
    subtitulo: 'Direito canábico explicado com clareza',
    resumo:
      'Site de uma página para um advogado criminalista de João Pessoa, que leva cada pessoa ao caminho certo para o seu caso.',
    desafio:
      'Apresentar um tema sensível com seriedade e acolhimento, falando com pacientes, prescritores e associações ao mesmo tempo, sem promessa de resultado, sem preços e com o aviso informativo exigido pelo Provimento 205/2021 da OAB.',
    entregas: [
      { titulo: 'Qual é o seu caso?', texto: 'Quatro caminhos: paciente que cultiva, prescritor, associação e HC negado' },
      { titulo: 'Manifesto em vídeo', texto: 'A causa do escritório apresentada em vídeo e texto, sem juridiquês' },
      { titulo: 'Avaliações do Google', texto: 'Nota e total do perfil, com link para ler e deixar avaliações' },
      { titulo: 'Contato direto', texto: 'Conversa pelo WhatsApp e pelo Instagram sempre à mão' },
    ],
    complemento:
      'Visual editorial com ilustrações botânicas, ensaio de fotos do Efraim e seção sobre a atuação na OAB/PB e na PBCANN.',
    proximo: 'caldas',
  },
};
