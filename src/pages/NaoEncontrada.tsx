import { Link } from 'react-router-dom';
import { Cari } from '../components/Comum';
import { Seta } from '../components/Icone';
import { useSeo } from '../lib/hooks';

export default function NaoEncontrada() {
  useSeo('404');
  return (
    <section className="container topo-interno nao-encontrada">
      <div>
        <p className="rotulo">Erro 404</p>
        <h1 className="titulo titulo--xl">
          Essa página <br />
          <span className="acento">não está aqui.</span>
        </h1>
        <p className="lead">O endereço pode ter mudado. Bora voltar para um caminho conhecido?</p>
        <div className="nao-encontrada__acoes">
          <Link to="/" className="btn">
            Ir para o início <Seta />
          </Link>
          <Link to="/projetos" className="btn btn--contorno">
            Ver projetos
          </Link>
        </div>
      </div>
      <Cari pose="curioso" className="nao-encontrada__cari" largura={320} />
    </section>
  );
}
