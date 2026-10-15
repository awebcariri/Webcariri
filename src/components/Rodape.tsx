import { Link } from 'react-router-dom';
import { MENSAGENS, NAV, SITE, linkWhatsApp } from '../config/site';
import { Logo } from './Cabecalho';
import { Icone } from './Icone';

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="container">
        <div className="rodape__grade">
          <div className="rodape__marca">
            <Link to="/" aria-label="WebCariri, página inicial">
              <Logo className="rodape__logo" />
            </Link>
            <p className="rodape__slogan">{SITE.slogan}</p>
          </div>

          <div className="rodape__bloco">
            <p className="rodape__cidade">
              {SITE.cidade} • {SITE.uf}
            </p>
            <p>Estúdio criativo digital</p>
            <p>Atendimento online para todo o Brasil.</p>
          </div>

          <ul role="list" className="rodape__bloco rodape__contatos">
            <li>
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
                <Icone nome="instagram" />
                <span>
                  <span className="sr-only">Instagram </span>@{SITE.instagramUsuario}
                </span>
              </a>
            </li>
            <li>
              <a href={linkWhatsApp(MENSAGENS.geral)} target="_blank" rel="noopener noreferrer">
                <Icone nome="whatsapp" />
                <span>
                  <span className="sr-only">WhatsApp </span>
                  {SITE.whatsappExibicao}
                </span>
              </a>
            </li>
          </ul>

          <nav className="rodape__bloco rodape__nav" aria-label="Rodapé">
            <ul role="list">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="rodape__base">
          <p>© {SITE.ano} WebCariri. Todos os direitos reservados.</p>
          <p>{SITE.assinatura}</p>
        </div>
      </div>
    </footer>
  );
}
