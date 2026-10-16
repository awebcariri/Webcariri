import { useEffect, useState } from 'react';

/**
 * Abertura curta (cerca de 1,3 s): fundo creme, Cari, assinatura e cortina que sobe.
 * Aparece só na primeira página da visita e nunca com "reduzir movimento".
 */
export function Abertura() {
  const [mostrar, setMostrar] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    let abrir = true;
    try {
      abrir = sessionStorage.getItem('wc-abertura') !== '1';
    } catch {
      /* navegação privada: mostra a abertura */
    }
    // Enquanto a abertura está na tela, a entrada do topo da página espera por ela.
    if (abrir) document.documentElement.classList.add('abrindo');
    return abrir;
  });

  useEffect(() => {
    if (!mostrar) return;
    try {
      sessionStorage.setItem('wc-abertura', '1');
    } catch {
      /* navegação privada: segue sem lembrar */
    }
    const t = window.setTimeout(() => {
      setMostrar(false);
      document.documentElement.classList.remove('abrindo');
    }, 1500);
    return () => window.clearTimeout(t);
  }, [mostrar]);

  if (!mostrar) return null;

  return (
    <div className="abertura" aria-hidden="true">
      <div className="abertura__conteudo">
        <img src="/img/cari/cari-avatar-160.webp" alt="" width={96} height={96} className="abertura__cari" />
        <img src="/img/marca/webcariri-vinho.png" alt="" width={950} height={190} className="abertura__logo" />
        <span className="abertura__barra" />
      </div>
    </div>
  );
}
