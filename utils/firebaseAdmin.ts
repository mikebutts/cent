// utils/firebaseAdmin.ts

import * as admin from "firebase-admin";

if (!admin.apps.length) {
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

  if (!base64) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_BASE64 is missing.");
  }

  let serviceAccount;
  try {
    const jsonStr = Buffer.from(base64, "base64").toString("utf8");
    serviceAccount = JSON.parse(jsonStr);
  } catch (err) {
    console.error("❌ Failed to decode or parse FIREBASE_SERVICE_ACCOUNT_BASE64:", err);
    throw err;
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
export { admin, db };
