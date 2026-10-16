import type { CSSProperties, SVGProps } from 'react';

/**
 * Ícones de traço usados no site (viewBox 24, traço 1.8).
 * Para adicionar um ícone, inclua o desenho no objeto abaixo.
 */
const desenhos = {
  seta: <path d="M5 12h14M13 6l6 6-6 6" />,
  'seta-baixo': <path d="M12 5v14M6 13l6 6 6-6" />,
  'seta-diag': <path d="M7 17 17 7M8 7h9v9" />,
  externo: (
    <>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  fechar: <path d="M6 6l12 12M18 6 6 18" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  conversa: (
    <>
      <path d="M12 4c4.7 0 8.5 3.2 8.5 7.2s-3.8 7.2-8.5 7.2c-1 0-2-.1-2.9-.4L5 20l1-3.6c-1.6-1.3-2.5-3.1-2.5-5.2C3.5 7.2 7.3 4 12 4Z" />
      <path d="M8.3 11.3h.01M12 11.3h.01M15.7 11.3h.01" strokeWidth="2.6" />
    </>
  ),
  documento: (
    <>
      <path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5Z" />
      <path d="M14 3v4.5h4.5M9 11.5h6M9 14.5h6M9 17.5h4" />
    </>
  ),
  lapis: (
    <>
      <path d="m15.5 4.5 4 4L8.5 19.5 4 20l.5-4.5Z" />
      <path d="m13.5 6.5 4 4" />
    </>
  ),
  foguete: (
    <>
      <path d="M14.5 4.2c2.3-.9 4.4-1 5.3-.9.1.9 0 3-.9 5.3-1 2.6-3.1 5-6.4 7l-3.1-3.1c2-3.3 4.4-5.4 7.1-6.3Z" />
      <path d="M9.4 12.5 6 12.2l2.6-3.5 3.7-.4M11.5 14.6l.3 3.4 3.5-2.6.4-3.7" />
      <path d="M7 17c-1.2.3-2.2 1.4-2.5 3 1.6-.3 2.7-1.3 3-2.5" />
      <circle cx="15.4" cy="8.6" r="1.4" />
    </>
  ),
  aviao: <path d="M21 3 3 10.5l7 2.5 2.5 7L21 3ZM10 13l5-5" />,
  coroa: <path d="M4 17.5h16M4.5 15 3.5 7l5 4L12 5l3.5 6 5-4-1 8Z" />,
  whatsapp: (
    <>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.2-1.1A8.5 8.5 0 1 0 12 3.5Z" />
      <path d="M9 8.3c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.5.9 1.4 1.8 2.4 2.3.2.1.4.1.5-.1l.6-.7c.1-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.4 0 .5-.2 1.2-.7 1.5-.6.4-1.4.5-2.4.2-2.4-.8-4.3-2.8-5-4.6-.4-.9-.4-1.9.4-2.9Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.9" />
      <path d="M17 7h.01" strokeWidth="2.6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  globo: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5Z" />
    </>
  ),
  telefone: (
    <path d="M6.6 3.5h2.6l1.5 4-2 1.3a11 11 0 0 0 6.5 6.5l1.3-2 4 1.5v2.6a2 2 0 0 1-2.2 2A16.3 16.3 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  cartao: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3 9.5h18M6.5 14.5h2M10.5 14.5h1" />
    </>
  ),
  servidor: (
    <>
      <rect x="3.5" y="4" width="17" height="4.5" rx="1.2" />
      <rect x="3.5" y="9.75" width="17" height="4.5" rx="1.2" />
      <rect x="3.5" y="15.5" width="17" height="4.5" rx="1.2" />
      <path d="M6.5 6.25h.01M6.5 12h.01M6.5 17.75h.01M15 6.25h3M15 12h3M15 17.75h3" strokeWidth="2" />
    </>
  ),
  engrenagem: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.8 13.6 5l2.7-.5.8 2.6 2.6.8-.5 2.7L21.2 12 19.2 13.6l.5 2.7-2.6.8-.8 2.6-2.7-.5L12 21.2 10.4 19.2l-2.7.5-.8-2.6-2.6-.8.5-2.7L2.8 12l2-1.6-.5-2.7 2.6-.8.8-2.6 2.7.5Z" />
    </>
  ),
  'janela-casa': (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="1.6" />
      <path d="M2.5 8h19M5.5 6h.01M7.5 6h.01M9.5 6h.01" />
      <path d="M8.5 17v-3.6L12 10.6l3.5 2.8V17Z" />
    </>
  ),
  'janela-lista': (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="1.6" />
      <path d="M2.5 8h19M5.5 6h.01M7.5 6h.01M9.5 6h.01M6 11.5h1M9.5 11.5h8M6 14.5h1M9.5 14.5h6M6 17.2h1M9.5 17.2h4" />
    </>
  ),
  varinha: (
    <>
      <path d="m4 20 11-11M13.5 7.5l3 3" />
      <path d="M17 3v2.5M20.5 6.5H18M19.6 3.9 18 5.5M14.4 3.9 15.5 5M20.1 9.6 19 8.5" />
    </>
  ),
  megafone: (
    <>
      <path d="M4 10v4a1 1 0 0 0 1 1h2l6 4V5L7 9H5a1 1 0 0 0-1 1Z" />
      <path d="M7.5 15 8.5 20h2l-.8-4.2M17 9.5a3.5 3.5 0 0 1 0 5M19.5 7a7 7 0 0 1 0 10" />
    </>
  ),
  pessoas: (
    <>
      <circle cx="12" cy="7.5" r="2.8" />
      <circle cx="5.5" cy="9" r="2.1" />
      <circle cx="18.5" cy="9" r="2.1" />
      <path d="M7 19.5v-1.2a5 5 0 0 1 10 0v1.2ZM2.5 18v-.6a3.4 3.4 0 0 1 4.6-3.2M21.5 18v-.6a3.4 3.4 0 0 0-4.6-3.2" />
    </>
  ),
  pincel: (
    <>
      <path d="M20 4c-3.5 2-7.4 5.8-9.6 8.6l1.9 1.9C15.2 12.3 19 8.4 20 4Z" />
      <path d="M10.4 12.6c-2.1-.4-3.9 1-4.2 3-.2 1.6-.9 2.6-2.2 3.4 2.6 1.1 6.4.6 7.8-1.5.8-1.2.7-2.6.3-3Z" />
    </>
  ),
  codigo: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15" />,
  relogio: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  mapa: (
    <>
      <path d="m3.5 6.5 5.5-2.5 6 2.5 5.5-2.5v13.5L15 20l-6-2.5-5.5 2.5Z" />
      <path d="M9 4v13.5M15 6.5V20" />
    </>
  ),
  cama: (
    <>
      <path d="M3 18.5V6M3 14.5h18v4M21 14.5v-2.5a3 3 0 0 0-3-3h-7v5.5" />
      <circle cx="7" cy="11" r="1.8" />
    </>
  ),
  imagem: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <circle cx="9" cy="9.5" r="1.7" />
      <path d="m3.5 17 5-4.5 4 3.5 3-2.5 5 4.2" />
    </>
  ),
  usuario: (
    <>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  lampada: (
    <>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
      <path d="M12 7.5v3M10.5 9h3" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12.5" rx="1.5" />
      <path d="M12 16.5v3.5M8 20h8" />
    </>
  ),
  'monitor-lapis': (
    <>
      <path d="M13 4H4.5A1.5 1.5 0 0 0 3 5.5v9.5a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 21 15v-4" />
      <path d="M12 16.5v3.5M8 20h8M19.6 2.9l1.5 1.5-6.4 6.4-2.1.6.6-2.1Z" />
    </>
  ),
  estrela: <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8Z" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" />
      <path d="M12 11v5.5M12 7.8h.01" stroke="#fff" strokeWidth="2.2" />
    </>
  ),
  // marca: círculo, triângulo e quadrado (ícone de "Logo" nos materiais)
  formas: (
    <>
      <circle cx="8" cy="8" r="4.5" />
      <path d="M16.5 3.5 21 11.5h-9Z" />
      <rect x="4" y="13.5" width="7" height="7" rx="1" />
      <path d="M14 17h7M17.5 13.5v7" />
    </>
  ),
  pasta: <path d="M3.5 7.5V18a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5V9.5A1.5 1.5 0 0 0 19 8h-7l-2-2.5H5A1.5 1.5 0 0 0 3.5 7Z" />,
  etiqueta: (
    <>
      <path d="M3.5 11.6V4.5a1 1 0 0 1 1-1h7.1l9 9a1.4 1.4 0 0 1 0 2l-6.1 6.1a1.4 1.4 0 0 1-2 0Z" />
      <circle cx="8" cy="8" r="1.4" />
    </>
  ),
  cupcake: (
    <>
      <path d="M6 12.5h12l-1.6 7a1.5 1.5 0 0 1-1.5 1H9.1a1.5 1.5 0 0 1-1.5-1Z" />
      <path d="M5.5 12.5a3 3 0 0 1 1-5.6 5.5 5.5 0 0 1 11 0 3 3 0 0 1 1 5.6M10 15.5l.4 3M14 15.5l-.4 3" />
    </>
  ),
  coracao: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />,
  'doc-texto': (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
      <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" />
    </>
  ),
  'docs-apresentacao': (
    <>
      <rect x="7.5" y="3.5" width="12" height="14" rx="1.5" />
      <path d="M7.5 6.5H5.5A1.5 1.5 0 0 0 4 8v11a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 16 19v-1.5M10.5 8h6M10.5 11h6M10.5 14h3.5" />
    </>
  ),
  envelope: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m3.5 6.5 8.5 7 8.5-7" />
    </>
  ),
  'check-circulo': (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8 12.3 2.8 2.8L16.2 9.5" />
    </>
  ),
  conversas: (
    <>
      <path d="M9.5 3.5c3.6 0 6.5 2.4 6.5 5.4s-2.9 5.4-6.5 5.4c-.7 0-1.4-.1-2-.3L4 15.5l.8-2.8C3.6 11.7 3 10.4 3 8.9c0-3 2.9-5.4 6.5-5.4Z" />
      <path d="M17.6 9.2c2 .8 3.4 2.5 3.4 4.4 0 1.2-.5 2.3-1.4 3.1l.6 2.6-3-1.3c-.6.2-1.2.2-1.8.2-2.2 0-4.1-1-5.1-2.5" />
    </>
  ),
} as const;

export type NomeIcone = keyof typeof desenhos;

interface Props extends SVGProps<SVGSVGElement> {
  nome: NomeIcone;
  tamanho?: number | string;
  traco?: number;
}

export function Icone({ nome, tamanho = 22, traco = 1.8, className, ...resto }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={tamanho}
      height={tamanho}
      fill="none"
      stroke="currentColor"
      strokeWidth={traco}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...resto}
    >
      {desenhos[nome]}
    </svg>
  );
}

/** Seta padrão dos botões. */
export const Seta = ({ tamanho = 20 }: { tamanho?: number }) => (
  <Icone nome="seta" tamanho={tamanho} traco={2} className="seta" />
);

/** Traços de brilho (os três risquinhos tomate das pranchas). */
export function Faiscas({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={`faiscas ${className ?? ''}`}
      style={style}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
    >
      <path d="M10 26 4 10M26 20l4-16M38 34l16-6" />
    </svg>
  );
}
