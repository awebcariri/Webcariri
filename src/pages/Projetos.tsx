import { useEffect, useState } from 'react';
import { TopoPagina } from '../components/Comum';
import { Vitrine } from '../components/Vitrine';
import { CASES_COM_PAGINA, ESTUDOS } from '../content/conteudo';
import { useSeo } from '../lib/hooks';

export default function Projetos() {
  useSeo('/projetos');
  const projetos = CASES_COM_PAGINA();
  const [secao, setSecao] = useState<'clientes' | 'estudos'>('clientes');

  // Marca a âncora da seção que está na tela.
  useEffect(() => {
    const estudos = document.getElementById('estudos');
    if (!estudos || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(
      ([e]) => setSecao(e.isIntersecting || e.boundingClientRect.top < 0 ? 'estudos' : 'clientes'),
      { rootMargin: '0px 0px -55% 0px' }
    );
    obs.observe(estudos);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <TopoPagina
        rotulo="Projetos"
        titulo={
          <>
            Trabalhos que já estão <em>no ar.</em>
          </>
        }
        lead="Sites de clientes reais e estudos autorais para diferentes segmentos. Cada projeto com a identidade do próprio negócio."
      >
        <nav className="abas" aria-label="Seções desta página">
          <a href="#clientes" className={secao === 'clientes' ? 'ativa' : ''} aria-current={secao === 'clientes' ? 'true' : undefined}>
            Clientes <span>{projetos.length}</span>
          </a>
          <a href="#estudos" className={secao === 'estudos' ? 'ativa' : ''} aria-current={secao === 'estudos' ? 'true' : undefined}>
            Estudos autorais <span>{ESTUDOS.length}</span>
          </a>
        </nav>
      </TopoPagina>

      <section id="clientes" className="prj-clientes" aria-label="Clientes">
        <Vitrine projetos={projetos} />
      </section>

      <section id="estudos" className="secao prj-estudos" aria-labelledby="prj-estudos-titulo">
        <div className="container">
          <div className="cabeca-secao">
            <div>
              <p className="rotulo">Estudos autorais</p>
              <h2 className="titulo titulo--2" id="prj-estudos-titulo">
                Laboratório de ideias.
              </h2>
            </div>
            <div className="cabeca-secao__apoio">
              <p className="texto">
                Projetos criados pelo estúdio, sem cliente, para testar soluções em segmentos diferentes. Não são trabalhos
                encomendados.
              </p>
            </div>
          </div>
          <ul role="list" className="grade-estudos">
            {ESTUDOS.map((e) => (
              <li key={e.id} className="revelar">
                <a href={e.url} target="_blank" rel="noopener noreferrer" className="estudo">
                  <figure className="tela revelar-img" style={{ ['--recorte' as string]: '16 / 10' }}>
                    <img src={e.imagem} alt={e.alt} width={600} height={375} loading="lazy" decoding="async" />
                  </figure>
                  <div className="estudo__info">
                    <h3 className="titulo titulo--3">{e.nome}</h3>
                    <span className="estudo__selo">Estudo</span>
                  </div>
                  <p className="cartao-projeto__meta">
                    {e.segmento} · {e.local} · Ver estudo
                    <span className="sr-only"> (abre em nova aba)</span>
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
