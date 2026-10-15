import { Link } from 'react-router-dom';
import { BotoesCase, CapturaAmpliavel, ProximoCase } from '../components/Case';
import { Cari, Trilha } from '../components/Comum';
import { Faiscas, Icone, Seta, type NomeIcone } from '../components/Icone';
import { caseById } from '../content/conteudo';
import { useSeo } from '../lib/hooks';

// Entregas descritas a partir do site publicado (efraimvitaliano.com.br).
const ENTREGAS: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: 'conversas', titulo: 'Qual é o seu caso?', texto: 'Quatro caminhos: paciente que cultiva, prescritor, associação e HC negado.' },
  { icone: 'doc-texto', titulo: 'Manifesto em vídeo', texto: 'A causa do escritório apresentada em vídeo e texto, sem juridiquês.' },
  { icone: 'estrela', titulo: 'Avaliações do Google', texto: 'Nota e total do perfil, com link para ler e deixar avaliações.' },
  { icone: 'whatsapp', titulo: 'Contato direto', texto: 'Conversa pelo WhatsApp e pelo Instagram sempre à mão.' },
];

export default function CaseEfraim() {
  useSeo('/efraim');
  const caso = caseById('efraim');

  return (
    <>
      <section className="container topo-interno cas-topo">
        <div className="cas-topo__texto">
          <Trilha itens={[{ label: 'Início', to: '/' }, { label: 'Projetos', to: '/projetos' }, { label: 'Efraim' }]} />
          <h1 className="titulo titulo--xl cas-titulo efr-titulo">
            Efraim <br />
            <span className="acento">Vitaliano.</span>
          </h1>
          <p className="cld-sub">Direito canábico com clareza e dentro das regras da OAB.</p>
          <p className="texto cas-topo__resumo">
            Um advogado criminalista de João Pessoa ganhou um site de uma página que leva cada pessoa ao caminho certo para o
            seu caso.
          </p>
          <ul role="list" className="cas-meta">
            <li>
              <Icone nome="pasta" tamanho={20} /> {caso.segmento}
            </li>
            <li>
              <Icone nome="pin" tamanho={20} /> {caso.cidade}, PB
            </li>
          </ul>
          <BotoesCase caso={caso} />
        </div>
        <div className="cas-topo__arte efr-arte" aria-hidden="true">
          <p className="nota-caps efr-arte__nota">
            Do Cariri <br />
            para a <br />
            Paraíba.
          </p>
          <Faiscas className="efr-arte__faiscas" />
          <Cari pose="curioso" className="efr-arte__cari" carregar="eager" largura={300} />
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
            Apresentar um tema sensível com seriedade e acolhimento, falando com pacientes, prescritores e associações ao
            mesmo tempo, sem promessa de resultado, sem preços e com o aviso informativo exigido pelo Provimento 205/2021 da
            OAB.
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
            Visual editorial com ilustrações botânicas recortadas do vetor original, ensaio de fotos do Efraim e seção sobre
            com a atuação na OAB/PB e na PBCANN.
          </p>
        </div>
      </section>

      <section className="container" aria-label="Síntese">
        <div className="faixa-amarela cld-faixa revelar">
          <p className="titulo cld-faixa__titulo">
            Um tema sério, dito com cuidado. <br />
            <span className="acento">Cada caso no caminho certo.</span>
          </p>
          <div className="cld-faixa__arte" aria-hidden="true">
            <Faiscas className="cld-faixa__faiscas" />
            <Cari pose="curioso" className="cld-faixa__cari" largura={160} />
            <p className="nota-caps cld-faixa__nota">
              Sites que <br />
              explicam <br />
              sem <br />
              juridiquês.
            </p>
          </div>
        </div>
      </section>

      <section className="container" aria-labelledby="efr-convite">
        <div className="cas-convite revelar">
          <div>
            <h2 className="cas-convite__titulo" id="efr-convite">
              Quer um site para o seu escritório?
            </h2>
            <p>Vamos conversar sobre o seu projeto e encontrar a melhor forma de apresentar o seu trabalho.</p>
          </div>
          <Link to="/contato" className="btn">
            Pedir uma prévia <Seta />
          </Link>
        </div>
      </section>

      <ProximoCase caso={caseById('caldas')} texto="Um site para mostrar toda a estrutura do balneário e facilitar o planejamento dos visitantes." />
    </>
  );
}
