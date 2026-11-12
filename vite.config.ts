import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

interface DevNodeRequest {
  method?: string;
  on(event: 'data', listener: (chunk: unknown) => void): void;
  on(event: 'end', listener: () => void): void;
}

interface DevNodeResponse {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(data?: string): void;
}

function localChatApiPlugin(): Plugin {
  return {
    name: 'local-edge-chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', (rawReq, rawRes) => {
        const req = rawReq as unknown as DevNodeRequest;
        const res = rawRes as unknown as DevNodeResponse;
        const chunks: string[] = [];
        req.on('data', (chunk: unknown) => {
          chunks.push(String(chunk));
        });
        req.on('end', () => {
          void (async () => {
            try {
              const mod = (await server.ssrLoadModule('/api/chat.ts')) as {
                default: (r: Request) => Promise<Response>;
              };
              const bodyText = chunks.join('');
              const webReq = new Request('http://localhost/api/chat', {
                method: req.method || 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: req.method === 'POST' ? bodyText : undefined,
              });
              const webRes = await mod.default(webReq);
              res.statusCode = webRes.status;
              webRes.headers.forEach((val: string, key: string) => {
                res.setHeader(key, val);
              });
              const text = await webRes.text();
              res.end(text);
            } catch {
              res.statusCode = 500;
              res.end();
            }
          })();
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    localChatApiPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Anderson Cataldo | Full Stack, Automação & IA',
        short_name: 'Anderson Tech',
        description: 'Portfolio profissional de Anderson Cataldo: Engenharia Full Stack, Automação Corporativa e Inteligência Artificial.',
        theme_color: '#090e1a',
        background_color: '#090e1a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,webp,pdf}', 'apple-touch-icon.png'],
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
    }),
  ],
});
