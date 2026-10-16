import { Link } from 'react-router-dom';
import { Acordeao, Balao, Cari, Perguntas, Sticker } from '../components/Comum';
import { Faiscas, Icone, Seta, type NomeIcone } from '../components/Icone';
import { ETAPAS_PROCESSO, FAQ_PROCESSO, MATERIAIS, type IconeEtapa } from '../content/conteudo';
import { MENSAGENS, linkWhatsApp } from '../config/site';
import { useSeo } from '../lib/hooks';

const ICONE: Record<IconeEtapa, NomeIcone> = {
  conversa: 'conversa',
  previa: 'doc-texto',
  criacao: 'monitor-lapis',
  noar: 'foguete',
};
const ICONE_MATERIAL: Record<(typeof MATERIAIS)[number], NomeIcone> = {
  Logo: 'formas',
  Fotos: 'imagem',
  Serviços: 'doc-texto',
  Contatos: 'usuario',
  'Redes sociais': 'instagram',
};

/** Ilustrações dos blocos de etapa (montadas com o kit; não são fotos). */
function Ilustracao({ etapa }: { etapa: IconeEtapa }) {
  if (etapa === 'previa') {
    return (
      <div className="pro-ilus pro-ilus--previa" aria-hidden="true">
        <div className="pro-mock">
          <div className="pro-mock__barra">
            <img src="/img/marca/webcariri-vinho.png" alt="" width={950} height={190} />
            <span>Início</span>
            <span>Sobre</span>
            <span>Serviços</span>
            <span>Contato</span>
            <b>Quero conversar!</b>
          </div>
          <div className="pro-mock__corpo">
            <p className="pro-mock__titulo">
              Seu negócio <br />
              <span>em boas mãos.</span>
            </p>
            <img src="/img/stickers/sol-e-serras-do-cariri.svg" alt="" width={190} height={130} className="pro-mock__sol" />
          </div>
        </div>
      </div>
    );
  }
  if (etapa === 'conversa') {
    return (
      <div className="pro-ilus pro-ilus--conversa" aria-hidden="true">
        <Sticker nome="entre-cafe-e-ideias" className="pro-ilus__a" />
        <Sticker nome="bora-conversar" className="pro-ilus__b" />
        <Sticker nome="ideias-daqui-novos-horizontes" className="pro-ilus__c" />
      </div>
    );
  }
  if (etapa === 'criacao') {
    return (
      <div className="pro-ilus pro-ilus--criacao" aria-hidden="true">
        <Sticker nome="notebook-criativo" className="pro-ilus__a" />
        <Sticker nome="mao-desenhando" className="pro-ilus__b" />
        <Balao forma="quadrado" className="pro-ilus__balao">
          Sites
          <br /> ideias
          <br /> pessoas
          <br /> negócios
          <br /> em movimento.
        </Balao>
      </div>
    );
  }
  return (
    <div className="pro-ilus pro-ilus--noar" aria-hidden="true">
      <Sticker nome="sol-e-serras-do-cariri" className="pro-ilus__a" />
      <Sticker nome="projeto-no-ar" className="pro-ilus__b" />
      <Sticker nome="flamula-do-cariri-pro-mundo" className="pro-ilus__c" />
    </div>
  );
}

