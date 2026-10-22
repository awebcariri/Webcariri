import { Link } from 'react-router-dom';
import { Acordeao, TopoPagina } from '../components/Comum';
import { Icone, Seta } from '../components/Icone';
import { COMPARATIVO, PAGAMENTO, PLANOS, POS_LANCAMENTO } from '../content/conteudo';
import { MENSAGENS, linkWhatsApp } from '../config/site';
import { useSeo } from '../lib/hooks';

function Valor({ v }: { v: boolean | string }) {
  if (v === true)
    return (
      <span className="pla-sim">
        <Icone nome="check" tamanho={16} traco={2.2} />
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
      <TopoPagina
        rotulo="Planos e investimento"
        titulo={
          <>
            Escolha por onde <em>começar.</em>
          </>
        }
        lead="Valores de partida. Escopo e valor final ficam definidos na proposta, antes de começar."
      />

      <section className="secao pla-secao" aria-label="Planos">
        <div className="container">
          <ul role="list" className="pla-cards">
            {PLANOS.map((p, i) => (
              <li
                key={p.id}
                className={`pla-card revelar ${p.destaque ? 'pla-card--destaque' : ''}`}
                style={{ ['--atraso' as string]: `${i * 0.08}s` }}
              >
                <div className="pla-card__topo">
                  <h2 className="titulo titulo--3">{p.nome}</h2>
                  {p.destaque && <span className="pla-card__selo">Mais escolhido</span>}
                </div>
                <p className="pla-card__resumo">{p.resumo}</p>
                <p className="pla-card__preco">
                  <span>a partir de</span>
                  <strong>R$ {p.preco}</strong>
                </p>
                <ul role="list" className="lista-check">
                  {p.itens.map((item) => (
                    <li key={item}>
                      <Icone nome="check" tamanho={16} traco={2} /> {item}
                    </li>
                  ))}
                </ul>
                <Link to={`/contato?plano=${p.id}`} className={`btn btn--bloco ${p.destaque ? 'btn--claro' : ''}`}>
                  Solicitar este plano <Seta />
                  <span className="sr-only">: {p.nome}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="pla-pagamento revelar">
            <Icone nome="cartao" tamanho={28} traco={1.5} />
            <p>
              <strong>{PAGAMENTO.titulo}</strong> {PAGAMENTO.texto}
            </p>
          </div>
        </div>
      </section>

      <section className="secao" aria-labelledby="pla-comp">
        <div className="container">
          <div className="cabeca-secao">
            <div>
              <p className="rotulo">Comparativo</p>
              <h2 className="titulo titulo--2" id="pla-comp">
                O que cada plano inclui.
              </h2>
            </div>
          </div>

          <div className="pla-tabela-wrap so-desktop">
            <table className="pla-tabela">
              <thead>
                <tr>
                  <th scope="col">Recurso</th>
                  {PLANOS.map((p) => (
                    <th key={p.id} scope="col">
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

          <div className="so-mobile">
            {PLANOS.map((p, i) => (
              <Acordeao key={p.id} titulo={p.nome}>
                <dl className="pla-comp-lista">
                  {COMPARATIVO.map((linha) => (
                    <div key={linha.recurso}>
                      <dt>{linha.recurso}</dt>
                      <dd>
                        <Valor v={linha.valores[i]} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </Acordeao>
            ))}
          </div>
        </div>
      </section>

      <section className="secao secao--escura" aria-labelledby="pla-depois">
        <div className="container duvidas">
          <div>
            <p className="rotulo">Depois do lançamento</p>
            <h2 className="titulo titulo--2" id="pla-depois">
              Hospedagem, domínio e manutenção.
            </h2>
          </div>
          <div className="pla-depois">
            {POS_LANCAMENTO.map((item) => (
              <div key={item.id} className="pla-depois__item revelar">
                <h3 className="titulo titulo--4">{item.titulo}</h3>
                <p className="texto">{item.texto}</p>
              </div>
            ))}
            <a href={linkWhatsApp(MENSAGENS.manutencao)} target="_blank" rel="noopener noreferrer" className="link-seta">
              Perguntar sobre manutenção <Icone nome="seta-diag" tamanho={16} traco={2} />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
