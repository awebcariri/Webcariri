import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MENSAGENS, NAV, SITE, linkWhatsApp } from '../config/site';
import { usePrenderFoco } from '../lib/hooks';
import { Icone, Seta } from './Icone';
import { Marca } from './Vitrine';

/** Logotipo em imagem (PNG do kit), usado onde o tamanho é pequeno e fixo. */
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

const ROTAS_PROJETOS = ['/projetos', '/caldas', '/criaker', '/lunar', '/efraim'];
const ESQUERDA = NAV.slice(0, 3); // Projetos, Processo, Planos
const DIREITA = NAV.slice(3); // Para agências, Contato

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

  const emProjetos = ROTAS_PROJETOS.includes(pathname);

  const item = (it: (typeof NAV)[number]) => {
    const ativo = pathname === it.to || (it.to === '/projetos' && emProjetos);
    return (
      <li key={it.to}>
        <NavLink
          to={it.to}
          className={`cabecalho__link ${ativo ? 'ativo' : ''}`}
          aria-current={pathname === it.to ? 'page' : ativo ? 'true' : undefined}
        >
          {it.label}
        </NavLink>
      </li>
    );
  };

  return (
    <header className={`cabecalho ${rolou ? 'cabecalho--rolou' : ''} ${aberto ? 'cabecalho--aberto' : ''}`}>
      <div className="cabecalho__barra">
        <nav className="cabecalho__nav cabecalho__nav--esq" aria-label="Principal">
          <ul role="list">{ESQUERDA.map(item)}</ul>
        </nav>

        <Link to="/" className="cabecalho__logo" aria-label="WebCariri, página inicial">
          <Marca />
        </Link>

        <nav className="cabecalho__nav cabecalho__nav--dir" aria-label="Secundária">
          <ul role="list">{DIREITA.map(item)}</ul>
          <Link to="/contato" className="btn btn--pequeno">
            Solicitar proposta
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
          <Icone nome={aberto ? 'fechar' : 'menu'} tamanho={22} traco={1.8} />
        </button>
      </div>

      <div id="menu-mobile" ref={painel} className="menu-mobile" hidden={!aberto} role="dialog" aria-modal="true" aria-label="Menu">
        <nav className="menu-mobile__corpo" aria-label="Menu do celular">
          <ul role="list" className="menu-mobile__lista">
            <li>
              <NavLink to="/" className="menu-mobile__link">
                Início
              </NavLink>
            </li>
            {NAV.map((it) => (
              <li key={it.to}>
                <NavLink to={it.to} className="menu-mobile__link">
                  {it.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contato" className="btn btn--bloco btn--tomate">
            Solicitar proposta <Seta />
          </Link>
          <ul role="list" className="menu-mobile__contatos">
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
        </nav>
      </div>
    </header>
  );
}
