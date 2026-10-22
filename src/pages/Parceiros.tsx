import { Link } from 'react-router-dom';
import { TopoPagina } from '../components/Comum';
import { Seta } from '../components/Icone';
import { useSeo } from '../lib/hooks';

const SERVICOS = [
  { titulo: 'Sites institucionais', texto: 'Uma presença própria para os clientes da sua agência' },
  { titulo: 'Landing pages', texto: 'Páginas para uma oferta ou campanha, prontas para receber tráfego' },
  { titulo: 'Projetos sob medida', texto: 'Escopo, prazo e responsabilidades combinados em cada projeto' },
];

const PASSOS = [
  { titulo: 'Alinhamos a demanda', texto: 'Entendemos os objetivos, o público e os requisitos do projeto' },
  { titulo: 'Definimos escopo e responsabilidades', texto: 'Deixamos claro o que fica com sua agência e o que fica com a WebCariri' },
  { titulo: 'Criamos e revisamos juntos', texto: 'Desenvolvemos, alinhamos os ajustes e entregamos o site pronto' },
];

// REVISAR: divisão de papéis é uma proposta de comunicação, combinada por projeto (não é contrato).
const AGENCIA = [
  { titulo: 'Estratégia', texto: 'Posicionamento, campanha e definição de objetivos' },
  { titulo: 'Cliente', texto: 'Relacionamento, briefing e aprovações' },
  { titulo: 'Conteúdo', texto: 'Textos, imagens e direcionamentos da comunicação' },
];
const WEBCARIRI = [
  { titulo: 'Design', texto: 'Direção criativa, interface e prototipação do site' },
  { titulo: 'Desenvolvimento', texto: 'Tecnologia, desempenho e adaptação a todas as telas' },
  { titulo: 'Publicação', texto: 'Configuração, testes e site no ar, pronto para uso' },
];

const CONTATO_PARCERIA = '/contato?plano=parceria';

export default function Parceiros() {
  useSeo('/parceiros');

  return (
    <>
      <TopoPagina
        rotulo="Para agências"
        titulo={
          <>
            Sua estratégia. <em>Nosso design e código.</em>
          </>
        }
        lead="A sua agência cuida da estratégia, do relacionamento e da comunicação. A WebCariri entra com o design e o desenvolvimento dos sites, no prazo combinado."
      >
        <Link to={CONTATO_PARCERIA} className="btn">
          Conversar sobre parceria <Seta />
        </Link>
      </TopoPagina>

      <section className="secao" aria-labelledby="age-servicos">
        <div className="container">
          <div className="cabeca-secao">
            <div>
              <p className="rotulo">O que construímos</p>
              <h2 className="titulo titulo--2" id="age-servicos">
                Três formatos de entrega.
              </h2>
            </div>
          </div>
          <ol role="list" className="colunas-3">
            {SERVICOS.map((s, i) => (
              <li key={s.titulo} className="revelar" style={{ ['--atraso' as string]: `${i * 0.08}s` }}>
                <span className="numero">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="titulo titulo--3">{s.titulo}</h3>
                <p className="texto">{s.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="secao secao--escura" aria-labelledby="age-passos">
        <div className="container">
          <div className="cabeca-secao">
            <div>
              <p className="rotulo">Como começamos</p>
              <h2 className="titulo titulo--2" id="age-passos">
                Uma parceria bem combinada.
              </h2>
            </div>
          </div>
          <ol role="list" className="etapas etapas--3">
            {PASSOS.map((p, i) => (
              <li key={p.titulo} className="etapas__item revelar" style={{ ['--atraso' as string]: `${i * 0.08}s` }}>
                <span className="numero">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="titulo titulo--3">{p.titulo}</h3>
                <p className="texto">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="secao" aria-labelledby="age-papeis">
        <div className="container">
          <div className="cabeca-secao">
            <div>
              <p className="rotulo">Papéis</p>
              <h2 className="titulo titulo--2" id="age-papeis">
                Cada um no que faz melhor.
              </h2>
            </div>
            <div className="cabeca-secao__apoio">
              <p className="texto">A divisão é combinada em cada projeto.</p>
            </div>
          </div>
          <div className="papeis">
            {[
              { nome: 'Sua agência', itens: AGENCIA },
              { nome: 'WebCariri', itens: WEBCARIRI },
            ].map((lado) => (
              <div key={lado.nome} className="papeis__coluna revelar">
                <h3 className="titulo titulo--3">{lado.nome}</h3>
                <dl>
                  {lado.itens.map((item) => (
                    <div key={item.titulo}>
                      <dt>{item.titulo}</dt>
                      <dd>{item.texto}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
