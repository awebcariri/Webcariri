import { Route, Routes, useLocation } from 'react-router-dom';
import { Abertura } from './components/Abertura';
import { Cabecalho } from './components/Cabecalho';
import { CariAssistente } from './components/CariAssistente';
import { Rodape } from './components/Rodape';
import { useRevelar, useRolagemDeRota } from './lib/hooks';
import Biolink from './pages/Biolink';
import Inicio from './pages/Inicio';
import Projetos from './pages/Projetos';
import Processo from './pages/Processo';
import Planos from './pages/Planos';
import Parceiros from './pages/Parceiros';
import Contato from './pages/Contato';
import CaseCaldas from './pages/CaseCaldas';
import CaseCriaker from './pages/CaseCriaker';
import CaseLunar from './pages/CaseLunar';
import CaseEfraim from './pages/CaseEfraim';
import NaoEncontrada from './pages/NaoEncontrada';

export default function App() {
  useRolagemDeRota();
  useRevelar();
  const { pathname } = useLocation();

  if (pathname === '/') return <><Abertura /><Biolink /></>;

  return (
    <>
      <a href="#conteudo" className="pular-conteudo">
        Pular para o conteúdo
      </a>

      <Cabecalho />
      <main id="conteudo" tabIndex={-1}>
        {/* A chave nova a cada rota faz a animação de entrada do topo rodar de novo */}
        <div className="pagina" key={pathname}>
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/como-funciona" element={<Processo />} />
            <Route path="/planos" element={<Planos />} />
            <Route path="/parceiros" element={<Parceiros />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/caldas" element={<CaseCaldas />} />
            <Route path="/criaker" element={<CaseCriaker />} />
            <Route path="/lunar" element={<CaseLunar />} />
            <Route path="/efraim" element={<CaseEfraim />} />
            <Route path="*" element={<NaoEncontrada />} />
          </Routes>
        </div>
      </main>
      <Rodape />
      <CariAssistente />
    </>
  );
}
