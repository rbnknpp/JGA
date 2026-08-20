import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

// Firebase web config values are public identifiers, not secrets - access
// control happens via Firestore security rules, not by hiding these.
// Safe to commit directly; env vars (if set) override for a different project.
// Photos are stored as compressed data URLs directly in Firestore documents
// (see src/lib/compressImage.ts) rather than Firebase Storage, since Storage
// now requires the paid Blaze plan even for free-tier usage.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyAQGcJIHvmD3NaL6Y4VKHkgVbELtge6-18",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "junggesellenabschied-bb0f6.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "junggesellenabschied-bb0f6",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "junggesellenabschied-bb0f6.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "419829912081",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:419829912081:web:a00656537feec351fa57b0",
};

export const firebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId,
);

export const app = firebaseConfigured ? initializeApp(firebaseConfig) : null;
// Auto-detect long-polling instead of Firestore's default streaming
// transport - restrictive networks/proxies (bar wifi, corporate networks)
// often block the streaming connection silently, which otherwise leaves
// writes stuck without ever resolving or throwing.
export const db = app
  ? initializeFirestore(app, { experimentalAutoDetectLongPolling: true })
  : null;
