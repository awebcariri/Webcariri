import { useEffect, useState } from 'react';

/** Abertura na primeira visita, respeitando a preferência de reduzir movimento. */
export function Abertura() {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      if (sessionStorage.getItem('wc-abertura') === '1') return;
    } catch {
      // Navegação privada: segue normalmente.
    }

    document.documentElement.classList.add('abrindo');
    setMostrar(true);
    const t = window.setTimeout(() => {
      setMostrar(false);
      document.documentElement.classList.remove('abrindo');
      try { sessionStorage.setItem('wc-abertura', '1'); } catch { /* modo privado */ }
    }, 1500);

    return () => {
      window.clearTimeout(t);
      document.documentElement.classList.remove('abrindo');
    };
  }, []);

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
