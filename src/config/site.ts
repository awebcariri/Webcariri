/**
 * Dados de contato e endereços oficiais.
 * Trocou o número do WhatsApp ou o Instagram? Edite só aqui.
 */
export const SITE = {
  nome: 'WebCariri',
  url: 'https://www.webcariri.com.br',
  cidade: 'Juazeiro do Norte',
  uf: 'CE',
  slogan: 'Do Cariri pro mundo.',
  assinatura: 'Sites com personalidade. Presença com propósito.',
  whatsappNumero: '5588999761315',
  whatsappExibicao: '(88) 99976-1315',
  instagramUsuario: 'awebcariri',
  instagramUrl: 'https://www.instagram.com/awebcariri',
  ano: 2026,
} as const;

/** Link wa.me com mensagem pronta. Cada botão passa a sua própria mensagem. */
export function linkWhatsApp(mensagem?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumero}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

export const MENSAGENS = {
  geral: 'Olá, WebCariri! Quero conversar sobre um site para o meu negócio.',
  conversa: 'Olá, WebCariri! Quero contar como funciona o meu negócio e o que o site precisa resolver.',
  parceria: 'Olá, WebCariri! Sou de uma agência e quero conversar sobre parceria.',
  manutencao: 'Olá, WebCariri! Quero saber sobre manutenção do site.',
} as const;

export const NAV = [
  { to: '/projetos', label: 'Projetos' },
  { to: '/como-funciona', label: 'Processo' },
  { to: '/planos', label: 'Planos' },
  { to: '/parceiros', label: 'Para agências' },
  { to: '/contato', label: 'Contato' },
] as const;
