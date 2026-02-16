// /**
//  * Firebase Cloud Messaging (FCM) - request permission, get token, save to Firestore,
//  * and handle foreground messages. Works for both website and PWA.
//  */
// import { getToken, onMessage, type MessagePayload } from "firebase/messaging";
// import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { db, messaging } from "./firebase";

// const FCM_COLLECTION = "fcmTokens";
// const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY as string | undefined;

// export type OnForegroundMessage = (payload: MessagePayload) => void;

// /**
//  * Request notification permission and return whether it was granted.
//  */
// export async function requestNotificationPermission(): Promise<boolean> {
//   if (!("Notification" in window)) return false;
//   if (Notification.permission === "granted") return true;
//   if (Notification.permission === "denied") return false;
//   const permission = await Notification.requestPermission();
//   return permission === "granted";
// }

// /**
//  * Register the FCM service worker and return its registration.
//  * We register under /fcm/ scope so it doesn't compete with the Vite PWA SW (scope /).
//  * That way the FCM SW activates immediately and getToken() uses it for push.
//  */
// async function getFCMServiceWorkerRegistration(): Promise<ServiceWorkerRegistration | undefined> {
//   if (!("serviceWorker" in navigator)) return undefined;
//   try {
//     // /fcm/firebase-messaging-sw.js → scope is /fcm/, so PWA SW keeps control of /
//     const reg = await navigator.serviceWorker.register("/fcm/firebase-messaging-sw.js", {
//       scope: "/fcm/",
//     });
//     // This SW has its own scope so it should activate right away
//     if (reg.active) return reg;
//     await new Promise<void>((resolve) => {
//       const sw = reg.installing || reg.waiting;
//       if (!sw) {
//         resolve();
//         return;
//       }
//       const onStateChange = () => {
//         if (reg.active) {
//           sw.removeEventListener("statechange", onStateChange);
//           resolve();
//         }
//       };
//       sw.addEventListener("statechange", onStateChange);
//       if (reg.active) resolve();
//       setTimeout(resolve, 3000);
//     });
//     return reg.active ? reg : undefined;
//   } catch (err) {
//     console.warn("FCM: failed to register firebase-messaging-sw.js", err);
//     return undefined;
//   }
// }

// /**
//  * Get FCM token. Requires VITE_FIREBASE_VAPID_KEY in .env (from Firebase Console > Project Settings > Cloud Messaging > Web Push certificates).
//  * Uses firebase-messaging-sw.js for background messages.
//  */
// export async function getFCMToken(): Promise<string | null> {
//   if (!messaging) return null;
//   if (!VAPID_KEY || VAPID_KEY.startsWith("YOUR_") || VAPID_KEY.length < 50) {
//     console.warn(
//       "FCM: VITE_FIREBASE_VAPID_KEY is missing or invalid. Add the Web Push key from Firebase Console > Project Settings > Cloud Messaging > Web Push certificates."
//     );
//     return null;
//   }
//   try {
//     const swReg = await getFCMServiceWorkerRegistration();
//     const token = await getToken(messaging, {
//       vapidKey: VAPID_KEY.trim(),
//       serviceWorkerRegistration: swReg ?? undefined,
//     });
//     return token;
//   } catch (err) {
//     console.warn("FCM getToken failed:", err);
//     return null;
//   }
// }

// /**
//  * Save FCM token to Firestore so you can send manual notifications later
//  * (e.g. from Firebase Console or Admin SDK to all or selected tokens).
//  */
// export async function saveTokenToFirestore(token: string): Promise<void> {
//   try {
//     await setDoc(doc(db, FCM_COLLECTION, token), {
//       token,
//       createdAt: serverTimestamp(),
//       userAgent:
//         typeof navigator !== "undefined" ? navigator.userAgent : "",
//     });
//   } catch (err) {
//     console.warn("FCM: failed to save token to Firestore", err);
//   }
// }

