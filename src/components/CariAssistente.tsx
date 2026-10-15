import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CASES, PLANOS } from '../content/conteudo';
import { MENSAGENS, SITE, linkWhatsApp } from '../config/site';
import { usePrenderFoco } from '../lib/hooks';
import { Icone } from './Icone';

/**
 * Cari, assistente virtual.
 * Hoje funciona com caminhos e respostas prontas, escritos a partir do conteúdo aprovado do site.
 * Não há IA conectada: nada do que a pessoa clica é enviado a servidor algum.
 * Para ligar uma IA no futuro, use um backend próprio (ver README), nunca uma chave no navegador.
 */

type Etapa = 'inicio' | 'site' | 'projetos' | 'equipe';

export function CariAssistente() {
  const [aberto, setAberto] = useState(false);
  const [etapa, setEtapa] = useState<Etapa>('inicio');
  const painel = useRef<HTMLDivElement>(null);
  const gatilho = useRef<HTMLButtonElement>(null);
  const titulo = useRef<HTMLHeadingElement>(null);
  const { pathname } = useLocation();

  const fechar = useCallback(() => {
    setAberto(false);
    gatilho.current?.focus();
  }, []);

  usePrenderFoco(aberto, painel, fechar);

  useEffect(() => {
    if (aberto) titulo.current?.focus();
  }, [aberto, etapa]);

  // Ao navegar por um link da conversa, fecha o painel.
  useEffect(() => setAberto(false), [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('cari-aberta', aberto);
  }, [aberto]);

  return (
    <div className="cari-assistente">
      <button
        ref={gatilho}
        type="button"
        className="cari-assistente__gatilho"
        aria-expanded={aberto}
        aria-controls="cari-painel"
        aria-label="Abrir conversa com Cari, assistente virtual"
        onClick={() => {
          setEtapa('inicio');
          setAberto((v) => !v);
        }}
      >
        <img src="/img/cari/cari-avatar-160.webp" alt="" width={160} height={160} />
      </button>

      <div
        id="cari-painel"
        ref={painel}
        className="cari-painel"
        role="dialog"
        aria-modal="false"
        aria-labelledby="cari-titulo"
        hidden={!aberto}
      >
        <div className="cari-painel__topo">
          <img src="/img/cari/cari-avatar-160.webp" alt="" width={48} height={48} />
          <div>
            <p className="cari-painel__nome">Cari</p>
            <p className="cari-painel__papel">Assistente virtual da WebCariri</p>
          </div>
          <button type="button" className="cari-painel__fechar" onClick={fechar} aria-label="Fechar conversa com Cari">
            <Icone nome="fechar" tamanho={22} traco={2} />
          </button>
        </div>

        <div className="cari-painel__corpo" aria-live="polite">
          {etapa === 'inicio' && (
            <>
              <h2 id="cari-titulo" ref={titulo} tabIndex={-1} className="cari-msg">
                Oi, sou o Cari, assistente virtual da WebCariri. Quer criar um site, conhecer nossos projetos ou tirar uma
                dúvida?
              </h2>
              <div className="cari-opcoes">
                <button type="button" onClick={() => setEtapa('site')}>
                  Quero um site
                </button>
                <button type="button" onClick={() => setEtapa('projetos')}>
                  Ver projetos
                </button>
                <button type="button" onClick={() => setEtapa('equipe')}>
                  Falar com a equipe
                </button>
              </div>
            </>
          )}

          {etapa === 'site' && (
            <>
              <h2 id="cari-titulo" ref={titulo} tabIndex={-1} className="cari-msg">
                Bora! Temos três pontos de partida. O valor final fica fechado antes de começar, depois de entender o que
                o seu negócio precisa.
              </h2>
              <ul role="list" className="cari-lista">
                {PLANOS.map((p) => (
                  <li key={p.id}>
                    <Link to={`/contato?plano=${p.id}`}>
                      <strong>{p.nome}</strong>
                      <span>
                        a partir de R$ {p.preco} · {p.resumo}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="cari-msg cari-msg--suave">Ainda em dúvida? A equipe ajuda você a escolher.</p>
              <div className="cari-opcoes">
                <Link to="/planos">Comparar planos</Link>
                <Link to="/contato?plano=ainda-nao-sei">Ainda não sei</Link>
                <button type="button" onClick={() => setEtapa('inicio')}>
                  Voltar
                </button>
              </div>
            </>
          )}

          {etapa === 'projetos' && (
            <>
              <h2 id="cari-titulo" ref={titulo} tabIndex={-1} className="cari-msg">
                Estes são alguns sites de clientes reais. Qual você quer ver?
              </h2>
              <ul role="list" className="cari-lista">
                {CASES.map((c) => (
                  <li key={c.id}>
                    <Link to={`/${c.id}`}>
                      <strong>{c.nome}</strong>
                      <span>
                        {c.segmento} · {c.cidade}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="cari-opcoes">
                <Link to="/projetos">Todos os projetos</Link>
                <button type="button" onClick={() => setEtapa('inicio')}>
                  Voltar
                </button>
              </div>
            </>
          )}

          {etapa === 'equipe' && (
            <>
              <h2 id="cari-titulo" ref={titulo} tabIndex={-1} className="cari-msg">
                A conversa com a equipe acontece no WhatsApp. Você pode chamar direto ou preparar uma mensagem com os dados
                do seu negócio.
              </h2>
              <div className="cari-opcoes">
                <a href={linkWhatsApp(MENSAGENS.geral)} target="_blank" rel="noopener noreferrer">
                  <Icone nome="whatsapp" tamanho={18} /> WhatsApp {SITE.whatsappExibicao}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
                <Link to="/contato">Preparar mensagem</Link>
                <button type="button" onClick={() => setEtapa('inicio')}>
                  Voltar
                </button>
              </div>
            </>
          )}
        </div>

        <p className="cari-painel__aviso">
          <Icone nome="info" tamanho={14} /> Respostas prontas, sem IA. Nada do que você escolhe aqui é enviado.
        </p>
      </div>
    </div>
  );
}
