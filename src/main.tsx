import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/base.css';
import './styles/layout.css';
import './styles/paginas.css';
import './styles/processo.css';
import './styles/planos.css';
import './styles/parceiros.css';
import './styles/contato.css';
import './styles/cases.css';

// Ativa as entradas suaves só quando o JavaScript roda: sem JS, tudo aparece.
document.documentElement.classList.add('js');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
