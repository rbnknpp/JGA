import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase web config values are public identifiers, not secrets - access
// control happens via Firestore/Storage security rules, not by hiding these.
// Safe to commit directly; env vars (if set) override for a different project.
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
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;
