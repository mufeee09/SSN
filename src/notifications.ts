import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

export const requestNotificationPermission = async () => {
  if (!messaging) {
    console.log("Messaging not supported");
    return;
  }

  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
      });

      console.log("FCM Token:", token);
      alert("Notifications enabled successfully!");

      // OPTIONAL: Save token to Firestore later
    } else {
      alert("Permission denied.");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

export const listenToForegroundMessages = () => {
  if (!messaging) return;

  onMessage(messaging, (payload) => {
    console.log("Foreground message:", payload);

    if (payload.notification) {
      alert(
        `${payload.notification.title}\n${payload.notification.body}`
      );
    }
  });
};
