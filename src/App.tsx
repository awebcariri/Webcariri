import { Route, Routes, useLocation } from 'react-router-dom';
import { Abertura } from './components/Abertura';
import { Cabecalho } from './components/Cabecalho';
import { CariAssistente } from './components/CariAssistente';
import { Rodape } from './components/Rodape';
import { useRevelar, useRolagemDeRota } from './lib/hooks';
import Inicio from './pages/Inicio';
import Projetos from './pages/Projetos';
import Processo from './pages/Processo';
import Planos from './pages/Planos';
import Parceiros from './pages/Parceiros';
import Contato from './pages/Contato';
import CasePagina from './pages/CasePagina';
import NaoEncontrada from './pages/NaoEncontrada';

export default function App() {
  useRolagemDeRota();
  useRevelar();
  const { pathname } = useLocation();

  return (
    <>
      <a href="#conteudo" className="pular-conteudo">
        Pular para o conteúdo
      </a>
      <Abertura />
      <Cabecalho />
      <main id="conteudo" tabIndex={-1}>
        {/* A chave nova a cada rota faz a entrada do topo rodar de novo */}
        <div className="pagina" key={pathname}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/como-funciona" element={<Processo />} />
            <Route path="/planos" element={<Planos />} />
            <Route path="/parceiros" element={<Parceiros />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/caldas" element={<CasePagina id="caldas" />} />
            <Route path="/criaker" element={<CasePagina id="criaker" />} />
            <Route path="/lunar" element={<CasePagina id="lunar" />} />
            <Route path="/efraim" element={<CasePagina id="efraim" />} />
            <Route path="*" element={<NaoEncontrada />} />
          </Routes>
        </div>
      </main>
      <Rodape />
      <CariAssistente />
    </>
  );
}
