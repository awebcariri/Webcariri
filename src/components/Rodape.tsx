import { Link } from 'react-router-dom';
import { MENSAGENS, NAV, SITE, linkWhatsApp } from '../config/site';
import { Icone } from './Icone';
import { Marca } from './Vitrine';

/** Rodapé: convite, colunas em texto pequeno e a marca gigante em tomate (Studio Ag). */
export function Rodape() {
  return (
    <footer className="rodape">
      <div className="rodape__convite">
        <p className="rodape__chamada">
          Tem um negócio que <em>merece</em> um site à altura?
        </p>
        <div className="rodape__acoes">
          <Link to="/contato" className="btn btn--tomate">
            Solicitar proposta
          </Link>
          <a className="btn btn--contorno" href={linkWhatsApp(MENSAGENS.geral)} target="_blank" rel="noopener noreferrer">
            <Icone nome="whatsapp" tamanho={18} /> WhatsApp
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
      </div>

      <div className="rodape__colunas">
        <p>
          Estúdio de sites e landing pages
          <br />© {SITE.ano} WebCariri
        </p>
        <p>
          {SITE.cidade}, {SITE.uf}
          <br />
          Atendimento online para todo o Brasil
        </p>
        <ul role="list">
          <li>
            <a href={linkWhatsApp(MENSAGENS.geral)} target="_blank" rel="noopener noreferrer">
              WhatsApp {SITE.whatsappExibicao}
            </a>
          </li>
          <li>
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
              Instagram @{SITE.instagramUsuario}
            </a>
          </li>
        </ul>
        <nav aria-label="Rodapé">
          <ul role="list" className="rodape__nav">
            <li>
              <Link to="/inicio">Início</Link>
            </li>
            {NAV.map((it) => (
              <li key={it.to}>
                <Link to={it.to}>{it.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Link to="/inicio" className="rodape__marca" aria-label="WebCariri, página inicial">
        <Marca />
      </Link>
    </footer>
  );
}
