import { useState } from 'react';
import { Link } from 'react-router-dom';
import { linkWhatsApp } from '../config/site';
import { useSeo } from '../lib/hooks';
import '../styles/biolink.css';

export default function Biolink() {
  useSeo('/');
  const [animacao, setAnimacao] = useState(0);
  return <main id="conteudo" tabIndex={-1} className="biolink"><div className="biolink__page">
      <h1 className="sr-only">WebCariri — links</h1>

      <header className="brand">
        <div className="brand-lockup">
          <Link className="brand-mark" to="/inicio" aria-label="WebCariri — página inicial">
            <img src="/img/biolink/logo.png" alt="WebCariri" width="950" height="190" />
          </Link>
          <button className="cari-play is-animating" onClick={() => setAnimacao(n => n + 1)} type="button" aria-label="Animar o Cari" title="Toque para animar o Cari">
            <img key={animacao} className="cari-image" src="/img/biolink/cari.webp" alt="" width="1200" height="800" />
          </button>
        </div>
        <p className="brand-tagline">Sites com personalidade.</p>
      </header>

      <nav className="links" aria-label="Links da WebCariri">
        <Link className="link-primary" to="/inicio" aria-label="Conheça nosso site oficial">
          <svg className="link-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"></path></svg>
          <span>Conheça nosso site</span><span className="icon-balance" aria-hidden="true"></span>
        </Link>
        <a className="link-row" href={linkWhatsApp("Olá, WebCariri! Gostaria de conversar sobre um site.")} target="_blank" rel="noopener noreferrer">
          <svg className="link-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.1L3 20l1.2-4.8a8.2 8.2 0 1 1 16-3.4Z"></path><path d="M8.3 8.2c.3-.6.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.2.2-.2.4-.1.6.4.8 1 1.4 1.8 1.8.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5 0 .4-.2 1.1-.7 1.5-.5.5-1.2.7-1.9.5-1-.2-2.2-.8-3.4-1.9-1.1-1-1.9-2.3-2.1-3.2-.2-.8.1-1.5.7-2.3Z"></path></svg>
          <span>Fale conosco</span><span className="icon-balance" aria-hidden="true"></span>
        </a>
        <Link className="link-row" to="/projetos">
          <svg className="link-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2M3 12h18M10 12v1h4v-1"></path></svg>
          <span>Projetos</span><span className="icon-balance" aria-hidden="true"></span>
        </Link>
        <Link className="link-row" to="/planos">
          <svg className="link-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"></path><path d="M14 3.5v5h5M9 13h6M9 17h6"></path></svg>
          <span>Planos</span><span className="icon-balance" aria-hidden="true"></span>
        </Link>
      </nav>
    </div></main>;
}
