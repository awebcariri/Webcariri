import { useCallback, useEffect, useState } from 'react';
import { Marca } from './Vitrine';

/**
 * Abertura da primeira visita (cerca de 2,4 s): tela preta, o logotipo é revelado da esquerda
 * para a direita, o ponto entra por último, uma linha fina marca o carregamento e a tela sobe
 * revelando o site. Não aparece com "reduzir movimento" nem nas visitas seguintes da sessão.
 */
export function Abertura() {
  const [mostrar, setMostrar] = useState(false);

  const concluir = useCallback(() => {
    setMostrar(false);
    document.documentElement.classList.remove('abrindo');
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      if (sessionStorage.getItem('wc-abertura') === '1') return;
      sessionStorage.setItem('wc-abertura', '1');
    } catch {
      // Navegação privada: mostra a abertura normalmente.
    }
    document.documentElement.classList.add('abrindo');
    setMostrar(true);
    // Reserva caso o navegador não dispare animationend.
    const t = window.setTimeout(concluir, 3500);
    return () => {
      window.clearTimeout(t);
      document.documentElement.classList.remove('abrindo');
    };
  }, [concluir]);

  if (!mostrar) return null;

  return (
    <div
      className="abertura"
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && e.animationName === 'abertura-sobe') concluir();
      }}
    >
      <div className="abertura__marca">
        <Marca />
      </div>
      <div className="abertura__base">
        <span>Estúdio de sites</span>
        <span className="abertura__linha" />
        <span>Juazeiro do Norte · CE</span>
      </div>
    </div>
  );
}
