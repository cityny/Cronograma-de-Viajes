// vite.config.ts

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
      // INICIO DEL CÓDIGO A AÑADIR/MODIFICAR
      server: {
        host: '0.0.0.0', // Esencial para el HMR en contenedores
        port: 3000
      },
      preview: {
        host: '0.0.0.0', // Escucha en todas las interfaces del contenedor
        port: 3000,
        allowedHosts: [
          // Esto permite que el proxy de EasyPanel (Traefik) acceda
          '*.easypanel.host' 
        ]
      }
      // FIN DEL CÓDIGO A AÑADIR/MODIFICAR
    };
});
