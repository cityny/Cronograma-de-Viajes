import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      server: {
        host: '0.0.0.0',
        port: 3000,
        allowedHosts: ['cityny-cronograma-viajes.s2gdvv.easypanel.host']
      },
      preview: {
        host: '0.0.0.0',
        port: 3000,
        allowedHosts: ['cityny-cronograma-viajes.s2gdvv.easypanel.host']
      }
    };
});
