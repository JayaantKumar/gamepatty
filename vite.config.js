import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon-180.png', 'masked-icon.svg'],
      
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000
      },

      manifest: {
        name: 'GamePatty Admin',
        short_name: 'GamePatty',
        description: 'GamePatty Portfolio & Admin Panel',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone', 
        orientation: 'portrait',
        icons: [
          {
            // Updated to match your actual file name
            src: 'favicon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            // Updated to match your actual file name
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
});