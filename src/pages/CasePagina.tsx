import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tela, Trilha } from '../components/Comum';
import { Icone, Seta } from '../components/Icone';
import { DETALHES } from '../content/cases';
import { caseById, type CaseId } from '../content/conteudo';
import { useSeo } from '../lib/hooks';
import { COR_PROJETO } from '../components/Vitrine';

/** Página de case (/caldas, /criaker, /lunar, /efraim). Textos em content/cases.ts. */
export default function CasePagina({ id }: { id: CaseId }) {
  useSeo(`/${id}`);
  const caso = caseById(id);
  const d = DETALHES[id];
  const proximo = caseById(d.proximo);
  const [ampliada, setAmpliada] = useState(false);
  const dialogo = useRef<HTMLDialogElement>(null);
  const botao = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = dialogo.current;
    if (!el) return;
    if (ampliada && !el.open) el.showModal();
    if (!ampliada && el.open) el.close();
  }, [ampliada]);

  return (
    <>
      <section className="topo">
        <div className="container topo__grade">
          <div className="topo__cabeca">
            <Trilha itens={[{ label: 'Início', to: '/inicio' }, { label: 'Projetos', to: '/projetos' }, { label: caso.nomeCurto }]} />
            <h1 className="titulo titulo--1">{caso.nome}</h1>
          </div>
          <div className="topo__apoio">
            <p className="lead">{d.resumo}</p>
            <div className="topo__acoes">
              <a href={caso.url} target="_blank" rel="noopener noreferrer" className="btn">
                Visitar o site <Icone nome="seta-diag" tamanho={18} traco={2} />
                <span className="sr-only"> {caso.dominio} (abre em nova aba)</span>
              </a>
              <Link to="/projetos" className="btn btn--contorno">
                Todos os projetos
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <dl className="ficha ficha--larga">
            <div>
              <dt>Cliente</dt>
              <dd>{caso.nome}</dd>
            </div>
            <div>
              <dt>Segmento</dt>
              <dd>{caso.segmento}</dd>
            </div>
            <div>
              <dt>Local</dt>
              <dd>{caso.cidade}</dd>
            </div>
            <div>
              <dt>Plano</dt>
              <dd>{caso.tipo}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* palco na cor do projeto, como na vitrine */}
      <div className="cas-palco" style={{ background: COR_PROJETO[id].fundo }}>
        <button
          ref={botao}
          type="button"
          className="cas-captura"
          onClick={() => setAmpliada(true)}
          aria-label={`Ampliar imagem: ${caso.alt}`}
        >
          <Tela
            src={caso.imagem}
            srcPequena={caso.imagemPequena}
            alt={caso.alt}
            largura={caso.imagemLargura}
            altura={caso.imagemAltura}
            recorte="16 / 9"
            prioridade
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <span className="cas-captura__ampliar" aria-hidden="true">
            Ampliar
          </span>
        </button>
        <dialog
          ref={dialogo}
          className="captura-dialogo"
          aria-label={`Imagem ampliada: ${caso.nome}`}
          onClose={() => {
            setAmpliada(false);
            botao.current?.focus();
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setAmpliada(false);
          }}
        >
          <img src={caso.imagem} alt={caso.alt} width={caso.imagemLargura} height={caso.imagemAltura} />
          <button type="button" className="captura-dialogo__fechar" onClick={() => setAmpliada(false)}>
            <Icone nome="fechar" tamanho={20} traco={2} /> Fechar
          </button>
        </dialog>
      </div>

      <section className="secao" aria-label="Desafio e entregas">
        <div className="container cas-corpo">
          <div className="cas-corpo__bloco revelar">
            <p className="rotulo">O desafio</p>
            <h2 className="titulo titulo--3">{d.subtitulo}</h2>
            <p className="texto">{d.desafio}</p>
          </div>
          <div className="cas-corpo__bloco revelar" style={{ ['--atraso' as string]: '0.1s' }}>
            <p className="rotulo">O que entregamos</p>
            <ol role="list" className="cas-entregas">
              {d.entregas.map((e, i) => (
                <li key={e.titulo}>
                  <span className="numero">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="titulo titulo--4">{e.titulo}</h3>
                    {e.texto && <p className="texto">{e.texto}</p>}
                  </div>
                </li>
              ))}
            </ol>
            {d.complemento && <p className="texto cas-corpo__complemento">{d.complemento}</p>}
          </div>
        </div>
      </section>

      <section className="secao cas-proximo" aria-labelledby="cas-proximo">
        <div className="container">
          <Link to={`/${proximo.id}`} className="cas-proximo__link">
            <div>
              <p className="rotulo">Próximo projeto</p>
              <h2 className="titulo titulo--2" id="cas-proximo">
                {proximo.nome}
              </h2>
              <p className="cartao-projeto__meta">
                {proximo.segmento} · {proximo.cidade} · {proximo.tipo}
              </p>
            </div>
            <Tela
              src={proximo.imagem}
              srcPequena={proximo.imagemPequena}
              alt=""
              largura={proximo.imagemLargura}
              altura={proximo.imagemAltura}
              recorte="16 / 10"
              sizes="(max-width: 767px) 100vw, 40vw"
            />
            <Seta tamanho={28} />
          </Link>
        </div>
      </section>
    </>
  );
}
