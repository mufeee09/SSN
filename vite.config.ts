import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'fs'
import path from 'path'

function firebaseMessagingSWPlugin() {
  return {
    name: 'firebase-messaging-sw',
    config(_, { mode }) {
      const env = loadEnv(mode, process.cwd(), '')
      const config = {
        apiKey: env.VITE_FIREBASE_API_KEY || 'YOUR_VITE_FIREBASE_API_KEY',
        authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'YOUR_VITE_FIREBASE_AUTH_DOMAIN',
        projectId: env.VITE_FIREBASE_PROJECT_ID || 'YOUR_VITE_FIREBASE_PROJECT_ID',
        storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'YOUR_VITE_FIREBASE_STORAGE_BUCKET',
        messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_VITE_FIREBASE_MESSAGING_SENDER_ID',
        appId: env.VITE_FIREBASE_APP_ID || 'YOUR_VITE_FIREBASE_APP_ID',
        measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || 'YOUR_VITE_FIREBASE_MEASUREMENT_ID',
      }
      const swContent = `/**
 * Firebase Cloud Messaging - Background handler (injected at build)
 */
importScripts('https://www.gstatic.com/firebasejs/12.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.9.0/firebase-messaging-compat.js');

const firebaseConfig = ${JSON.stringify(config, null, 2)};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || payload.data?.title || 'Notification';
  const options = {
    body: payload.notification?.body || payload.data?.body || '',
    icon: payload.notification?.icon || '/pwa-192.png',
    badge: '/pwa-192.png',
    tag: payload.data?.tag || 'fcm-default',
    data: payload.data || {},
    requireInteraction: false,
  };
  return self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        clientList[0].navigate(urlToOpen);
        clientList[0].focus();
      } else if (clients.openWindow) {
        clients.openWindow(urlToOpen);
      }
    })
  );
});
`
      const publicDir = path.resolve(process.cwd(), 'public')
      fs.writeFileSync(path.join(publicDir, 'firebase-messaging-sw.js'), swContent)
      // Also write under /fcm/ so we can register with scope /fcm/ and avoid competing with PWA SW
      const fcmDir = path.join(publicDir, 'fcm')
      if (!fs.existsSync(fcmDir)) fs.mkdirSync(fcmDir, { recursive: true })
      fs.writeFileSync(path.join(fcmDir, 'firebase-messaging-sw.js'), swContent)
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [
    firebaseMessagingSWPlugin(),
    react(),

    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg'
      ],

      manifest: {
        name: 'S S Nallur',
        short_name: 'SSN',
        description: 'My Firebase Powered PWA App',
        theme_color: '#0f172a',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: '/pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },

      workbox: {
        // 🔥 This is important — caches all built static files
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],

        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,

        runtimeCaching: [
          // 🔥 Firebase Firestore
          {
            urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'firebase-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },

          // 🔥 Firebase Storage (if you use it later)
          {
            urlPattern: /^https:\/\/firebasestorage\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'firebase-storage-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },

          // 🔥 Images from /assets or public
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
}))
