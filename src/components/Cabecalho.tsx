import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV, SITE, linkWhatsApp, MENSAGENS } from '../config/site';
import { usePrenderFoco } from '../lib/hooks';
import { Icone, Seta } from './Icone';

export function Logo({ claro = false, className = '' }: { claro?: boolean; className?: string }) {
  return (
    <img
      src={claro ? '/img/marca/webcariri-creme.png' : '/img/marca/webcariri-vinho.png'}
      alt="webcariri."
      width={950}
      height={190}
      className={`logo ${className}`}
      decoding="async"
    />
  );
}

export function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);
  const painel = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const fechar = useCallback(() => {
    setAberto(false);
    botao.current?.focus();
  }, []);

  usePrenderFoco(aberto, painel, fechar);

  // Fecha o menu ao trocar de página.
  useEffect(() => setAberto(false), [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-aberto', aberto);
    if (aberto) painel.current?.querySelector<HTMLElement>('a')?.focus();
  }, [aberto]);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  // Cases contam como "Projetos" no menu.
  const emProjetos = ['/projetos', '/caldas', '/criaker', '/lunar', '/efraim'].includes(pathname);

  return (
    <header className={`cabecalho ${rolou ? 'cabecalho--rolou' : ''} ${aberto ? 'cabecalho--aberto' : ''}`}>
      <div className="container cabecalho__barra">
        <Link to="/" className="cabecalho__logo" aria-label="WebCariri, página inicial">
          <Logo />
        </Link>

        <nav className="cabecalho__nav" aria-label="Principal">
          <ul role="list">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `cabecalho__link ${isActive || (item.to === '/projetos' && emProjetos) ? 'ativo' : ''}`
                  }
                  aria-current={
                    pathname === item.to ? 'page' : item.to === '/projetos' && emProjetos ? 'true' : undefined
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <span className="cabecalho__divisor" aria-hidden="true" />
          <Link to="/contato" className="btn btn--pequeno">
            Pedir prévia <Seta tamanho={18} />
          </Link>
        </nav>

        <button
          ref={botao}
          type="button"
          className="cabecalho__menu"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          onClick={() => setAberto((v) => !v)}
        >
          <span>{aberto ? 'Fechar' : 'Menu'}</span>
          <Icone nome={aberto ? 'fechar' : 'menu'} tamanho={26} traco={2} />
        </button>
      </div>

      <div
        id="menu-mobile"
        ref={painel}
        className="menu-mobile"
        hidden={!aberto}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <nav className="container" aria-label="Menu do celular">
          <ul role="list" className="menu-mobile__lista">
            <li>
              <NavLink to="/" end className="menu-mobile__link">
                Início
              </NavLink>
            </li>
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="menu-mobile__link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contato" className="btn btn--grande btn--bloco">
            Pedir minha prévia <Seta />
          </Link>
          <ul role="list" className="menu-mobile__contatos">
            <li>
              <a href={linkWhatsApp(MENSAGENS.geral)} target="_blank" rel="noopener noreferrer">
                <Icone nome="whatsapp" /> {SITE.whatsappExibicao}
              </a>
            </li>
            <li>
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
                <Icone nome="instagram" /> @{SITE.instagramUsuario}
              </a>
            </li>
            <li>
              <span>
                <Icone nome="pin" /> {SITE.cidade} • {SITE.uf}
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