// /**
//  * Subscribe to foreground messages (when app is open). Call with a callback to show in-app toast.
//  */
// export function onForegroundMessage(callback: OnForegroundMessage): (() => void) | undefined {
//   if (!messaging) return undefined;
//   return onMessage(messaging, callback);
// }

// /**
//  * Initialize FCM: request permission, get token, save to Firestore, and optionally set up foreground handler.
//  * Call once when the app loads (e.g. in App.tsx useEffect).
//  */
// export async function initFCM(onForeground?: OnForegroundMessage): Promise<string | null> {
//   const granted = await requestNotificationPermission();
//   if (!granted) return null;

//   const token = await getFCMToken();
//   if (token) {
//     console.log("FCM token (copy this to send a test notification):", token);
//     await saveTokenToFirestore(token);
//   }

//   if (onForeground) onForegroundMessage(onForeground);

//   return token;
// }


/**
 * Firebase Cloud Messaging (FCM)
 * - request permission
 * - get token
 * - save to Firestore
 * - handle foreground messages
 */

import { getToken, onMessage, type MessagePayload } from "firebase/messaging";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, messaging } from "./firebase";

const FCM_COLLECTION = "fcmTokens";
const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY as string | undefined;

export type OnForegroundMessage = (payload: MessagePayload) => void;

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!("Notification" in window)) return false;

  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;

  const permission = await Notification.requestPermission();
  return permission === "granted";
}

/**
 * Register FCM Service Worker
 */
async function getFCMServiceWorkerRegistration(): Promise<ServiceWorkerRegistration | undefined> {
  if (!("serviceWorker" in navigator)) return undefined;

  try {
    const reg = await navigator.serviceWorker.register(
      "/fcm/firebase-messaging-sw.js",
      { scope: "/fcm/" }
    );

    if (reg.active) return reg;

    await new Promise<void>((resolve) => {
      const sw = reg.installing || reg.waiting;
      if (!sw) {
        resolve();
        return;
      }

      const onStateChange = () => {
        if (reg.active) {
          sw.removeEventListener("statechange", onStateChange);
          resolve();
        }
      };

      sw.addEventListener("statechange", onStateChange);
      setTimeout(resolve, 3000);
    });

    return reg.active ? reg : undefined;
  } catch (err) {
    console.warn("FCM: failed to register service worker", err);
    return undefined;
  }
}

/**
 * Get FCM Token
 */
export async function getFCMToken(): Promise<string | null> {
  if (!messaging) return null;

  if (!VAPID_KEY || VAPID_KEY.length < 50) {
    console.warn("FCM: Missing VAPID key");
    return null;
  }

  try {
    const swReg = await getFCMServiceWorkerRegistration();

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY.trim(),
      serviceWorkerRegistration: swReg ?? undefined,
    });

    return token;
  } catch (err) {
    console.warn("FCM getToken failed:", err);
    return null;
  }
}

/**
 * Save Token (NO DUPLICATES)
 */
export async function saveTokenToFirestore(token: string): Promise<void> {
  try {
    await setDoc(doc(db, FCM_COLLECTION, token), {
      token,
      createdAt: serverTimestamp(),
      userAgent:
        typeof navigator !== "undefined" ? navigator.userAgent : "",
    });
  } catch (err) {
    console.warn("FCM: failed to save token", err);
  }
}

/**
 * Initialize FCM (ONLY permission + token)
 */
export async function initFCM(): Promise<string | null> {
  const granted = await requestNotificationPermission();
  if (!granted) return null;

  const token = await getFCMToken();
  if (token) {
    console.log("FCM token:", token);
    await saveTokenToFirestore(token);
  }

  return token;
}

/**
 * Foreground Listener (attach ONCE in App)
 */
export function onForegroundMessage(
  callback: OnForegroundMessage
): (() => void) | undefined {
  if (!messaging) return undefined;
  return onMessage(messaging, callback);
}
