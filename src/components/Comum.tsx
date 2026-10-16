import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Pergunta } from '../content/conteudo';

/** Captura de tela de um site, com moldura e (opcional) barra de navegador. */
export function Tela({
  src,
  srcPequena,
  alt,
  largura,
  altura,
  barra = false,
  prioridade = false,
  className = '',
  sizes = '(max-width: 767px) 100vw, 60vw',
  style,
}: {
  src: string;
  srcPequena?: string;
  alt: string;
  largura: number;
  altura: number;
  barra?: boolean;
  prioridade?: boolean;
  className?: string;
  sizes?: string;
  style?: CSSProperties;
}) {
  return (
    <figure className={`tela ${barra ? 'tela--barra' : ''} ${className}`} style={style}>
      <img
        src={src}
        srcSet={srcPequena ? `${srcPequena} 700w, ${src} ${largura}w` : undefined}
        sizes={srcPequena ? sizes : undefined}
        alt={alt}
        width={largura}
        height={altura}
        loading={prioridade ? 'eager' : 'lazy'}
        {...(prioridade ? { fetchpriority: 'high' } : {})}
        decoding="async"
      />
    </figure>
  );
}

/** Balão de texto no estilo dos stickers das pranchas. É texto real, não imagem. */
export function Balao({
  children,
  variante = 'amarelo',
  forma = 'nuvem',
  fala = false,
  className = '',
  style,
}: {
  children: ReactNode;
  variante?: 'amarelo' | 'branco' | 'serif';
  forma?: 'nuvem' | 'quadrado';
  fala?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const classes = [
    'balao',
    variante === 'branco' && 'balao--branco',
    variante === 'serif' && 'balao--branco balao--serif',
    forma === 'quadrado' && 'balao--quadrado',
    fala && 'balao--fala',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <p className={classes} style={style}>
      {children}
    </p>
  );
}

export function Cari({
  pose,
  alt = '',
  className = '',
  largura = 600,
  carregar = 'lazy',
}: {
  pose: 'avatar' | 'curioso' | 'saudando' | 'no-notebook';
  alt?: string;
  className?: string;
  largura?: number;
  carregar?: 'lazy' | 'eager';
}) {
  const dims = pose === 'no-notebook' ? [1200, 800] : [900, 900];
  return (
    <img
      src={`/img/cari/cari-${pose}.webp`}
      alt={alt}
      width={dims[0]}
      height={dims[1]}
      className={`cari ${className}`}
      loading={carregar}
      decoding="async"
      style={{ maxWidth: largura }}
    />
  );
}

/** Stickers redesenhados em vetor porque o arquivo do kit é pequeno demais e pixela ao ampliar. */
const STICKERS_VETOR = new Set(['sol-e-serras-do-cariri']);

export function Sticker({ nome, alt = '', className = '' }: { nome: string; alt?: string; className?: string }) {
  const ext = STICKERS_VETOR.has(nome) ? 'svg' : 'webp';
  return <img src={`/img/stickers/${nome}.${ext}`} alt={alt} className={`sticker ${className}`} loading="lazy" decoding="async" />;
}

export function Trilha({ itens }: { itens: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Você está em">
      <ol role="list" className="trilha">
        {itens.map((item, i) => (
          <li key={item.label}>
            {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
            {i < itens.length - 1 && <span aria-hidden="true"> /</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Lista de perguntas com botões expansíveis. */
export function Perguntas({ itens, className = '' }: { itens: Pergunta[]; className?: string }) {
  return (
    <div className={className}>
      {itens.map((item) => (
        <Acordeao key={item.p} titulo={item.p}>
          <p>{item.r}</p>
        </Acordeao>
      ))}
    </div>
  );
}

export function Acordeao({
  titulo,
  children,
  icone,
  className = '',
  inicial = false,
}: {
  titulo: ReactNode;
  children: ReactNode;
  icone?: ReactNode;
  className?: string;
  inicial?: boolean;
}) {
  const [aberto, setAberto] = useState(inicial);
  const id = useId();
  return (
    <div className={`acordeao ${className}`}>
      <h3 style={{ margin: 0, font: 'inherit' }}>
        <button
          type="button"
          className="acordeao__botao"
          aria-expanded={aberto}
          aria-controls={`${id}-painel`}
          id={`${id}-botao`}
          onClick={() => setAberto((v) => !v)}
        >
          {icone}
          <span className="acordeao__titulo">{titulo}</span>
          <span className="acordeao__icone" aria-hidden="true" />
        </button>
      </h3>
      <div
        className="acordeao__painel"
        id={`${id}-painel`}
        role="region"
        aria-labelledby={`${id}-botao`}
        data-aberto={aberto}
        aria-hidden={!aberto}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}
