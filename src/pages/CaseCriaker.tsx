import { Link } from 'react-router-dom';
import { BotoesCase, CapturaAmpliavel } from '../components/Case';
import { Balao, Cari, Trilha } from '../components/Comum';
import { Faiscas, Icone, Seta, type NomeIcone } from '../components/Icone';
import { caseById } from '../content/conteudo';
import { useSeo } from '../lib/hooks';

const ENTREGAS: { icone: NomeIcone; titulo: string }[] = [
  { icone: 'docs-apresentacao', titulo: 'Apresentação dos serviços' },
  { icone: 'pessoas', titulo: 'Equipe em destaque' },
  { icone: 'estrela', titulo: 'Avaliações' },
  { icone: 'envelope', titulo: 'Contato facilitado' },
];

export default function CaseCriaker() {
  useSeo('/criaker');
  const caso = caseById('criaker');
  const lunar = caseById('lunar');

  return (
    <>
      <section className="container topo-interno cas-topo">
        <div className="cas-topo__texto">
          <Trilha itens={[{ label: 'Início', to: '/' }, { label: 'Projetos', to: '/projetos' }, { label: 'Criaker' }]} />
          <h1 className="titulo titulo--xl cas-titulo crk-titulo">
            Criaker<span className="ponto">.</span>
          </h1>
          <p className="crk-sub">
            A personalidade da agência, <br />
            também no digital.
          </p>
          <p className="texto cas-topo__resumo">Uma agência criativa ganhou um site com a mesma personalidade das campanhas que faz.</p>
          <div className="crk-meta-linha">
            <ul role="list" className="crk-meta">
              <li>
                <Icone nome="pasta" tamanho={24} traco={1.6} />
                <span>
                  <small>Cliente</small> Criaker
                </span>
              </li>
              <li>
                <Icone nome="etiqueta" tamanho={24} traco={1.6} />
                <span>
                  <small>Segmento</small> Agência de publicidade
                </span>
              </li>
              <li>
                <Icone nome="pin" tamanho={24} traco={1.6} />
                <span>
                  <small>Cidade</small> Juazeiro do Norte, CE
                </span>
              </li>
            </ul>
            <Cari pose="curioso" className="crk-meta__cari so-mobile" largura={140} />
          </div>
          <BotoesCase caso={caso} contorno />
        </div>
        <div className="cas-topo__arte crk-arte" aria-hidden="true">
          <Faiscas className="crk-arte__faiscas" />
          <Cari pose="curioso" className="crk-arte__cari" carregar="eager" largura={260} />
          <Balao variante="serif" className="crk-arte__balao">
            Sites que <br />
            combinam com <br />a sua história.
          </Balao>
        </div>
      </section>

      <div className="container">
        <CapturaAmpliavel caso={caso} barra className="cas-captura crk-captura" />
      </div>

      <section className="container cas-desafio" aria-label="Desafio e entregas">
        <div className="cas-desafio__texto">
          <h2 className="titulo titulo--m">
            O desafio<span className="ponto">.</span>
          </h2>
          <p className="texto">
            Traduzir a essência criativa da Criaker para o digital, com um site que comunicasse sua personalidade, seus
            serviços e sua equipe de forma clara, envolvente e visualmente marcante.
          </p>
        </div>
        <div className="cas-entregas">
          <h2 className="titulo titulo--m">
            O que entregamos<span className="ponto">.</span>
          </h2>
          <p className="texto">
            Um site institucional completo, com visual escuro fiel à identidade da agência, destacando seus principais
            diferenciais:
          </p>
          <ul role="list" className="crk-tiles">
            {ENTREGAS.map((e) => (
              <li key={e.titulo}>
                <Icone nome={e.icone} tamanho={34} traco={1.5} />
                {e.titulo}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="crk-resultado fundo-escuro revelar" aria-labelledby="crk-resultado">
        <div className="container crk-resultado__grade">
          <div>
            <p className="rotulo">Resultado</p>
            <h2 className="crk-resultado__titulo" id="crk-resultado">
              Uma presença <br />
              com a cara de <span className="acento">quem cria.</span>
            </h2>
            <p>Um site que reforça a autoridade da Criaker e mostra, na prática, a força da sua criatividade.</p>
          </div>
          <div className="crk-resultado__arte" aria-hidden="true">
            <Faiscas className="crk-resultado__faiscas" />
            <Cari pose="saudando" className="crk-resultado__cari" largura={240} />
            <Balao className="crk-resultado__balao" variante="serif">
              Boa ideia <br />
              sempre <br />
              encontra <br />
              um lugar.
            </Balao>
          </div>
        </div>
      </section>

      <section className="container" aria-labelledby="crk-convite">
        <div className="crk-convite revelar">
          <Faiscas className="crk-convite__faiscas" />
          <div>
            <h2 className="titulo titulo--m" id="crk-convite">
              Seu negócio também <br />
              tem uma história <span className="acento">para mostrar.</span>
            </h2>
            <p>Sites com personalidade. Presença com propósito.</p>
          </div>
          <Link to="/contato" className="btn btn--grande">
            Pedir prévia <Seta />
          </Link>
        </div>
      </section>

      <section className="container cas-proximo crk-proximo" aria-labelledby="cas-proximo">
        <p className="rotulo cas-linha">Próximo projeto</p>
        <Link to={`/${lunar.id}`} className="crk-proximo__cartao">
          <img src={lunar.imagemPequena} alt="" width={700} height={490} loading="lazy" />
          <span className="crk-proximo__info">
            <span className="rotulo">Case</span>
            <strong id="cas-proximo">
              Lunar Doceria<span className="ponto">.</span>
            </strong>
            <span>Doçura que também se vê online.</span>
          </span>
          <span className="link-grifo crk-proximo__ver">
            Ver o projeto <Seta tamanho={18} />
          </span>
        </Link>
      </section>
    </>
  );
}
