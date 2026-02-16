/**
 * Send a push notification to ALL users who have allowed notifications
 * (every token in the fcmTokens Firestore collection).
 *
 * Setup (one time):
 * 1. Firebase Console → Project settings → Service accounts → Generate new private key.
 * 2. Save the JSON file as serviceAccountKey.json in the project root (do not commit it).
 * 3. Run: node scripts/send-to-all.cjs "Your title" "Your message body"
 *
 * Or with env: GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json node scripts/send-to-all.cjs "Title" "Body"
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(process.cwd(), 'serviceAccountKey.json');
if (!fs.existsSync(credPath)) {
  console.error('Missing service account key.');
  console.error('1. Firebase Console → Project settings → Service accounts → Generate new private key');
  console.error('2. Save as serviceAccountKey.json in the project root');
  console.error('3. Run: node scripts/send-to-all.cjs "Title" "Body"');
  process.exit(1);
}
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(credPath);
admin.initializeApp({ credential: admin.credential.applicationDefault() });

const title = process.argv[2] || 'Update';
const body = process.argv[3] || 'You have a new notification.';

async function sendToAll() {
  const db = admin.firestore();
  const snap = await db.collection('fcmTokens').get();
  const docs = snap.docs.filter((d) => d.data().token);
  const tokens = docs.map((d) => d.data().token);

  if (tokens.length === 0) {
    console.log('No tokens in fcmTokens. No notification sent.');
    process.exit(0);
  }

  const message = {
    notification: { title, body },
    data: { url: '/' },
    webpush: {
      fcmOptions: { link: '/' },
    },
  };

  const res = await admin.messaging().sendEachForMulticast({
    tokens,
    notification: message.notification,
    data: message.data,
    webpush: message.webpush,
  });

  console.log(`Sent to ${res.successCount} device(s). Failed: ${res.failureCount}`);

  // Remove invalid tokens from Firestore (NotRegistered / uninstalled / expired)
  const toRemove = [];
  res.responses.forEach((r, i) => {
    if (!r.success) {
      const code = r.error?.code || r.error?.message || '';
      const isInvalid = /notregistered|invalid-registration|requested entity was not found/i.test(String(code));
      if (isInvalid) toRemove.push(docs[i].id);
      console.error('  Token failed:', tokens[i].slice(0, 20) + '...', r.error?.message);
    }
  });
  if (toRemove.length > 0) {
    const batch = db.batch();
    toRemove.forEach((id) => batch.delete(db.collection('fcmTokens').doc(id)));
    await batch.commit();
    console.log(`Removed ${toRemove.length} invalid token(s) from Firestore.`);
  }

  process.exit(0);
}

sendToAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
