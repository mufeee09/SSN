importScripts('https://www.gstatic.com/firebasejs/12.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.9.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCT8_VDhv5zVaIQN0vJXaawNKC5R0CAhMs",
  authDomain: "ssn-web-aaa51.firebaseapp.com",
  projectId: "ssn-web-aaa51",
  messagingSenderId: "991072246164",
  appId: "1:991072246164:web:41fe1593a2968ab9825781",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
