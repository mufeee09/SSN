/**
 * Firebase Cloud Messaging - Background handler (injected at build)
 */
importScripts('https://www.gstatic.com/firebasejs/12.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.9.0/firebase-messaging-compat.js');

const firebaseConfig = {
  "apiKey": "AIzaSyCT8_VDhv5zVaIQN0vJXaawNKC5R0CAhMs",
  "authDomain": "ssn-web-aaa51.firebaseapp.com",
  "projectId": "ssn-web-aaa51",
  "storageBucket": "ssn-web-aaa51.firebasestorage.app",
  "messagingSenderId": "991072246164",
  "appId": "1:991072246164:web:41fe1593a2968ab9825781",
  "measurementId": "G-2QJNJW2SKG"
};
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
