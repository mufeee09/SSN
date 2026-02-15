import { precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

declare let self: ServiceWorkerGlobalScope;

self.skipWaiting();
clientsClaim();

// 🔥 REQUIRED FOR injectManifest
precacheAndRoute(self.__WB_MANIFEST);

const firebaseConfig = {
  apiKey: "AIzaSyCT8_VDhv5zVaIQN0vJXaawNKC5R0CAhMs",
  authDomain: "ssn-web-aaa51.firebaseapp.com",
  projectId: "ssn-web-aaa51",
  messagingSenderId: "991072246164",
  appId: "1:991072246164:web:41fe1593a2968ab9825781",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 🔥 Background notifications
onBackgroundMessage(messaging, (payload) => {
  self.registration.showNotification(
    payload.notification?.title || "Notification",
    {
      body: payload.notification?.body,
      icon: "/pwa-192.png",
    }
  );
});