import { Link } from 'react-router-dom';
import { Perguntas } from '../components/Comum';
import { Seta } from '../components/Icone';
import { FaixaProjetos, Marca, Vitrine } from '../components/Vitrine';
import { CASES_COM_PAGINA, ETAPAS_INICIO, FAQ_INICIO, PLANOS } from '../content/conteudo';
import { useSeo } from '../lib/hooks';

export default function Inicio() {
  useSeo('/inicio');
  const projetos = CASES_COM_PAGINA();
  const cartazes = projetos.slice(0, 3);

  return (
    <>
      {/* ---------- abertura: trabalhos em cartaz e a marca gigante (Studio Ag) ---------- */}
      <section className="abre" aria-labelledby="abre-titulo">
        <p className="abre__rotulo">Estúdio de sites · Juazeiro do Norte, CE</p>
        <ul role="list" className="abre__cartazes" aria-label="Sites recentes">
          {cartazes.map((c) => (
            <li key={c.id}>
              <Link to={`/${c.id}`} aria-label={`${c.nome}: ver case`}>
                <img
                  src={c.imagemPequena}
                  srcSet={`${c.imagemPequena} 700w, ${c.imagem} ${c.imagemLargura}w`}
                  sizes="(max-width: 767px) 40vw, 22vw"
                  alt=""
                  width={700}
                  height={490}
                  {...{ fetchpriority: 'high' }}
                  decoding="async"
                />
                <span>{c.nome}</span>
              </Link>
            </li>
          ))}
        </ul>
        <h1 className="abre__marca" id="abre-titulo">
          <Marca titulo="WebCariri" />
          <span className="sr-only"> — estúdio de criação de sites em Juazeiro do Norte</span>
        </h1>
      </section>

      {/* ---------- manifesto (This January) ---------- */}
      <section className="manifesto" aria-label="Sobre o estúdio">
        <div className="container">
          <p className="manifesto__texto revelar">
            A WebCariri é um estúdio <em>independente</em> de sites, nascido no Cariri. Criamos sites e landing pages com a
            cara de cada negócio: <em>claros,</em> rápidos, feitos primeiro para o celular e prontos para aparecer no Google e
            conversar pelo WhatsApp.
          </p>
          <div className="manifesto__rodape revelar" style={{ ['--atraso' as string]: '0.1s' }}>
            <Link to="/contato" className="btn">
              Solicitar proposta <Seta />
            </Link>
            <Link to="/como-funciona" className="link-seta">
              Como trabalhamos <Seta tamanho={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- vitrine: um painel por projeto, a cor muda com o trabalho (Studio Ag) ---------- */}
      <section aria-labelledby="ini-trabalhos">
        <div className="container">
          <h2 className="titulo-caixa revelar" id="ini-trabalhos">
            Sites com personalidade para negócios <em>de verdade.</em>
          </h2>
        </div>
        <Vitrine projetos={projetos} />
        <FaixaProjetos projetos={projetos} />
      </section>

      {/* ---------- processo ---------- */}
      <section className="secao" aria-labelledby="ini-processo">
        <div className="container">
          <div className="cabeca-secao">
            <div>
              <p className="rotulo">Processo</p>
              <h2 className="titulo titulo--2" id="ini-processo">
                Do primeiro contato <em>ao site no ar.</em>
              </h2>
            </div>
            <div className="cabeca-secao__apoio">
              <p className="texto">Prévia da primeira tela antes de fechar. Prazo médio de cerca de 12 dias.</p>
              <Link to="/como-funciona" className="link-seta">
                Ver o processo <Seta tamanho={16} />
              </Link>
            </div>
          </div>
          <ol role="list" className="etapas">
            {ETAPAS_INICIO.map((e, i) => (
              <li key={e.n} className="etapas__item revelar" style={{ ['--atraso' as string]: `${i * 0.08}s` }}>
                <span className="etapas__num">{e.n}</span>
                <h3 className="titulo titulo--3">{e.titulo}</h3>
                <p className="texto">{e.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- planos: preços grandes ---------- */}
      <section className="secao secao--escura" aria-labelledby="ini-planos">
        <div className="container">
          <div className="cabeca-secao">
            <div>
              <p className="rotulo">Planos</p>
              <h2 className="titulo titulo--2" id="ini-planos">
                Três formas de <em>começar.</em>
              </h2>
            </div>
            <div className="cabeca-secao__apoio">
              <p className="texto">Valores de partida. Pagamento 50% no início e 50% na entrega.</p>
              <Link to="/planos" className="link-seta">
                Comparar planos <Seta tamanho={16} />
              </Link>
            </div>
          </div>
          <ul role="list" className="precos">
            {PLANOS.map((p, i) => (
              <li key={p.id} className="revelar" style={{ ['--atraso' as string]: `${i * 0.08}s` }}>
                <Link to={`/contato?plano=${p.id}`} className="precos__link">
                  <span className="precos__nome">{p.nome}</span>
                  <span className="precos__valor">
                    <small>a partir de R$</small>
                    {p.preco}
                  </span>
                  <span className="precos__resumo">{p.resumoInicio}</span>
                  <span className="precos__cta">
                    Solicitar este plano <Seta tamanho={16} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- perguntas ---------- */}
      <section className="secao" aria-labelledby="ini-duvidas">
        <div className="container duvidas">
          <div>
            <p className="rotulo">Dúvidas</p>
            <h2 className="titulo titulo--2" id="ini-duvidas">
              Perguntas <em>frequentes.</em>
            </h2>
          </div>
          <Perguntas itens={FAQ_INICIO} />
        </div>
      </section>
    </>
  );
}
