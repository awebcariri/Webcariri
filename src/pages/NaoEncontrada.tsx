import { Link } from 'react-router-dom';
import { TopoPagina } from '../components/Comum';
import { Seta } from '../components/Icone';
import { useSeo } from '../lib/hooks';

export default function NaoEncontrada() {
  useSeo('404');
  return (
    <TopoPagina
      rotulo="Erro 404"
      titulo={
        <>
          Página <em>não encontrada.</em>
        </>
      }
      lead="O endereço pode ter mudado ou não existe mais."
    >
      <Link to="/" className="btn">
        Ir para o início <Seta />
      </Link>
      <Link to="/projetos" className="btn btn--contorno">
        Ver projetos
      </Link>
    </TopoPagina>
  );
}
