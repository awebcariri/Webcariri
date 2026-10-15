import { Route, Routes } from 'react-router-dom';
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
import CaseCaldas from './pages/CaseCaldas';
import CaseCriaker from './pages/CaseCriaker';
import CaseLunar from './pages/CaseLunar';
import CaseEfraim from './pages/CaseEfraim';
import NaoEncontrada from './pages/NaoEncontrada';

export default function App() {
  useRolagemDeRota();
  useRevelar();

  return (
    <>
      <a href="#conteudo" className="pular-conteudo">
        Pular para o conteúdo
      </a>
      <Abertura />
      <Cabecalho />
      <main id="conteudo" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Inicio />} />
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
      </main>
      <Rodape />
      <CariAssistente />
    </>
  );
}
