import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TopoPagina } from '../components/Comum';
import { Icone, Seta } from '../components/Icone';
import { OPCOES_CONTATO, type OpcaoContato } from '../content/conteudo';
import { MENSAGENS, SITE, linkWhatsApp } from '../config/site';
import { useSeo } from '../lib/hooks';

type Campos = { nome: string; negocio: string; instagram: string; procura: OpcaoContato; mensagem: string };
type Erros = Partial<Record<'nome' | 'negocio', string>>;

function montarMensagem(c: Campos) {
  const opcao = OPCOES_CONTATO.find((o) => o.id === c.procura)?.label ?? 'Ainda não sei';
  const linhas = [
    `Olá, WebCariri! Meu nome é ${c.nome.trim()}.`,
    `Negócio: ${c.negocio.trim()}`,
    c.instagram.trim() && `Instagram: ${c.instagram.trim()}`,
    `O que procuro: ${opcao}`,
    c.mensagem.trim() && `\n${c.mensagem.trim()}`,
  ];
  return linhas.filter(Boolean).join('\n');
}

export default function Contato() {
  useSeo('/contato');
  const [params] = useSearchParams();
  const inicial = OPCOES_CONTATO.some((o) => o.id === params.get('plano'))
    ? (params.get('plano') as OpcaoContato)
    : 'ainda-nao-sei';

  const [campos, setCampos] = useState<Campos>({ nome: '', negocio: '', instagram: '', procura: inicial, mensagem: '' });
  const [erros, setErros] = useState<Erros>({});
  const [preparada, setPreparada] = useState<{ url: string; texto: string } | null>(null);
  const refNome = useRef<HTMLInputElement>(null);
  const refNegocio = useRef<HTMLInputElement>(null);
  const refStatus = useRef<HTMLDivElement>(null);

  // Links como /contato?plano=site-premium já chegam com a opção marcada.
  useEffect(() => {
    setCampos((c) => ({ ...c, procura: inicial }));
  }, [inicial]);

  const atualizar = <K extends keyof Campos>(k: K, v: Campos[K]) => {
    setCampos((c) => ({ ...c, [k]: v }));
    setPreparada(null);
    if (k in erros && String(v).trim()) setErros((e) => ({ ...e, [k]: undefined }));
  };

  const enviar = (ev: FormEvent) => {
    ev.preventDefault();
    const novos: Erros = {};
    if (!campos.nome.trim()) novos.nome = 'Informe como podemos chamar você.';
    if (!campos.negocio.trim()) novos.negocio = 'Informe o nome do seu negócio.';
    setErros(novos);
    if (novos.nome) return refNome.current?.focus();
    if (novos.negocio) return refNegocio.current?.focus();

    const texto = montarMensagem(campos);
    const url = linkWhatsApp(texto);
    setPreparada({ url, texto });
    // Abre o WhatsApp com o texto pronto. A pessoa revisa e decide se envia por lá.
    window.open(url, '_blank', 'noopener,noreferrer');
    window.setTimeout(() => refStatus.current?.focus(), 50);
  };

  return (
    <>
      <TopoPagina
        rotulo="Contato"
        titulo={
          <>
            Vamos conversar sobre <em>o seu projeto.</em>
          </>
        }
        lead="Preencha os campos e a conversa continua no WhatsApp. Atendimento online para todo o Brasil."
      />

      <section className="secao con-secao">
        <div className="container con-grade">
          <form className="con-form" onSubmit={enviar} noValidate aria-label="Formulário de contato">
            <div className="con-campos">
              <div className="con-campo">
                <label htmlFor="con-nome">
                  Seu nome <span className="sr-only">(obrigatório)</span>
                </label>
                <input
                  ref={refNome}
                  id="con-nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  value={campos.nome}
                  onChange={(e) => atualizar('nome', e.target.value)}
                  aria-invalid={!!erros.nome}
                  aria-describedby={erros.nome ? 'con-nome-erro' : undefined}
                  required
                />
                {erros.nome && (
                  <p className="con-erro" id="con-nome-erro">
                    {erros.nome}
                  </p>
                )}
              </div>

              <div className="con-campo">
                <label htmlFor="con-negocio">
                  Nome do negócio <span className="sr-only">(obrigatório)</span>
                </label>
                <input
                  ref={refNegocio}
                  id="con-negocio"
                  name="negocio"
                  type="text"
                  autoComplete="organization"
                  value={campos.negocio}
                  onChange={(e) => atualizar('negocio', e.target.value)}
                  aria-invalid={!!erros.negocio}
                  aria-describedby={erros.negocio ? 'con-negocio-erro' : undefined}
                  required
                />
                {erros.negocio && (
                  <p className="con-erro" id="con-negocio-erro">
                    {erros.negocio}
                  </p>
                )}
              </div>
            </div>

            <div className="con-campo">
              <label htmlFor="con-instagram">
                Instagram do negócio <span className="con-opcional">opcional</span>
              </label>
              <input
                id="con-instagram"
                name="instagram"
                type="text"
                autoComplete="off"
                autoCapitalize="none"
                placeholder="@seunegocio"
                value={campos.instagram}
                onChange={(e) => atualizar('instagram', e.target.value)}
              />
            </div>

            <fieldset className="con-campo con-opcoes">
              <legend>O que você procura?</legend>
              <div className="con-opcoes__grade">
                {OPCOES_CONTATO.map((o) => (
                  <label key={o.id} className="con-opcao">
                    <input
                      type="radio"
                      name="procura"
                      value={o.id}
                      checked={campos.procura === o.id}
                      onChange={() => atualizar('procura', o.id)}
                    />
                    <span>{o.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="con-campo">
              <label htmlFor="con-mensagem">
                Sobre o projeto <span className="con-opcional">opcional</span>
              </label>
              <textarea
                id="con-mensagem"
                name="mensagem"
                rows={5}
                placeholder="O que o seu negócio faz e o que o site precisa resolver"
                value={campos.mensagem}
                onChange={(e) => atualizar('mensagem', e.target.value)}
              />
            </div>

            <button type="submit" className="btn con-enviar">
              <Icone nome="whatsapp" tamanho={20} /> Preparar mensagem no WhatsApp <Seta />
            </button>

            <div ref={refStatus} tabIndex={-1} role="status" className="con-status">
              {preparada ? (
                <div className="con-preparada">
                  <p className="con-preparada__titulo">
                    <Icone nome="check-circulo" tamanho={20} /> Mensagem preparada
                  </p>
                  <p>
                    Abrimos o WhatsApp em outra aba com o texto abaixo. Ela ainda <strong>não foi enviada</strong>: revise e
                    toque em enviar por lá.
                  </p>
                  <pre className="con-preparada__texto">{preparada.texto}</pre>
                  <a href={preparada.url} target="_blank" rel="noopener noreferrer" className="link-seta">
                    O WhatsApp não abriu? Abrir agora <Icone nome="seta-diag" tamanho={16} traco={2} />
                  </a>
                </div>
              ) : (
                <p className="con-aviso">O WhatsApp abre com a mensagem pronta. Você revisa e decide se envia.</p>
              )}
            </div>
          </form>

          <aside className="con-lado" aria-labelledby="con-lado-titulo">
            <h2 className="titulo titulo--3" id="con-lado-titulo">
              Prefere falar direto?
            </h2>
            <dl className="con-dados">
              <div>
                <dt>WhatsApp</dt>
                <dd>
                  <a href={linkWhatsApp(MENSAGENS.geral)} target="_blank" rel="noopener noreferrer">
                    {SITE.whatsappExibicao}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd>
                  <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
                    @{SITE.instagramUsuario}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt>Estúdio</dt>
                <dd>
                  {SITE.cidade}, {SITE.uf}
                </dd>
              </div>
              <div>
                <dt>Atendimento</dt>
                <dd>Online, para todo o Brasil</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
