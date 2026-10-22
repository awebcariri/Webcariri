import { useEffect, useLayoutEffect, type RefObject } from 'react';
import { useLocation } from 'react-router-dom';
import seo from '../content/seo.json';
import { SITE } from '../config/site';

type SeoChave = keyof typeof seo;

// useLayoutEffect não executa no servidor: evita avisos no pré-render estático.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function meta(seletor: string, atributo: string, valor: string) {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(seletor);
  if (!el) {
    const [tag, resto] = seletor.split('[');
    el = document.createElement(tag) as HTMLMetaElement;
    const [k, v] = resto.replace(']', '').split('=');
    el.setAttribute(k, v.replace(/"/g, ''));
    document.head.appendChild(el);
  }
  el.setAttribute(atributo, valor);
}

/** Título, descrição, canonical e Open Graph da rota atual. */
export function useSeo(chave: SeoChave) {
  useEffect(() => {
    const dados = seo[chave];
    const url = SITE.url + (chave === '404' || chave === '/' ? '/' : chave);
    document.title = dados.title;
    meta('meta[name="description"]', 'content', dados.description);
    meta('link[rel="canonical"]', 'href', url);
    meta('meta[property="og:title"]', 'content', dados.title);
    meta('meta[property="og:description"]', 'content', dados.description);
    meta('meta[property="og:url"]', 'content', url);
    meta('meta[name="twitter:title"]', 'content', dados.title);
    meta('meta[name="twitter:description"]', 'content', dados.description);
  }, [chave]);
}

/** Volta ao topo ao trocar de página (ou vai até a âncora). */
export function useRolagemDeRota() {
  const { pathname, hash } = useLocation();
  useIsomorphicLayoutEffect(() => {
    if (hash) {
      const alvo = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (alvo) {
        alvo.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
}

/** Entrada suave dos blocos com a classe .revelar quando aparecem na tela. */
export function useRevelar() {
  const { pathname } = useLocation();
  useEffect(() => {
    const elementos = Array.from(document.querySelectorAll<HTMLElement>('.revelar:not(.visivel), .revelar-img:not(.visivel), .vitrine__painel:not(.visivel)'));
    if (!('IntersectionObserver' in window)) {
      elementos.forEach((el) => el.classList.add('visivel'));
      return;
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visivel');
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    elementos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pathname]);
}

/** Mantém o foco dentro de um painel aberto e fecha com Escape. */
export function usePrenderFoco(
  ativo: boolean,
  painel: RefObject<HTMLElement>,
  aoFechar: () => void
) {
  useEffect(() => {
    if (!ativo || !painel.current) return;
    const el = painel.current;
    const focaveis = () =>
      Array.from(
        el.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((n) => n.offsetParent !== null);
    const aoTeclar = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        ev.preventDefault();
        aoFechar();
        return;
      }
      if (ev.key !== 'Tab') return;
      const lista = focaveis();
      if (!lista.length) return;
      const primeiro = lista[0];
      const ultimo = lista[lista.length - 1];
      if (ev.shiftKey && document.activeElement === primeiro) {
        ev.preventDefault();
        ultimo.focus();
      } else if (!ev.shiftKey && document.activeElement === ultimo) {
        ev.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [ativo, painel, aoFechar]);
}
