import { Link } from 'react-router-dom';
import { BotoesCase, CapturaAmpliavel, ProximoCase } from '../components/Case';
import { Balao, Cari, Sticker, Trilha } from '../components/Comum';
import { Faiscas, Icone, Seta, type NomeIcone } from '../components/Icone';
import { caseById } from '../content/conteudo';
import { useSeo } from '../lib/hooks';

const ENTREGAS: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: 'cupcake', titulo: 'Cardápio visual', texto: 'Os doces em destaque, com uma apresentação leve e apetitosa.' },
  { icone: 'doc-texto', titulo: 'História da marca', texto: 'Um espaço para contar a essência da Lunar e o que torna seus doces especiais.' },
  { icone: 'whatsapp', titulo: 'Encomendas pelo WhatsApp', texto: 'Botão direto para facilitar o contato e os pedidos.' },
  { icone: 'coracao', titulo: 'Identidade delicada', texto: 'Um visual que transmite a doçura da marca, com cores e tipografia na medida certa.' },
];

export default function CaseLunar() {
  useSeo('/lunar');
  const caso = caseById('lunar');

  return (
    <>
      <section className="container topo-interno cas-topo">
        <div className="cas-topo__texto">
          <Trilha itens={[{ label: 'Início', to: '/' }, { label: 'Projetos', to: '/projetos' }, { label: 'Lunar' }]} />
          <h1 className="titulo titulo--xl cas-titulo lun-titulo">
            Lunar <br />
            <span className="acento">Doceria.</span>
          </h1>
          <p className="lun-sub">Uma vitrine delicada para encomendas especiais.</p>
          <p className="rotulo lun-meta">Gastronomia • Cariri, CE</p>
          <BotoesCase caso={caso} contorno />
        </div>
        <div className="cas-topo__arte lun-arte" aria-hidden="true">
          <Balao className="lun-arte__balao">
            Sites <br />
            com <br />
            propósito.
          </Balao>
          <Faiscas className="lun-arte__faiscas" />
          <Cari pose="curioso" className="lun-arte__cari" carregar="eager" largura={260} />
        </div>
      </section>

      <div className="container">
        <CapturaAmpliavel caso={caso} className="cas-captura lun-captura" />
      </div>

      <section className="container lun-bloco lun-desafio" aria-labelledby="lun-desafio">
        <div>
          <p className="cas-num">01</p>
          <h2 className="titulo titulo--l" id="lun-desafio">
            O desafio<span className="ponto">.</span>
          </h2>
          <p className="lead lun-desafio__texto">
            A Lunar Doceria precisava de uma vitrine própria para apresentar seu cardápio e facilitar as encomendas,
            traduzindo a delicadeza da marca em um site simples, bonito e direto.
          </p>
        </div>
        <div className="lun-desafio__arte" aria-hidden="true">
          <Sticker nome="asterisco" className="lun-desafio__asterisco" />
          <p className="nota-caps lun-desafio__nota">
            Do Cariri <br />
            para novos <br />
            horizontes.
          </p>
        </div>
      </section>

      <section className="container lun-bloco" aria-labelledby="lun-entregas">
        <p className="cas-num">02</p>
        <h2 className="titulo titulo--l" id="lun-entregas">
          O que entregamos<span className="ponto">.</span>
        </h2>
        <ul role="list" className="lun-entregas">
          {ENTREGAS.map((e) => (
            <li key={e.titulo}>
              <span className="cas-circulo cas-circulo--rosado">
                <Icone nome={e.icone} tamanho={26} traco={1.5} />
              </span>
              <div>
                <h3>{e.titulo}</h3>
                <p>{e.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="container lun-bloco lun-caminho" aria-labelledby="lun-caminho">
        <div>
          <p className="cas-num">03</p>
          <h2 className="titulo titulo--l" id="lun-caminho">
            Da descoberta <br />à encomenda, <br />
            <span className="acento">
              um caminho <br />
              mais simples.
            </span>
          </h2>
        </div>
        <div className="lun-caminho__lado">
          <p className="texto">
            Um site que conecta o cardápio, a história e o contato em uma experiência leve, pensada para levar quem visita
            até a encomenda de forma prática e organizada.
          </p>
          <div className="lun-caminho__arte" aria-hidden="true">
            <Faiscas className="lun-caminho__faiscas" />
            <Cari pose="curioso" className="lun-caminho__cari" largura={170} />
            <Balao className="lun-caminho__balao">
              Ideias <br />
              do Cariri <br />
              para novos <br />
              horizontes.
            </Balao>
          </div>
        </div>
      </section>

      <section className="container" aria-labelledby="lun-convite">
        <div className="faixa-amarela lun-convite revelar">
          <div>
            <h2 className="titulo titulo--m" id="lun-convite">
              Vamos criar a presença <br />
              <span className="acento">do seu negócio?</span>
            </h2>
            <p>
              Sites com personalidade. <br />
              Presença com propósito.
            </p>
          </div>
          <Link to="/contato" className="btn btn--vinho">
            Pedir uma prévia <Seta />
          </Link>
        </div>
      </section>

      <ProximoCase
        caso={caseById('caldas')}
        numero="04"
        estilo="cartao"
        texto="Um site para mostrar toda a estrutura do balneário e facilitar o planejamento dos visitantes."
      />
    </>
  );
}
