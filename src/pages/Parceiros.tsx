import { Link } from 'react-router-dom';
import { Balao, Cari, Sticker } from '../components/Comum';
import { Faiscas, Icone, Seta, type NomeIcone } from '../components/Icone';
import { useSeo } from '../lib/hooks';

const SERVICOS: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: 'janela-casa', titulo: 'Sites institucionais', texto: 'Uma presença própria para os clientes da sua agência' },
  { icone: 'janela-lista', titulo: 'Landing pages', texto: 'Páginas para uma oferta ou campanha, prontas para receber tráfego' },
  { icone: 'varinha', titulo: 'Projetos sob medida', texto: 'Escopo, prazo e responsabilidades combinados em cada projeto' },
];

const PASSOS: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: 'doc-texto', titulo: 'Alinhamos a demanda', texto: 'Entendemos os objetivos, o público e os requisitos do projeto' },
  { icone: 'conversas', titulo: 'Definimos escopo e responsabilidades', texto: 'Deixamos claro o que fica com sua agência e o que fica com a WebCariri' },
  { icone: 'check-circulo', titulo: 'Criamos e revisamos juntos', texto: 'Desenvolvemos, alinhamos os ajustes e entregamos o site pronto' },
];

// REVISAR: divisão de papéis é uma proposta de comunicação, combinada por projeto (não é contrato).
const AGENCIA: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: 'megafone', titulo: 'Estratégia', texto: 'Posicionamento, campanha e definição de objetivos' },
  { icone: 'pessoas', titulo: 'Cliente', texto: 'Relacionamento, briefing e aprovações' },
  { icone: 'doc-texto', titulo: 'Conteúdo', texto: 'Textos, imagens e direcionamentos da comunicação' },
];
const WEBCARIRI: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: 'pincel', titulo: 'Design', texto: 'Direção criativa, UI e prototipação do site' },
  { icone: 'codigo', titulo: 'Desenvolvimento', texto: 'Tecnologia, performance e responsividade' },
  { icone: 'foguete', titulo: 'Publicação', texto: 'Configuração, testes e site no ar, pronto para uso' },
];

const CONTATO_PARCERIA = '/contato?plano=parceria';

export default function Parceiros() {
  useSeo('/parceiros');

  return (
    <>
      <section className="container topo-interno age-topo">
        <div className="age-topo__texto">
          <p className="rotulo age-linha">Para agências / parceiros</p>
          <h1 className="titulo titulo--xl age-topo__titulo">
            Sua estratégia<span className="ponto">.</span>
            <br />
            <span className="acento">
              Nosso design <br />e código.
            </span>
          </h1>
          <p className="age-topo__sub">Sites para os clientes da sua agência.</p>
          <p className="texto age-topo__texto-apoio">
            Você cuida da estratégia, do relacionamento e da comunicação. A WebCariri entra com o design e o
            desenvolvimento dos sites, com qualidade e no prazo combinado.
          </p>
          <Link to={CONTATO_PARCERIA} className="btn age-topo__btn">
            Conversar sobre parceria <Seta />
          </Link>
        </div>
        <div className="age-topo__arte" aria-hidden="true">
          <span className="age-topo__mancha" />
          <div className="age-janela">
            <span className="age-janela__pontos" />
            <p>
              Sites que <br />
              impulsionam <br />
              negócios.
            </p>
            <span className="age-janela__linha" />
            <span className="age-janela__linha age-janela__linha--curta" />
            <span className="age-janela__botao">
              <Icone nome="seta-diag" tamanho={18} traco={2.4} />
            </span>
          </div>
          <Balao variante="serif" className="age-topo__balao">
            Do Cariri <br />
            pro mundo<span className="ponto">.</span>
          </Balao>
          <Faiscas className="age-topo__faiscas age-topo__faiscas--1" />
          <Faiscas className="age-topo__faiscas age-topo__faiscas--2" />
          <Cari pose="no-notebook" className="age-topo__cari" carregar="eager" largura={520} />
        </div>
      </section>

      <section className="container age-secao" aria-labelledby="age-servicos">
        <div className="linha-secao age-secao__cabeca">
          <h2 className="rotulo" id="age-servicos">
            O que construímos juntos
          </h2>
          <p className="rotulo age-secao__apoio">Sites, ideias, pessoas, negócios em movimento.</p>
        </div>
        <ul role="list" className="age-servicos">
          {SERVICOS.map((s, i) => (
            <li key={s.titulo} className="age-servico revelar" style={{ ['--atraso' as string]: `${i * 0.08}s` }}>
              <Icone nome={s.icone} tamanho={64} traco={1.5} />
              <div>
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="container age-secao" aria-labelledby="age-passos">
        <div className="linha-secao age-secao__cabeca">
          <h2 className="rotulo" id="age-passos">
            Uma parceria bem combinada
          </h2>
        </div>
        <ol role="list" className="age-passos">
          {PASSOS.map((p, i) => (
            <li key={p.titulo} className="age-passo revelar" style={{ ['--atraso' as string]: `${i * 0.08}s` }}>
              <div className="age-passo__topo">
                <span className="selo-num">0{i + 1}</span>
                <Icone nome={p.icone} tamanho={46} traco={1.6} />
              </div>
              <div>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container age-secao age-secao--papeis" aria-labelledby="age-papeis">
        <div className="linha-secao age-secao__cabeca">
          <h2 className="rotulo" id="age-papeis">
            Cada um no seu melhor papel
          </h2>
          <p className="rotulo age-secao__apoio">Combinado por projeto</p>
        </div>
        <div className="age-papeis">
          <div className="age-papel age-papel--agencia revelar">
            <h3 className="titulo">Sua agência</h3>
            <ul role="list">
              {AGENCIA.map((a) => (
                <li key={a.titulo}>
                  <Icone nome={a.icone} tamanho={36} traco={1.7} />
                  <div>
                    <strong>{a.titulo}</strong>
                    <span>{a.texto}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="age-papel age-papel--webcariri revelar">
            <h3 className="titulo">WebCariri</h3>
            <ul role="list">
              {WEBCARIRI.map((a) => (
                <li key={a.titulo}>
                  <Icone nome={a.icone} tamanho={36} traco={1.7} />
                  <div>
                    <strong>{a.titulo}</strong>
                    <span>{a.texto}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container" aria-labelledby="age-convite">
        <div className="age-convite fundo-escuro revelar">
          <div className="age-convite__texto">
            <p className="rotulo age-linha age-linha--clara">Parceria com propósito</p>
            <h2 className="titulo" id="age-convite">
              Vamos somar <br />
              <span className="acento">ao seu time?</span>
            </h2>
            <p>Conte um pouco sobre o seu projeto ou agência. Vamos conversar sobre como podemos trabalhar juntos.</p>
          </div>
          <Link to={CONTATO_PARCERIA} className="btn age-convite__btn">
            Conversar sobre parceria <Seta />
          </Link>
          <div className="age-convite__arte" aria-hidden="true">
            <Cari pose="saudando" className="age-convite__cari" largura={300} />
            <Sticker nome="seu-site-seu-jeito" className="age-convite__sticker" />
          </div>
        </div>
      </section>
    </>
  );
}
