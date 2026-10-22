import { useCallback, useEffect, useState } from 'react';
import { Marca } from './Vitrine';

/**
 * Abertura a cada carregamento do site (abrir, recarregar ou chegar por um link).
 * Não reaparece ao navegar entre páginas pelo menu, porque o componente monta uma vez só.
 * - Normal (cerca de 2,4 s): tela preta, logotipo revelado da esquerda para a direita, ponto
 *   tomate entrando por último, linha de carregamento e a tela subindo para revelar o site.
 * - Com "reduzir movimento" (cerca de 1,2 s): logotipo parado, a tela só esmaece.
 */
export function Abertura() {
  const [modo, setModo] = useState<'normal' | 'simples' | null>(null);

  const concluir = useCallback(() => {
    setModo(null);
    document.documentElement.classList.remove('abrindo');
  }, []);

  useEffect(() => {
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('abrindo');
    setModo(reduzir ? 'simples' : 'normal');
    // Reserva caso o navegador não dispare animationend.
    const t = window.setTimeout(concluir, reduzir ? 1800 : 3500);
    return () => {
      window.clearTimeout(t);
      document.documentElement.classList.remove('abrindo');
    };
  }, [concluir]);

  if (!modo) return null;

  return (
    <div
      className={`abertura abertura--${modo}`}
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && (e.animationName === 'abertura-sobe' || e.animationName === 'abertura-esmaece'))
          concluir();
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
