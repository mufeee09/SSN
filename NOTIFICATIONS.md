# Firebase manual notifications (FCM)

This app uses **Firebase Cloud Messaging (FCM)** so you can send manual notifications to everyone using the website or the PWA.

## 1. One-time setup

### VAPID key (required for web/PWA)

1. Open [Firebase Console](https://console.firebase.google.com) → your project → **Project settings** (gear) → **Cloud Messaging**.
2. Under **Web configuration** → **Web Push certificates**, click **Generate key pair**.
3. Copy the **Key pair** (public key) and add it to your `.env`:

```env
VITE_FIREBASE_VAPID_KEY=your_long_vapid_public_key_here
```

Your existing `VITE_FIREBASE_*` vars (e.g. `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_MESSAGING_SENDER_ID`) are already used; the build injects them into `public/firebase-messaging-sw.js` for background push.

### Firestore: allow saving FCM tokens (fix "Missing or insufficient permissions")

Clients save their FCM token to the `fcmTokens` collection. You **must** allow this in Firestore rules or you'll get **Missing or insufficient permissions**.

**In Firebase Console:** [Firebase Console](https://console.firebase.google.com) → your project → **Firestore Database** → **Rules** tab.

Add a rule for `fcmTokens` (or merge with your existing rules):

```javascript
match /fcmTokens/{id} {
  allow create: if true;
  allow read, update, delete: if false;
}
```

Then click **Publish**. If you already have other `match` blocks (e.g. for `hadiths`, `programs`), add the `fcmTokens` block inside the same `match /databases/{database}/documents { ... }` and keep your existing rules.

A full example is in the repo as **`firestore.rules`** — you can copy from it or deploy with `firebase deploy --only firestore:rules` if you use the Firebase CLI.

### If you see "Registration failed - push service error" (AbortError)

1. **VAPID key**  
   Use the key from **this** Firebase project: **Project settings → Cloud Messaging → Web Push certificates → Key pair**. Copy the full key into `.env` as `VITE_FIREBASE_VAPID_KEY` with no extra spaces or line breaks. Restart the dev server after changing `.env`.

2. **Enable the FCM API**  
   In [Google Cloud Console](https://console.cloud.google.com) → your project → **APIs & Services → Enabled APIs**, ensure **Firebase Cloud Messaging API** (or **Cloud Messaging API**) is enabled. Enable it if it’s missing.

3. **Browser**  
   Use a normal (non‑incognito) window and a supported browser (e.g. Chrome or Edge). Clear the site’s data for localhost and try again.

4. **Service worker**  
   The app now registers `firebase-messaging-sw.js` explicitly before requesting the token so the correct SW is used for push. If the error persists, in DevTools → Application → Service Workers, unregister all for localhost and reload.

## 2. How tokens are stored

- When a user allows notifications, the app gets an FCM token and saves it to Firestore in the **`fcmTokens`** collection.
- Each document has: `token`, `createdAt`, `userAgent`.
- You use these tokens (or a **topic**) to send manual messages.

## 3. Sending manual notifications

### Option A: Firebase Console (easiest)

1. **Firebase Console** → **Engage** → **Messaging** (or **Cloud Messaging**).
2. **Create your first campaign** / **New campaign** → **Firebase Notification messages**.
3. Compose **Notification title** and **Notification text**.
4. Under **Target**:
   - **Send to topic**: create a topic (e.g. `all`) and subscribe tokens to it from your backend (see Option B), then target that topic; or
   - **Send to single device**: paste one FCM token (from a document in `fcmTokens`).

To send to **all** users from the Console you need a topic: subscribe every token to a topic (e.g. `all`) using the Admin SDK or HTTP API, then in the Console choose “Topic” and enter `all`.

### Option B: Send to all (script in this repo)

A script sends to **every token** in `fcmTokens` (everyone who opened the site/PWA and allowed notifications).

**One-time setup**

1. **Firebase Console** → your project → **Project settings** (gear) → **Service accounts**.
2. Click **Generate new private key** and download the JSON file.
3. Save it as **`serviceAccountKey.json`** in the **project root** (same folder as `package.json`). It is in `.gitignore` — do not commit it.
4. Install the script dependency (if not already):  
   `npm install`

**Send a notification to everyone**

From the project root, run:

```bash
node scripts/send-to-all.cjs "Your title" "Your message body"
```

Or with npm:

```bash
npm run send-notification -- "Your title" "Your message body"
```

Example:

```bash
npm run send-notification -- "New program" "Check out the new schedule on the website."
```

The script reads all tokens from Firestore `fcmTokens` and sends the notification to each. Everyone who has allowed notifications (website or PWA) will receive it. **Invalid tokens** (e.g. user cleared data, uninstalled, or token expired) are removed from Firestore automatically so the next run only uses valid tokens.

### Option C: Send from Firebase Console to all users (topic "all")

If you want to send from the **Firebase Console** (no terminal) to everyone:

1. **Once** (and after new users allow notifications), run:
   ```bash
   npm run subscribe-topic
   ```
   This subscribes every token in `fcmTokens` to the topic **`all`**.

2. In **Firebase Console** → **Engage** → **Messaging** → **New campaign** → **Firebase Notification messages** → set title and body → **Next** → under **Target** choose **Topic** and enter **`all`** → **Next** → **Review** → **Publish**.

Everyone subscribed to the topic will get the notification. Run `npm run subscribe-topic` again whenever you want to include newly added tokens.

## 4. Behaviour

- **Website / PWA open (foreground):** the app shows the message via **in-app toast** (react-hot-toast).
- **PWA or tab in background / closed:** the browser shows a **system notification** (handled by `public/firebase-messaging-sw.js`). Clicking it can open your app or a URL (e.g. from `data.url`).

## 5. Optional: topic “all” for Console-only sends

If you want to use only the Firebase Console and send to “everyone”, you can:

1. Add a **Cloud Function** (or scheduled script) that:
   - On a schedule or trigger, reads `fcmTokens`,
   - Subscribes each token to the topic `all`:  
     `admin.messaging().subscribeToTopic(tokens, 'all')`.
2. In the Console, when creating a campaign, choose **Topic** and enter `all`.

## 5. Why do some sends fail? (NotRegistered)

NotRegistered or "Requested entity was not found" means that token is no longer valid (user cleared site data, uninstalled PWA, or token expired). The send script now **removes** those tokens from Firestore after a failed send, so the next run only uses valid tokens. "Sent to 1 device(s). Failed: 5" means one user received it and five tokens were invalid and were removed.
