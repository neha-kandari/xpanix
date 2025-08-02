import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Firebase configuration with environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBdmB-BBrwOIXXQQ87UfAHjAmoJEqJ7V4s",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "xpanix-b2f7c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "xpanix-b2f7c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "xpanix-b2f7c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "654509076160",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:654509076160:web:f4f52ee9e07c1388f8c725",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Log successful initialization in development
  if (import.meta.env.MODE === 'development') {
    console.log('Firebase initialized successfully with new project');
    console.log('Project ID:', firebaseConfig.projectId);
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
  throw new Error("Firebase configuration error. Please check your environment variables.");
}

export { auth, db }; 