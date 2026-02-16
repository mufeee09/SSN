/**
 * Subscribe all tokens in fcmTokens to the topic "all".
 * After running this, you can send to everyone from Firebase Console:
 *   Engage → Messaging → New campaign → Target: "Topic" → enter "all"
 *
 * Run once after adding new tokens, or periodically.
 * Same setup as send-to-all.cjs (serviceAccountKey.json in project root).
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(process.cwd(), 'serviceAccountKey.json');
if (!fs.existsSync(credPath)) {
  console.error('Missing serviceAccountKey.json. See NOTIFICATIONS.md.');
  process.exit(1);
}
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(credPath);
admin.initializeApp({ credential: admin.credential.applicationDefault() });

const topic = process.argv[2] || 'all';

async function subscribeToTopic() {
  const db = admin.firestore();
  const snap = await db.collection('fcmTokens').get();
  const tokens = snap.docs.map((d) => d.data().token).filter(Boolean);

  if (tokens.length === 0) {
    console.log('No tokens in fcmTokens.');
    process.exit(0);
  }

  const res = await admin.messaging().subscribeToTopic(tokens, topic);
  console.log(`Subscribed to topic "${topic}": success ${res.successCount}, failed ${res.failureCount}`);
  if (res.failureCount > 0) {
    res.errors.forEach((e, i) => console.error('  ', e.index, e.error?.message));
  }
  console.log('You can now send from Firebase Console → Messaging → New campaign → Send to topic →', topic);
  process.exit(0);
}

subscribeToTopic().catch((err) => {
  console.error(err);
  process.exit(1);
});
