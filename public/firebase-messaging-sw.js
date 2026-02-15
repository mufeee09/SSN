importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCT8_VDhv5zVaIQN0vJXaawNKC5R0CAhMs",
  authDomain: "ssn-web-aaa51.firebaseapp.com",
  projectId: "ssn-web-aaa51",
  messagingSenderId: "991072246164",
  appId: "1:991072246164:web:41fe1593a2968ab9825781",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/pwa-192.png'
  });
});
