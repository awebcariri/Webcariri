import { Link } from 'react-router-dom';
import { Acordeao, Balao, Cari, Sticker, Trilha } from '../components/Comum';
import { Faiscas, Icone, Seta } from '../components/Icone';
import { COMPARATIVO, PAGAMENTO, PLANOS, POS_LANCAMENTO } from '../content/conteudo';
import { useSeo } from '../lib/hooks';

function Valor({ v }: { v: boolean | string }) {
  if (v === true)
    return (
      <span className="pla-check">
        <Icone nome="check" tamanho={14} traco={3} />
        <span className="sr-only">Incluso</span>
      </span>
    );
  if (v === false)
    return (
      <span className="pla-nao">
        <span aria-hidden="true">—</span>
        <span className="sr-only">Não incluso</span>
      </span>
    );
  return <span>{v}</span>;
}

export default function Planos() {
  useSeo('/planos');

  return (
    <>
      <section className="container topo-interno pla-topo">
        <div className="pla-topo__texto">
          <Trilha itens={[{ label: 'Início', to: '/' }, { label: 'Planos' }]} />
          <h1 className="titulo titulo--xl pla-topo__titulo">
            Seu próximo <br />
            passo <br />
            <span className="acento">começa aqui.</span>
          </h1>
          <Faiscas className="pla-topo__faiscas-titulo" />
          <p className="lead pla-topo__lead">Valores de partida. Escopo e valor definidos antes de começar.</p>
        </div>
        <div className="pla-topo__arte" aria-hidden="true">
          <Balao variante="branco" forma="quadrado" className="pla-topo__balao">
            Sites
            <br /> com propósito
            <br /> para negócios
            <br /> reais.
          </Balao>
          <Faiscas className="pla-topo__faiscas" />
          <Cari pose="no-notebook" className="pla-topo__cari" carregar="eager" largura={620} />
        </div>
      </section>

      <section className="container" aria-label="Planos">
        <ul role="list" className="pla-cards">
          {PLANOS.map((p, i) => (
            <li
              key={p.id}
              className={`pla-card pla-card--${p.id} revelar`}
              style={{ ['--atraso' as string]: `${i * 0.08}s` }}
            >
              {p.destaque && <p className="pla-card__selo">Mais escolhido</p>}
              <h2 className="pla-card__nome">{p.nome}</h2>
              <p className="pla-card__resumo">{p.resumo}</p>
              <p className="pla-card__preco">
                <span>A partir de</span>
                <strong>R$ {p.preco}</strong>
              </p>
              <ul role="list" className="pla-card__itens">
                {p.itens.map((item) => (
                  <li key={item}>
                    <span className="pla-check" aria-hidden="true">
                      <Icone nome="check" tamanho={14} traco={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to={`/contato?plano=${p.id}`} className={`btn btn--bloco ${p.destaque ? 'btn--amarelo' : ''}`}>
                Quero este plano <Seta />
                <span className="sr-only">: {p.nome}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="pla-pagamento revelar">
          <Icone nome="cartao" tamanho={44} traco={1.6} className="pla-pagamento__icone" />
          <div>
            <h2 className="pla-pagamento__titulo">{PAGAMENTO.titulo}</h2>
            <p>{PAGAMENTO.texto}</p>
          </div>
          <div className="pla-pagamento__arte" aria-hidden="true">
            <Balao variante="branco" forma="quadrado" className="pla-pagamento__balao">
              Sem surpresas.
              <br /> Tudo combinado
              <br /> desde o início.
            </Balao>
            <Faiscas className="pla-pagamento__faiscas" />
          </div>
        </div>
      </section>

      {/* Comparativo: tabela no desktop */}
      <section className="container pla-comparativo" aria-labelledby="pla-comp">
        <h2 className="titulo titulo--m" id="pla-comp">
          Comparativo de recursos
        </h2>
        <p className="texto">Veja o que está incluso em cada plano e encontre o ideal para o seu momento.</p>
        <div className="pla-tabela-wrap">
          <table className="pla-tabela">
            <thead>
              <tr>
                <th scope="col">Recursos</th>
                {PLANOS.map((p) => (
                  <th key={p.id} scope="col" className={p.destaque ? 'pla-tabela__destaque' : ''}>
                    {p.nome}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARATIVO.map((linha) => (
                <tr key={linha.recurso}>
                  <th scope="row">{linha.recurso}</th>
                  {linha.valores.map((v, i) => (
                    <td key={i}>
                      <Valor v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Comparativo: blocos expansíveis no celular */}
      <section className="container pla-comparativo-mobile" aria-label="Comparar recursos">
        <Acordeao titulo="Comparar recursos" className="pla-caixa">
          <div className="pla-comp-blocos">
            {COMPARATIVO.map((linha) => (
              <div key={linha.recurso} className="pla-comp-bloco">
                <h4>{linha.recurso}</h4>
                <dl>
                  {PLANOS.map((p, i) => (
                    <div key={p.id}>
                      <dt>{p.nome}</dt>
                      <dd>
                        <Valor v={linha.valores[i]} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Acordeao>
      </section>

      <section className="container pla-depois" aria-labelledby="pla-depois">
        <div className="pla-depois__texto">
          <h2 className="titulo titulo--m" id="pla-depois">
            Depois do <span className="acento">lançamento.</span>
          </h2>
          <p className="texto">Seu site no ar e bem cuidado, para continuar gerando oportunidades.</p>
          <div className="pla-depois__itens">
            {POS_LANCAMENTO.map((item) => (
              <div key={item.id} className="pla-depois__item">
                <Icone nome={item.id === 'hospedagem' ? 'servidor' : 'engrenagem'} tamanho={44} traco={1.6} />
                <div>
                  <h3>{item.titulo}</h3>
                  <p>{item.texto}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pla-depois__mobile">
            {POS_LANCAMENTO.map((item) => (
              <Acordeao
                key={item.id}
                className="pla-caixa"
                titulo={item.titulo}
                icone={<Icone nome={item.id === 'hospedagem' ? 'servidor' : 'engrenagem'} tamanho={24} traco={1.7} />}
              >
                <p>{item.texto}</p>
              </Acordeao>
            ))}
          </div>
        </div>
        <div className="pla-depois__arte" aria-hidden="true">
          <p className="pla-depois__fala">
            Posso ajudar <br />
            você a escolher.
          </p>
          <Faiscas className="pla-depois__faiscas" />
          <Cari pose="curioso" className="pla-depois__cari" largura={260} />
        </div>
      </section>

      <section className="container" aria-labelledby="pla-convite">
        <div className="faixa-amarela pla-convite revelar">
          <Faiscas className="pla-convite__faiscas" />
          <h2 className="titulo pla-convite__titulo" id="pla-convite">
            Vamos conversar <br />
            sobre o seu projeto?
          </h2>
          <p className="pla-convite__texto">Conte um pouco sobre a sua ideia e receba uma prévia sem compromisso.</p>
          <Link to="/contato" className="btn pla-convite__btn">
            Pedir prévia <Seta />
          </Link>
          <Sticker nome="cursor" className="pla-convite__cursor" />
        </div>
      </section>
    </>
  );
}
