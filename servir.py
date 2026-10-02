# -*- coding: utf-8 -*-
"""Abre o site no computador do mesmo jeito que a Vercel serve (endereços sem .html e 404.html).
Uso:  python3 servir.py        (depois abra http://localhost:8000)
      python3 servir.py 3000   (para escolher outra porta)
"""
import http.server, os, sys
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Limpo(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        caminho = self.path.split('?')[0].split('#')[0]
        arq = self.translate_path(caminho)
        if not os.path.exists(arq) and os.path.isfile(arq + '.html'):
            self.path = caminho + '.html'
        elif not os.path.exists(arq):
            self.path = '/404.html'
            corpo = open('404.html', 'rb').read()
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(corpo)))
            self.end_headers()
            self.wfile.write(corpo)
            return None
        return super().send_head()

porta = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
print(f'Site em http://localhost:{porta}  (Ctrl+C para parar)')
http.server.ThreadingHTTPServer(('', porta), Limpo).serve_forever()
