import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Balao, Cari, Tela } from '../components/Comum';
import { Faiscas, Seta } from '../components/Icone';
import { CASES, ESTUDOS } from '../content/conteudo';
import { useSeo } from '../lib/hooks';

export default function Projetos() {
  useSeo('/projetos');
  const [caldas, ...outros] = CASES;
  const [secao, setSecao] = useState<'clientes' | 'estudos'>('clientes');

  // Marca a âncora da seção que está na tela.
  useEffect(() => {
    const estudos = document.getElementById('estudos');
    if (!estudos || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(([e]) => setSecao(e.isIntersecting || e.boundingClientRect.top < 0 ? 'estudos' : 'clientes'), {
      rootMargin: '0px 0px -55% 0px',
    });
    obs.observe(estudos);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section className="container topo-interno prj-topo">
        <div className="prj-topo__texto">
          <p className="rotulo">Projetos</p>
          <h1 className="titulo titulo--xl prj-topo__titulo">
            Ideias que já <br />
            estão <span className="acento">no ar.</span>
          </h1>
          <p className="lead prj-topo__lead">
            Projetos de clientes e estudos autorais, cada um com sua personalidade.
          </p>
          <nav className="prj-ancoras" aria-label="Seções desta página">
            <a
              href="#clientes"
              className={`prj-ancoras__item ${secao === 'clientes' ? 'prj-ancoras__item--ativo' : ''}`}
              aria-current={secao === 'clientes' ? 'true' : undefined}
            >
              Clientes reais
            </a>
            <a
              href="#estudos"
              className={`prj-ancoras__item ${secao === 'estudos' ? 'prj-ancoras__item--ativo' : ''}`}
              aria-current={secao === 'estudos' ? 'true' : undefined}
            >
              Estudos autorais
            </a>
          </nav>
        </div>
        <div className="prj-topo__arte" aria-hidden="true">
          <Balao className="prj-topo__balao">
            Sites
            <br /> que conectam
            <br /> o Cariri
            <br /> e mais longe.
          </Balao>
          <Faiscas className="prj-topo__faiscas" />
          <svg viewBox="0 0 60 70" className="prj-topo__seta" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M40 66C14 58 6 32 22 8M22 8l-9 6M22 8l3 10" />
          </svg>
          <Cari pose="curioso" className="prj-topo__cari" carregar="eager" largura={300} />
        </div>
      </section>

      <section id="clientes" className="container prj-clientes" aria-label="Clientes reais">
        <article className="prj-destaque revelar">
          <Link to={`/${caldas.id}`} className="prj-destaque__imagem" tabIndex={-1} aria-hidden="true">
            <Tela
              src={caldas.imagem}
              srcPequena={caldas.imagemPequena}
              alt=""
              largura={caldas.imagemLargura}
              altura={caldas.imagemAltura}
              prioridade
              sizes="(max-width: 767px) 100vw, 800px"
            />
          </Link>
          <div className="prj-destaque__info">
            <p className="prj-num">01</p>
            <h2 className="titulo titulo--m prj-destaque__nome">
              <Link to={`/${caldas.id}`}>{caldas.nome}</Link>
            </h2>
            <p className="prj-meta">
              {caldas.segmento} • {caldas.cidade}
            </p>
            <p className="prj-resumo">{caldas.resumoCard}</p>
            <Link to={`/${caldas.id}`} className="link-grifo">
              Ver case <Seta tamanho={18} />
              <span className="sr-only"> do {caldas.nome}</span>
            </Link>
          </div>
        </article>

        <div className="prj-dupla">
          {outros.map((c, i) => (
            <article key={c.id} className="prj-card revelar" style={{ ['--atraso' as string]: `${i * 0.08}s` }}>
              <Link to={`/${c.id}`} tabIndex={-1} aria-hidden="true">
                <Tela src={c.imagem} srcPequena={c.imagemPequena} alt="" largura={c.imagemLargura} altura={c.imagemAltura} className="prj-card__tela" sizes="(max-width: 767px) 100vw, 600px" />
              </Link>
              <p className="prj-num">0{i + 2}</p>
              <div className="prj-card__linha">
                <div>
                  <h2 className="titulo titulo--s prj-card__nome">
                    <Link to={`/${c.id}`}>{c.nome}</Link>
                  </h2>
                  <p className="prj-meta">
                    {c.segmentoCurto} • {c.cidade}
                  </p>
                  <p className="prj-resumo">{c.resumoCard}</p>
                </div>
                <Link to={`/${c.id}`} className="link-grifo">
                  Ver case <Seta tamanho={18} />
                  <span className="sr-only"> da {c.nome}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="estudos" className="container prj-estudos" aria-labelledby="prj-estudos-titulo">
        <div className="prj-estudos__cabeca">
          <div>
            <p className="rotulo">Laboratório criativo</p>
            <h2 className="titulo titulo--l" id="prj-estudos-titulo">
              Explorando <br />
              <span className="acento">novas possibilidades.</span>
            </h2>
          </div>
          <p className="texto">
            Estudos autorais para experimentar ideias, explorar soluções e imaginar novos horizontes para diferentes
            segmentos.
          </p>
        </div>
        <ul role="list" className="prj-estudos__lista">
          {ESTUDOS.map((e) => (
            <li key={e.id} className="prj-estudo revelar">
              <div className="prj-estudo__imagem">
                <img src={e.imagem} alt={e.alt} width={600} height={375} loading="lazy" decoding="async" />
                <span className="prj-estudo__selo">Estudo</span>
              </div>
              <div>
                <h3 className="prj-estudo__nome">
                  {e.nome}
                  <br />— Estudo
                </h3>
                <p className="prj-meta prj-estudo__meta">
                  {e.segmento} • {e.local}
                </p>
                <a href={e.url} target="_blank" rel="noopener noreferrer" className="link-grifo">
                  Ver estudo <Seta tamanho={18} />
                  <span className="sr-only"> {e.nome} (abre em nova aba)</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="container" aria-labelledby="prj-convite">
        <div className="faixa-amarela prj-convite revelar">
          <div>
            <p className="rotulo prj-convite__rotulo">Vamos conversar?</p>
            <h2 className="titulo titulo--l" id="prj-convite">
              Seu negócio pode <br />
              <span className="acento">ser o próximo.</span>
            </h2>
          </div>
          <div className="prj-convite__acao">
            <p>
              Vamos conversar sobre o seu projeto e mostrar como podemos transformar suas ideias em um site com a cara do
              seu negócio.
            </p>
            <Link to="/contato" className="btn">
              Pedir prévia <Seta />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
