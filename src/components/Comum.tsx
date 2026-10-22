import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Case, Pergunta } from '../content/conteudo';
import { MENSAGENS, linkWhatsApp } from '../config/site';
import { Icone, Seta } from './Icone';

/** Captura de tela de um site. `recorte` fixa a proporção (ex.: "4 / 3"), cortando de cima para baixo. */
export function Tela({
  src,
  srcPequena,
  alt,
  largura,
  altura,
  recorte,
  prioridade = false,
  revelar = true,
  className = '',
  sizes = '(max-width: 767px) 100vw, 60vw',
}: {
  src: string;
  srcPequena?: string;
  alt: string;
  largura: number;
  altura: number;
  recorte?: string;
  prioridade?: boolean;
  revelar?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure
      className={`tela ${revelar && !prioridade ? 'revelar-img' : ''} ${className}`}
      style={recorte ? ({ '--recorte': recorte } as CSSProperties) : undefined}
    >
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

/** Abertura das páginas internas: rótulo, título, texto de apoio e ações. */
export function TopoPagina({
  rotulo,
  titulo,
  lead,
  trilha,
  children,
}: {
  rotulo: string;
  titulo: ReactNode;
  lead?: ReactNode;
  trilha?: { label: string; to?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="topo">
      <div className="container topo__grade">
        <div className="topo__cabeca">
          {trilha ? <Trilha itens={trilha} /> : <p className="rotulo">{rotulo}</p>}
          <h1 className="titulo titulo--1">{titulo}</h1>
        </div>
        {(lead || children) && (
          <div className="topo__apoio">
            {lead && <p className="lead">{lead}</p>}
            {children && <div className="topo__acoes">{children}</div>}
          </div>
        )}
      </div>
    </section>
  );
}

/** Cabeçalho de seção: rótulo e título à esquerda, texto ou link à direita. */
export function CabecaSecao({
  rotulo,
  titulo,
  id,
  children,
}: {
  rotulo: string;
  titulo: ReactNode;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <div className="cabeca-secao">
      <div>
        <p className="rotulo">{rotulo}</p>
        <h2 className="titulo titulo--2" id={id}>
          {titulo}
        </h2>
      </div>
      {children && <div className="cabeca-secao__apoio">{children}</div>}
    </div>
  );
}

/** Card de projeto (Início e Projetos). */
export function CartaoProjeto({ caso, numero, recorte = '4 / 3' }: { caso: Case; numero: number; recorte?: string }) {
  return (
    <article className="cartao-projeto revelar">
      <Link to={`/${caso.id}`} className="cartao-projeto__link">
        <Tela
          src={caso.imagem}
          srcPequena={caso.imagemPequena}
          alt=""
          largura={caso.imagemLargura}
          altura={caso.imagemAltura}
          recorte={recorte}
          sizes="(max-width: 767px) 100vw, 50vw"
        />
        <div className="cartao-projeto__info">
          <span className="numero">{String(numero).padStart(2, '0')}</span>
          <h3 className="titulo titulo--3">{caso.nome}</h3>
          <Icone nome="seta-diag" tamanho={22} traco={1.6} className="cartao-projeto__seta" />
        </div>
        <p className="cartao-projeto__meta">
          {caso.segmento} · {caso.cidade} · {caso.tipo}
        </p>
      </Link>
    </article>
  );
}

/** Lista de perguntas com botões expansíveis. */
export function Perguntas({ itens, className = '' }: { itens: Pergunta[]; className?: string }) {
  return (
    <div className={`perguntas ${className}`}>
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
  className = '',
  inicial = false,
}: {
  titulo: ReactNode;
  children: ReactNode;
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
          <span>{titulo}</span>
          <span className="acordeao__icone" aria-hidden="true" />
        </button>
      </h3>
      <div
        className="acordeao__painel"
        id={`${id}-painel`}
        role="region"
        aria-labelledby={`${id}-botao`}
        data-aberto={aberto}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}

/** Chamada final, igual em todas as páginas. */
export function ChamadaFinal({
  titulo = (
    <>
      Vamos conversar sobre <em>o seu projeto?</em>
    </>
  ),
  texto = 'Conte como o seu negócio funciona. Você recebe uma proposta e vê a primeira tela antes de fechar.',
  linkProposta = '/contato',
  mensagemZap = MENSAGENS.geral,
}: {
  titulo?: ReactNode;
  texto?: string;
  linkProposta?: string;
  mensagemZap?: string;
}) {
  return (
    <section className="secao secao--amarela chamada" aria-labelledby="chamada-titulo">
      <div className="container chamada__grade">
        <h2 className="titulo titulo--2 revelar" id="chamada-titulo">
          {titulo}
        </h2>
        <div className="chamada__apoio revelar" style={{ ['--atraso' as string]: '0.1s' }}>
          <p>{texto}</p>
          <div className="chamada__acoes">
            <Link to={linkProposta} className="btn">
              Solicitar proposta <Seta />
            </Link>
            <a href={linkWhatsApp(mensagemZap)} target="_blank" rel="noopener noreferrer" className="btn btn--contorno">
              <Icone nome="whatsapp" tamanho={18} /> WhatsApp
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
