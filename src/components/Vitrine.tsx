import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Case } from '../content/conteudo';
import { LOGO_LETRAS, LOGO_PONTO, LOGO_VIEWBOX } from '../content/logo-vetor';
import { Icone } from './Icone';

/** Cor de fundo de cada projeto na vitrine (Studio Ag: a página muda de cor a cada trabalho). */
export const COR_PROJETO: Record<string, { fundo: string; tinta: 'clara' | 'escura' }> = {
  caldas: { fundo: 'var(--amarelo)', tinta: 'escura' },
  criaker: { fundo: 'var(--vinho)', tinta: 'clara' },
  lunar: { fundo: 'var(--areia)', tinta: 'escura' },
  efraim: { fundo: 'var(--preto)', tinta: 'clara' },
};

/** O logotipo "webcariri." em vetor, em qualquer tamanho e cor (cor das letras = currentColor). */
export function Marca({ className = '', titulo }: { className?: string; titulo?: string }) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={`marca ${className}`}
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
    >
      <path d={LOGO_LETRAS} fill="currentColor" fillRule="evenodd" />
      <path d={LOGO_PONTO} className="marca__ponto" />
    </svg>
  );
}

/**
 * Vitrine de projetos em painéis de tela cheia. O fundo da seção acompanha
 * o projeto que está no centro da tela.
 */
export function Vitrine({ projetos }: { projetos: Case[] }) {
  const [ativo, setAtivo] = useState<string | undefined>(projetos[0]?.id);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setAtivo((e.target as HTMLElement).dataset.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    el.querySelectorAll('[data-id]').forEach((p) => obs.observe(p));
    return () => obs.disconnect();
  }, []);

  const cor = COR_PROJETO[ativo ?? ''] ?? COR_PROJETO.caldas;

  return (
    <div
      ref={ref}
      className={`vitrine vitrine--${cor.tinta}`}
      style={{ '--vitrine-fundo': cor.fundo } as CSSProperties}
    >
      {projetos.map((c, i) => (
        <article key={c.id} data-id={c.id} className="vitrine__painel">
          <Link to={`/${c.id}`} className="vitrine__link">
            <figure className="vitrine__midia">
              <img
                src={c.imagem}
                srcSet={`${c.imagemPequena} 700w, ${c.imagem} ${c.imagemLargura}w`}
                sizes="(max-width: 767px) 92vw, 70vw"
                alt={c.alt}
                width={c.imagemLargura}
                height={c.imagemAltura}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </figure>
            <p className="vitrine__legenda">
              <span className="vitrine__num">{String(i + 1).padStart(2, '0')}</span>
              <strong>{c.nome}</strong>
              <em>
                {c.tipo} · {c.segmento} · {c.cidade}
              </em>
              <span className="vitrine__ver">
                Ver case <Icone nome="seta" tamanho={18} traco={1.8} />
              </span>
            </p>
          </Link>
        </article>
      ))}
    </div>
  );
}

/** Faixa gigante que corre na horizontal com miniaturas no meio (This January: "View More Work"). */
export function FaixaProjetos({ projetos, para = '/projetos' }: { projetos: Case[]; para?: string }) {
  const grupo = (oculto: boolean) => (
    <span className="faixa__grupo" aria-hidden={oculto || undefined}>
      {projetos.map((c) => (
        <span key={c.id} className="faixa__item">
          Ver <em>todos</em> os projetos
          <img src={c.imagemPequena} alt="" width={700} height={490} loading="lazy" decoding="async" />
        </span>
      ))}
    </span>
  );
  return (
    <Link to={para} className="faixa" aria-label="Ver todos os projetos">
      <span className="faixa__trilho">
        {grupo(false)}
        {grupo(true)}
      </span>
    </Link>
  );
}
