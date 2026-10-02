# -*- coding: utf-8 -*-
"""Confere se o site vai funcionar na Vercel ANTES de subir.
Uso:  python3 verificar_deploy.py
- todo arquivo citado nos .html/.css/.js existe
- o nome bate exatamente (a Vercel diferencia maiúsculas de minúsculas; o Windows não)
- nada depende de pastas (tudo na raiz facilita o upload)
- as páginas foram geradas depois da última mudança no style.css e no main.js
- os links estão no formato da Vercel (/projetos), e não no de abrir da pasta (projetos.html)
"""
import hashlib, os, re, sys
os.chdir(os.path.dirname(os.path.abspath(__file__)))
arquivos = set(os.listdir('.'))
padrao = re.compile(r'''(?:href|src|data-img)\s*=\s*["']([^"'#?]+)|url\(\s*["']?([^"')#?]+)''')
conjunto = re.compile(r'''(?:srcset|imagesrcset)\s*=\s*["']([^"']+)''')
versoes = re.compile(r'''(style\.css|main\.js)\?v=([0-9a-f]+)''')
erros, pastas = [], []

def versao(arq):
    return hashlib.md5(open(arq, 'rb').read().replace(b'\r\n', b'\n')).hexdigest()[:8]

for nome in sorted(arquivos):
    if not nome.endswith(('.html', '.css', '.js')):
        continue
    texto = open(nome, encoding='utf-8').read()
    refs = [(m.group(1) or m.group(2) or '').strip() for m in padrao.finditer(texto)]
    refs += [p.split()[0] for m in conjunto.finditer(texto) for p in m.group(1).split(',') if p.strip()]
    for ref in refs:
        if not ref or ref.startswith(('http:', 'https:', 'mailto:', 'tel:', 'data:', '//', '#', '%23')) or ref in ('./', '/'):
            continue
        alvo = ref.lstrip('./')
        if '/' in alvo:
            pastas.append(f'{nome}: {ref}')
        if nome.endswith('.html') and alvo.endswith('.html'):
            erros.append(f'{nome}: link "{ref}" com .html. Rode "python3 build.py" (sem --html) antes de subir')
        # endereço limpo: /projetos é o arquivo projetos.html
        if not os.path.exists(alvo) and os.path.exists(alvo + '.html'):
            alvo += '.html'
        if not os.path.exists(alvo):
            erros.append(f'{nome}: "{ref}" não existe')
        elif os.path.basename(alvo) not in os.listdir(os.path.dirname(alvo) or '.'):
            erros.append(f'{nome}: "{ref}" difere em maiúsculas/minúsculas do arquivo real')
    for arq, v in versoes.findall(texto):
        if os.path.exists(arq) and v != versao(arq):
            erros.append(f'{nome}: o {arq} mudou depois que a página foi gerada. Rode "python3 build.py"')
print('Arquivos na raiz:', len(arquivos))
if pastas:
    print('\nAtenção: referências a pastas (suba as pastas junto!):'); print('\n'.join('  ' + p for p in sorted(set(pastas))))
if erros:
    print('\nERROS:'); print('\n'.join('  ' + e for e in sorted(set(erros)))); sys.exit(1)
print('\nOK: tudo que as páginas usam existe e está na raiz. Pode subir todos os arquivos desta pasta.')
