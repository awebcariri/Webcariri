import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Balao, Cari, Perguntas, Sticker, Tela } from '../components/Comum';
import { Faiscas, Icone, Seta, type NomeIcone } from '../components/Icone';
import { CASES_COM_PAGINA, ETAPAS_INICIO, FAQ_INICIO, PLANOS, type IconeEtapa, type PlanoId } from '../content/conteudo';
import { useSeo } from '../lib/hooks';

export const ICONE_ETAPA: Record<IconeEtapa, NomeIcone> = {
  conversa: 'conversa',
  previa: 'documento',
  criacao: 'lapis',
  noar: 'foguete',
};
export const ICONE_PLANO: Record<PlanoId, NomeIcone> = {
  'landing-express': 'aviao',
  'site-profissional': 'documento',
  'site-premium': 'coroa',
};

export default function Inicio() {
  useSeo('/');
  const [todasDuvidas, setTodasDuvidas] = useState(false);

  return (
    <>
      {/* ---------- topo ---------- */}
      <section className="container ini-hero">
        <div className="ini-hero__texto">
          <p className="rotulo">Estúdio criativo digital</p>
          <h1 className="titulo titulo--xl ini-hero__titulo">
            Seu negócio
            <br /> merece
            <br /> <span className="acento">presença.</span>
          </h1>
          <p className="ini-hero__sub">Sites do Cariri para todo o Brasil.</p>
          <p className="lead ini-hero__lead">
            Criamos sites que conectam seu negócio a novas possibilidades. Projetos com a cara do seu negócio, feitos para
            aparecer no Google e vender pelo WhatsApp.
          </p>
          <div className="ini-hero__acoes">
            <Link to="/contato" className="btn btn--grande">
              Pedir minha prévia <Seta />
            </Link>
            <Link to="/projetos" className="link-grifo link-grifo--amarelo ini-hero__ver">
              Ver projetos
            </Link>
            <Link to="/projetos" className="btn btn--contorno ini-hero__ver-mobile">
              Ver projetos
            </Link>
          </div>
        </div>

        <div className="ini-hero__arte" aria-label="Prévia do site de Efraim Vitaliano, feito pela WebCariri" role="img">
          <span className="ini-hero__papel ini-hero__papel--1" aria-hidden="true" />
          <span className="ini-hero__papel ini-hero__papel--2" aria-hidden="true" />
          {/* Prévia do topo: seção "conheça o meu trabalho" do site do Efraim. Troque a imagem aqui. */}
          <Tela
            src="/img/projetos/hero-efraim.webp"
            srcPequena="/img/projetos/hero-efraim-700.webp"
            alt=""
            largura={1400}
            altura={653}
            barra
            prioridade
            className="ini-hero__tela"
          />
          <Balao forma="quadrado" className="ini-hero__balao">
            Sites
            <br /> ideias
            <br /> pessoas
            <br /> negócios
            <br /> em movimento
          </Balao>
          <Faiscas className="ini-hero__faiscas" />
          <Cari pose="no-notebook" className="ini-hero__cari" carregar="eager" largura={460} />
          <p className="mao ini-hero__nota" aria-hidden="true">
            <svg viewBox="0 0 60 40" className="ini-hero__nota-seta" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M56 32C40 30 22 22 8 6M8 6l2 12M8 6l12 3" />
            </svg>
            Do Cariri
            <br /> pro mundo. ♡
          </p>
        </div>
      </section>

      {/* ---------- projetos ---------- */}
      <section className="container ini-secao" aria-labelledby="ini-projetos">
        <div className="linha-secao ini-secao__cabeca">
          <h2 className="secao-nome" id="ini-projetos">
            Projetos em destaque
          </h2>
          <p className="rotulo ini-secao__apoio">Sites com a cara de negócios reais do nosso Cariri</p>
        </div>
        <ul role="list" className="ini-projetos">
          {CASES_COM_PAGINA().map((c, i) => (
            <li key={c.id} className="ini-projeto revelar" style={{ ['--atraso' as string]: `${i * 0.08}s` }}>
              <Link to={`/${c.id}`} className="ini-projeto__imagem" tabIndex={-1} aria-hidden="true">
                <Tela src={c.imagemPequena} alt="" largura={700} altura={490} className={`ini-projeto__tela ini-projeto__tela--${c.id}`} />
              </Link>
              <div className="ini-projeto__nome">
                <Link to={`/${c.id}`}>{c.nome === 'Lunar Doceria' ? 'Lunar' : c.nome}</Link>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="ini-projeto__externo">
                  <Icone nome="externo" tamanho={20} />
                  <span className="sr-only">Visitar o site {c.nome} (abre em nova aba)</span>
                </a>
              </div>
              <p className="ini-projeto__meta">
                {c.tipo} · {c.segmento} · {c.cidade}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- como funciona ---------- */}
      <section className="container ini-secao" aria-labelledby="ini-processo">
        <div className="linha-secao ini-secao__cabeca">
          <h2 className="secao-nome" id="ini-processo">
            Como funciona
          </h2>
          <p className="rotulo ini-secao__apoio">Do primeiro contato ao seu site no ar</p>
        </div>
        <ol role="list" className="ini-etapas">
          {ETAPAS_INICIO.map((e, i) => (
            <li key={e.n} className="ini-etapa revelar" style={{ ['--atraso' as string]: `${i * 0.08}s` }}>
              <div className="ini-etapa__topo">
                <span className="selo-num">{e.n}</span>
                <Icone nome={ICONE_ETAPA[e.icone]} tamanho={40} traco={1.7} className="ini-etapa__icone" />
              </div>
              <div>
                <h3 className="ini-etapa__titulo">{e.titulo}</h3>
                <p className="ini-etapa__texto">
                  <span className="ini-etapa__texto--longo">{e.texto}</span>
                  <span className="ini-etapa__texto--curto">{e.curto}</span>
                </p>
              </div>
              {i < ETAPAS_INICIO.length - 1 && <Icone nome="seta" tamanho={22} className="ini-etapa__seta" />}
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- planos ---------- */}
      <section className="container ini-secao" aria-labelledby="ini-planos">
        <div className="linha-secao ini-secao__cabeca">
          <h2 className="secao-nome" id="ini-planos">
            Planos e investimento
          </h2>
          <p className="rotulo ini-secao__apoio">Sites para cada momento do seu negócio</p>
        </div>
        <ul role="list" className="ini-planos">
          {PLANOS.map((p, i) => (
            <li
              key={p.id}
              className={`ini-plano revelar ${p.destaque ? 'ini-plano--destaque' : ''}`}
              style={{ ['--atraso' as string]: `${i * 0.08}s` }}
            >
              <div className="ini-plano__cabeca">
                <Icone nome={ICONE_PLANO[p.id]} tamanho={34} traco={1.9} className="ini-plano__icone" />
                <div>
                  <h3 className="ini-plano__nome">{p.nome}</h3>
                  <p className="ini-plano__resumo">{p.resumoInicio}</p>
                </div>
              </div>
              <p className="ini-plano__preco">
                <span>A partir de</span> R$ {p.preco}
              </p>
              <ul role="list" className="ini-plano__itens">
                {p.itensInicio.map((item) => (
                  <li key={item}>
                    <Icone nome="check" tamanho={20} traco={2.4} /> {item}
                  </li>
                ))}
              </ul>
              <Link to={`/contato?plano=${p.id}`} className="btn btn--bloco ini-plano__botao">
                Quero minha prévia <Seta />
              </Link>
              {/* Celular: o resumo leva à página completa de planos */}
              <Link to="/planos" className="ini-plano__link-mobile">
                <span className="sr-only">Ver detalhes do plano {p.nome}</span>
                <Icone nome="seta" tamanho={20} traco={2} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- dúvidas ---------- */}
      <section className="container ini-secao" aria-labelledby="ini-duvidas">
        <div className="linha-secao ini-secao__cabeca">
          <h2 className="secao-nome" id="ini-duvidas">
            Dúvidas frequentes
          </h2>
          <p className="rotulo ini-secao__apoio">Respostas para você seguir com tranquilidade</p>
        </div>
        <div className={`ini-duvidas ${todasDuvidas ? 'ini-duvidas--todas' : ''}`}>
          <Perguntas itens={FAQ_INICIO.slice(0, 4)} className="ini-duvidas__coluna" />
          <Perguntas itens={FAQ_INICIO.slice(4)} className="ini-duvidas__coluna ini-duvidas__coluna--2" />
        </div>
        {!todasDuvidas && (
          <button type="button" className="link-grifo ini-duvidas__mais" onClick={() => setTodasDuvidas(true)}>
            Ver mais dúvidas <Icone nome="chevron" tamanho={18} />
          </button>
        )}
      </section>

      {/* ---------- convite ---------- */}
      <section className="container" aria-labelledby="ini-convite">
        <div className="ini-convite revelar">
          <h2 className="titulo ini-convite__titulo" id="ini-convite">
            Bora colocar <br />
            <span className="acento">sua ideia no ar?</span>
          </h2>
          <div className="ini-convite__acao">
            <p>Fale com a gente e receba uma prévia personalizada para o seu negócio.</p>
            <Link to="/contato" className="btn">
              Pedir minha prévia <Seta />
            </Link>
          </div>
          <div className="ini-convite__arte" aria-hidden="true">
            <Faiscas className="ini-convite__faiscas" />
            <Cari pose="saudando" className="ini-convite__cari" largura={260} />
            <Sticker nome="seu-site-seu-jeito" className="ini-convite__sticker" />
          </div>
        </div>
      </section>
    </>
  );
}
