import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Case } from '../content/conteudo';
import { Icone, Seta } from './Icone';
import { Tela } from './Comum';

/** Captura real do projeto. Toque/clique abre a versão ampliada. */
export function CapturaAmpliavel({ caso, barra = false, className = '' }: { caso: Case; barra?: boolean; className?: string }) {
  const [aberto, setAberto] = useState(false);
  const dialogo = useRef<HTMLDialogElement>(null);
  const botao = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (aberto && !d.open) d.showModal();
    if (!aberto && d.open) d.close();
  }, [aberto]);

  return (
    <>
      <button
        ref={botao}
        type="button"
        className={`captura ${className}`}
        onClick={() => setAberto(true)}
        aria-label={`Ampliar imagem: ${caso.alt}`}
      >
        <Tela
          src={caso.imagem}
          srcPequena={caso.imagemPequena}
          alt={caso.alt}
          largura={caso.imagemLargura}
          altura={caso.imagemAltura}
          barra={barra}
          prioridade
          sizes="(max-width: 767px) 100vw, 1200px"
        />
        <span className="captura__lupa" aria-hidden="true">
          <Icone nome="externo" tamanho={18} />
        </span>
      </button>
      <dialog
        ref={dialogo}
        className="captura-dialogo"
        aria-label={`Imagem ampliada: ${caso.nome}`}
        onClose={() => {
          setAberto(false);
          botao.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setAberto(false);
        }}
      >
        <img src={caso.imagem} alt={caso.alt} width={caso.imagemLargura} height={caso.imagemAltura} />
        <button type="button" className="captura-dialogo__fechar" onClick={() => setAberto(false)}>
          <Icone nome="fechar" tamanho={22} traco={2} /> Fechar
        </button>
      </dialog>
    </>
  );
}

export function BotoesCase({ caso, contorno = false }: { caso: Case; contorno?: boolean }) {
  return (
    <div className="cas-acoes">
      <a href={caso.url} target="_blank" rel="noopener noreferrer" className="btn cas-acoes__visitar">
        Visitar o site <Icone nome="seta-diag" tamanho={18} traco={2.2} />
        <span className="sr-only"> {caso.dominio} (abre em nova aba)</span>
      </a>
      <Link to="/projetos" className={contorno ? 'btn btn--contorno' : 'link-grifo cas-acoes__todos'}>
        Todos os projetos
      </Link>
    </div>
  );
}

export function ProximoCase({
  caso,
  texto,
  numero,
  estilo = 'linha',
}: {
  caso: Case;
  texto: string;
  numero?: string;
  estilo?: 'linha' | 'cartao';
}) {
  if (estilo === 'cartao') {
    return (
      <section className="container cas-proximo cas-proximo--cartao" aria-labelledby="cas-proximo">
        {numero && <p className="cas-num">{numero}</p>}
        <h2 className="titulo titulo--s" id="cas-proximo">
          Próximo projeto<span className="ponto">.</span>
        </h2>
        <Link to={`/${caso.id}`} className="cas-proximo__cartao">
          <img src={caso.imagemPequena} alt="" width={700} height={490} loading="lazy" />
          <span className="cas-proximo__info">
            <span className="rotulo">{caso.segmento.split(' ')[0]}</span>
            <strong>{caso.nome}.</strong>
            <span>{texto}</span>
          </span>
          <span className="cas-proximo__circulo" aria-hidden="true">
            <Icone nome="seta" tamanho={18} traco={2} />
          </span>
        </Link>
      </section>
    );
  }
  return (
    <section className="container cas-proximo" aria-labelledby="cas-proximo">
      <div className="cas-proximo__linha">
        <div className="cas-proximo__nome">
          <p className="rotulo">Próximo projeto</p>
          <h2 className="titulo" id="cas-proximo">
            {caso.nomeCurto}
            <span className="ponto">.</span>
          </h2>
        </div>
        <p className="cas-proximo__texto">{texto}</p>
        <Link to={`/${caso.id}`} className="link-grifo">
          Ver projeto <Seta tamanho={18} />
          <span className="sr-only"> {caso.nome}</span>
        </Link>
      </div>
    </section>
  );
}
