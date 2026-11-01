import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.png', 'sw.js'],
      manifest: {
        name: 'VANTIQ – Emergency Finance Optimizer',
        short_name: 'VANTIQ',
        description: 'Quantum-Enhanced Counterfactual Digital Twin & Anti-Predatory Emergency Finance Engine.',
        theme_color: '#9fe870',
        background_color: '#f4f5f1',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        scope: '/',
        lang: 'en-IN',
        categories: ['finance', 'utilities'],
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
        shortcuts: [
          {
            name: 'Emergency Simulator',
            short_name: 'Simulator',
            url: '/#simulator',
          },
          {
            name: 'Quantum Solver',
            short_name: 'Quantum',
            url: '/#quantum-solver',
          },
        ],
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
        navigateFallback: 'index.html',
      },
      devOptions: { enabled: false },
    }),
  ],
})
