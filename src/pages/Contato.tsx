import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Balao, Cari, Sticker, Trilha } from '../components/Comum';
import { Faiscas, Icone, Seta, type NomeIcone } from '../components/Icone';
import { OPCOES_CONTATO, type OpcaoContato } from '../content/conteudo';
import { MENSAGENS, SITE, linkWhatsApp } from '../config/site';
import { useSeo } from '../lib/hooks';

const ICONE_OPCAO: Record<OpcaoContato, NomeIcone> = {
  'ainda-nao-sei': 'lampada',
  'landing-express': 'documento',
  'site-profissional': 'monitor',
  'site-premium': 'estrela',
  parceria: 'pessoas',
  manutencao: 'engrenagem',
};

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
    if (!campos.nome.trim()) novos.nome = 'Conte como podemos te chamar.';
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
      <section className="container topo-interno con-topo">
        <div>
          <Trilha itens={[{ label: 'Início', to: '/' }, { label: 'Contato' }]} />
          <h1 className="titulo titulo--xl con-topo__titulo">
            Bora dar vida <br />
            <span className="acento">à sua ideia?</span>
          </h1>
          <p className="lead con-topo__lead">Conte do seu negócio. A conversa continua no WhatsApp.</p>
        </div>
        <div className="con-topo__arte" aria-hidden="true">
          <Balao variante="serif" className="con-topo__balao">
            Do Cariri <br />
            pro mundo.
          </Balao>
          <Sticker nome="sol-e-serras-do-cariri" className="con-topo__sol" />
          <Faiscas className="con-topo__faiscas" />
          <Cari pose="no-notebook" className="con-topo__cari" carregar="eager" largura={460} />
        </div>
      </section>

      <section className="container con-grade">
        <form className="con-form" onSubmit={enviar} noValidate aria-labelledby="con-form-titulo">
          <h2 className="titulo titulo--m" id="con-form-titulo">
            Conte pra gente
          </h2>
          <p className="con-form__intro">Preencha os campos abaixo e vamos conversar sobre o seu projeto.</p>

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
              placeholder="Como podemos te chamar?"
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
              placeholder="Qual o nome da sua empresa?"
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

          <div className="con-campo">
            <label htmlFor="con-instagram">
              Instagram do negócio <span className="con-opcional">(opcional)</span>
            </label>
            <input
              id="con-instagram"
              name="instagram"
              type="text"
              autoComplete="off"
              autoCapitalize="none"
              placeholder="@seuinstagram"
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
                  <span className="con-opcao__caixa">
                    <Icone nome={ICONE_OPCAO[o.id]} tamanho={24} traco={1.7} />
                    {o.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="con-campo">
            <label htmlFor="con-mensagem">
              Conte um pouco da sua ideia <span className="con-opcional">(opcional)</span>
            </label>
            <textarea
              id="con-mensagem"
              name="mensagem"
              rows={4}
              placeholder="Fale sobre o seu negócio, o que você precisa e como podemos ajudar..."
              value={campos.mensagem}
              onChange={(e) => atualizar('mensagem', e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn--vinho btn--grande btn--bloco con-form__enviar">
            <Icone nome="whatsapp" tamanho={26} /> Preparar mensagem no WhatsApp <Seta />
          </button>

          <div ref={refStatus} tabIndex={-1} role="status" className="con-status">
            {preparada ? (
              <div className="con-preparada">
                <p className="con-preparada__titulo">
                  <Icone nome="check-circulo" tamanho={22} /> Mensagem preparada.
                </p>
                <p>
                  Abrimos o WhatsApp em outra aba com o texto abaixo. Ela ainda <strong>não foi enviada</strong>: revise e
                  toque em enviar por lá.
                </p>
                <pre className="con-preparada__texto">{preparada.texto}</pre>
                <a href={preparada.url} target="_blank" rel="noopener noreferrer" className="link-grifo">
                  O WhatsApp não abriu? Abrir agora <Icone nome="externo" tamanho={18} />
                </a>
              </div>
            ) : (
              <p className="con-aviso">
                <Icone nome="info" tamanho={18} /> O WhatsApp abre com a mensagem. Você revisa e decide se envia.
              </p>
            )}
          </div>
        </form>

        <aside className="con-lado" aria-labelledby="con-lado-titulo">
          <h2 className="titulo titulo--m" id="con-lado-titulo">
            Prefere <br />
            <span className="acento">conversar direto?</span>
          </h2>
          <p className="con-lado__texto">
            Se quiser, chama a gente no <strong>WhatsApp</strong> ou pelo Instagram. Estamos sempre por aqui.
          </p>
          <ul role="list" className="con-lado__contatos">
            <li>
              <a href={linkWhatsApp(MENSAGENS.geral)} target="_blank" rel="noopener noreferrer" className="con-lado__zap">
                <span className="con-lado__icone">
                  <Icone nome="whatsapp" tamanho={20} />
                </span>
                {SITE.whatsappExibicao}
                <span className="sr-only"> no WhatsApp (abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
                <span className="con-lado__icone">
                  <Icone nome="instagram" tamanho={20} />
                </span>
                @{SITE.instagramUsuario}
                <span className="sr-only"> no Instagram (abre em nova aba)</span>
              </a>
            </li>
            <li>
              <span>
                <span className="con-lado__icone">
                  <Icone nome="pin" tamanho={20} />
                </span>
                {SITE.cidade} — {SITE.uf}
              </span>
            </li>
          </ul>
          <p className="con-lado__online">
            <Icone nome="globo" tamanho={22} /> Atendimento online para todo o Brasil.
          </p>
          <div className="con-lado__arte" aria-hidden="true">
            <Faiscas className="con-lado__faiscas" />
            <Cari pose="saudando" className="con-lado__cari" largura={300} />
          </div>
        </aside>
      </section>

      <section className="container con-mundo" aria-labelledby="con-mundo">
        <h2 className="titulo titulo--l" id="con-mundo">
          Do Cariri <br />
          <span className="acento">pro mundo.</span>
        </h2>
        <p className="texto">
          Criamos sites que conectam negócios do Cariri a novas possibilidades. Sites com personalidade. Presença com
          propósito.
        </p>
        <div className="con-mundo__arte" aria-hidden="true">
          <Sticker nome="sol-e-serras-do-cariri" className="con-mundo__sol" />
          <Sticker nome="ideias-daqui-novos-horizontes" className="con-mundo__sticker" />
        </div>
      </section>
    </>
  );
}
