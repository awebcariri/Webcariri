import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

/** HTML inicial completo por rota, gerado durante o build (sem servidor Node em produção). */
export function render(pathname: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={pathname}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
