import { Perguntas, TopoPagina } from '../components/Comum';
import { Icone } from '../components/Icone';
import { ETAPAS_PROCESSO, FAQ_PROCESSO, MATERIAIS } from '../content/conteudo';
import { useSeo } from '../lib/hooks';

export default function Processo() {
  useSeo('/como-funciona');

  return (
    <>
      <TopoPagina
        rotulo="Processo"
        titulo={
          <>
            Do primeiro contato <em>ao site no ar.</em>
          </>
        }
        lead="Quatro etapas, com você acompanhando cada uma. Prazo médio do projeto de cerca de 12 dias, conforme escopo e envio dos materiais."
      />

      <section className="secao" aria-label="As quatro etapas">
        <div className="container">
          <ol role="list" className="pro-etapas">
            {ETAPAS_PROCESSO.map((e) => (
              <li key={e.n} id={`etapa-${e.n}`} className="pro-etapa revelar">
                <span className="pro-etapa__num">{e.n}</span>
                <div className="pro-etapa__titulo">
                  <p className="rotulo">{e.rotulo}</p>
                  <h2 className="titulo titulo--3">{e.detalheTitulo}</h2>
                </div>
                <div className="pro-etapa__texto">
                  <p className="texto">{e.detalhe}</p>
                  <p className="pro-etapa__resumo">{e.resumo}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="secao secao--escura" aria-labelledby="pro-materiais">
        <div className="container duvidas">
          <div>
            <p className="rotulo">Materiais</p>
            <h2 className="titulo titulo--2" id="pro-materiais">
              O que você envia.
            </h2>
            <p className="texto duvidas__texto">
              Não precisa ter tudo pronto. Começamos com o que você já tem e ajudamos a organizar o resto.
            </p>
          </div>
          <ul role="list" className="materiais">
            {MATERIAIS.map((m, i) => (
              <li key={m} className="revelar" style={{ ['--atraso' as string]: `${i * 0.06}s` }}>
                <span className="numero">{String(i + 1).padStart(2, '0')}</span>
                {m}
                <Icone nome="check" tamanho={18} traco={2} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao" aria-labelledby="pro-duvidas">
        <div className="container duvidas">
          <div>
            <p className="rotulo">Dúvidas</p>
            <h2 className="titulo titulo--2" id="pro-duvidas">
              Perguntas sobre o processo
            </h2>
          </div>
          <Perguntas itens={FAQ_PROCESSO} />
        </div>
      </section>
    </>
  );
}