export default function Processo() {
  useSeo('/como-funciona');

  return (
    <>
      <section className="container topo-interno pro-topo">
        <div className="pro-topo__texto">
          <p className="trilha">Processo / Como funciona</p>
          <h1 className="titulo titulo--xl pro-topo__titulo">
            Do papo <br />
            <span className="acento">ao site no ar.</span>
          </h1>
          <p className="lead">Você acompanha cada etapa.</p>
          <Link to="/contato" className="btn pro-topo__btn">
            Quero minha prévia <Seta />
          </Link>
        </div>
        <div className="pro-topo__arte" aria-hidden="true">
          <Balao className="pro-topo__balao">
            Sites
            <br /> que colocam
            <br /> o Cariri no
            <br /> mapa.
          </Balao>
          <Faiscas className="pro-topo__faiscas pro-topo__faiscas--1" />
          <Faiscas className="pro-topo__faiscas pro-topo__faiscas--2" />
          <Cari pose="no-notebook" className="pro-topo__cari" carregar="eager" largura={640} />
        </div>
      </section>

      <section className="container pro-etapas" aria-label="As quatro etapas">
        <ol role="list" className="pro-etapas__lista">
          {ETAPAS_PROCESSO.map((e, i) => (
            <li key={e.n} className="pro-etapa revelar" style={{ ['--atraso' as string]: `${i * 0.08}s` }}>
              <a href={`#etapa-${e.n}`} className="pro-etapa__link">
                <span className="pro-etapa__topo">
                  <span className="pro-etapa__num">{e.n}</span>
                  <Icone nome={ICONE[e.icone]} tamanho={44} traco={1.6} />
                </span>
                <span className="pro-etapa__texto">
                  <strong>{e.titulo}</strong>
                  <span>{e.resumo}</span>
                </span>
              </a>
              {i < ETAPAS_PROCESSO.length - 1 && <Icone nome="seta" tamanho={22} className="pro-etapa__seta" />}
            </li>
          ))}
        </ol>
      </section>

      {/* Detalhes: blocos alternados no desktop */}
      <section className="container pro-detalhes" aria-label="Cada etapa em detalhe">
        {ETAPAS_PROCESSO.map((e, i) => (
          <article key={e.n} id={`etapa-${e.n}`} className={`pro-detalhe revelar ${i % 2 === 1 ? 'pro-detalhe--inverso' : ''}`}>
            <div className="pro-detalhe__texto">
              <p className="rotulo">
                {e.n} / {e.rotulo}
              </p>
              <h2 className="titulo titulo--m">{e.detalheTitulo}</h2>
              <p className="texto">{e.detalhe}</p>
              {e.icone === 'conversa' && (
                <a href={linkWhatsApp(MENSAGENS.conversa)} target="_blank" rel="noopener noreferrer" className="btn btn--contorno btn--pequeno">
                  <Icone nome="whatsapp" tamanho={20} /> Falar no WhatsApp <Seta tamanho={18} />
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              )}
            </div>
            <Ilustracao etapa={e.icone} />
          </article>
        ))}
      </section>

      {/* Detalhes: blocos expansíveis no celular */}
      <section className="container pro-detalhes-mobile" aria-label="Cada etapa em detalhe">
        {ETAPAS_PROCESSO.map((e) => (
          <Acordeao key={e.n} titulo={`${e.n} · ${e.detalheTitulo}`}>
            <p>{e.detalhe}</p>
            {e.icone === 'conversa' && (
              <a href={linkWhatsApp(MENSAGENS.conversa)} target="_blank" rel="noopener noreferrer" className="link-grifo pro-detalhes-mobile__zap">
                <Icone nome="whatsapp" tamanho={18} /> Falar no WhatsApp
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            )}
          </Acordeao>
        ))}
      </section>

      <section className="container" aria-labelledby="pro-materiais">
        <div className="faixa-amarela pro-materiais revelar">
          <div className="pro-materiais__texto">
            <p className="rotulo">O que você manda</p>
            <h2 className="titulo titulo--m" id="pro-materiais">
              Reunimos os materiais <br />
              para dar vida ao seu site<span className="ponto">.</span>
            </h2>
            <p>A gente te orienta e organiza tudo junto com você.</p>
            <ul role="list" className="pro-materiais__lista">
              {MATERIAIS.map((m) => (
                <li key={m}>
                  <Icone nome={ICONE_MATERIAL[m]} tamanho={26} traco={1.6} /> {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="pro-materiais__arte" aria-hidden="true">
            <Balao variante="branco" fala className="pro-materiais__balao">
              A gente
              <br /> organiza
              <br /> com você.
            </Balao>
            <Faiscas className="pro-materiais__faiscas" />
            <Cari pose="saudando" className="pro-materiais__cari" largura={340} />
          </div>
        </div>
      </section>

      <section className="container pro-duvidas" aria-labelledby="pro-duvidas">
        <h2 className="titulo titulo--m" id="pro-duvidas">
          Dúvidas <br className="so-desktop" />
          frequentes
        </h2>
        <Perguntas itens={FAQ_PROCESSO} className="pro-duvidas__lista" />
      </section>

      <section className="container" aria-labelledby="pro-convite">
        <div className="pro-convite revelar">
          <div>
            <p className="rotulo pro-convite__rotulo">Vamos conversar?</p>
            <h2 className="titulo titulo--m" id="pro-convite">
              Bora começar?
            </h2>
          </div>
          <p className="pro-convite__texto">Seu site pode ser o próximo passo do seu negócio.</p>
          <Faiscas className="pro-convite__faiscas" />
          <Link to="/contato" className="btn pro-convite__btn">
            Quero minha prévia <Seta />
          </Link>
        </div>
      </section>
    </>
  );
}
