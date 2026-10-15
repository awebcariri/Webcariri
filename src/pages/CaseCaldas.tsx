import { Link } from 'react-router-dom';
import { BotoesCase, CapturaAmpliavel, ProximoCase } from '../components/Case';
import { Cari, Trilha } from '../components/Comum';
import { Faiscas, Icone, Seta, type NomeIcone } from '../components/Icone';
import { caseById } from '../content/conteudo';
import { useSeo } from '../lib/hooks';

const ENTREGAS: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: 'relogio', titulo: 'Horários e ingressos', texto: 'Informações claras sobre funcionamento e acesso.' },
  { icone: 'mapa', titulo: 'Guia do visitante', texto: 'Principais atrações, dicas e orientações para o passeio.' },
  { icone: 'cama', titulo: 'Hospedagem', texto: 'Destaque para opções de hospedagem na região.' },
  { icone: 'pin', titulo: 'Como chegar', texto: 'Rotas e dicas de acesso para facilitar o planejamento.' },
];

export default function CaseCaldas() {
  useSeo('/caldas');
  const caso = caseById('caldas');

  return (
    <>
      <section className="container topo-interno cas-topo">
        <div className="cas-topo__texto">
          <Trilha itens={[{ label: 'Início', to: '/' }, { label: 'Projetos', to: '/projetos' }, { label: 'Caldas' }]} />
          <h1 className="titulo titulo--xl cas-titulo cld-titulo">
            Balneário <br />
            <span className="cld-titulo__2">do Caldas.</span>
          </h1>
          <p className="cld-sub">Um lugar para planejar o próximo passeio.</p>
          <p className="texto cas-topo__resumo">Um balneário com 50 anos de história ganhou um lugar para o visitante planejar o passeio.</p>
          <ul role="list" className="cas-meta">
            <li>
              <Icone nome="pasta" tamanho={20} /> {caso.segmento}
            </li>
            <li>
              <Icone nome="pin" tamanho={20} /> {caso.cidade}, CE
            </li>
          </ul>
          <BotoesCase caso={caso} />
        </div>
        <div className="cas-topo__arte cld-arte" aria-hidden="true">
          <p className="nota-caps cld-arte__nota">
            Mais lugares <br />
            do Cariri <br />
            no mundo.
          </p>
          <Faiscas className="cld-arte__faiscas" />
          <Cari pose="curioso" className="cld-arte__cari" carregar="eager" largura={300} />
        </div>
      </section>

      <div className="container">
        <CapturaAmpliavel caso={caso} barra className="cas-captura" />
      </div>

      <section className="container cas-desafio" aria-label="Desafio e entregas">
        <div className="cas-desafio__texto">
          <h2 className="titulo titulo--m">
            O desafio<span className="ponto">.</span>
          </h2>
          <p className="texto">
            Organizar as informações do balneário de forma clara e acessível, para que o visitante encontre tudo o que precisa
            para planejar a visita: o que fazer, como chegar, onde se hospedar e outras informações importantes.
          </p>
        </div>
        <div className="cas-entregas">
          <h2 className="titulo titulo--m">
            O que entregamos<span className="ponto">.</span>
          </h2>
          <ul role="list" className="cas-entregas__lista cas-entregas__lista--circulos">
            {ENTREGAS.map((e) => (
              <li key={e.titulo}>
                <span className="cas-circulo">
                  <Icone nome={e.icone} tamanho={24} traco={1.7} />
                </span>
                <div>
                  <h3>{e.titulo}</h3>
                  <p>{e.texto}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="cas-entregas__extra">
            O site também reúne a história do balneário, a galeria de fotos, a página de transparência e o botão de planejar
            a visita sempre à mão.
          </p>
        </div>
      </section>

      <section className="container" aria-label="Síntese">
        <div className="faixa-amarela cld-faixa revelar">
          <p className="titulo cld-faixa__titulo">
            Informação fácil de encontrar. <br />
            <span className="acento">Visita fácil de planejar.</span>
          </p>
          <div className="cld-faixa__arte" aria-hidden="true">
            <Faiscas className="cld-faixa__faiscas" />
            <Cari pose="curioso" className="cld-faixa__cari" largura={160} />
            <p className="nota-caps cld-faixa__nota">
              Sites que <br />
              conectam <br />
              lugares e <br />
              pessoas.
            </p>
          </div>
        </div>
      </section>

      <section className="container" aria-labelledby="cld-convite">
        <div className="cas-convite revelar">
          <div>
            <h2 className="cas-convite__titulo" id="cld-convite">
              Quer um site para o seu negócio?
            </h2>
            <p>Vamos conversar sobre o seu projeto e encontrar a melhor forma de levar o seu negócio mais longe.</p>
          </div>
          <Link to="/contato" className="btn">
            Pedir uma prévia <Seta />
          </Link>
        </div>
      </section>

      <ProximoCase caso={caseById('criaker')} texto="Um site para apresentar serviços e fortalecer a presença digital da marca no Cariri." />
    </>
  );
}
