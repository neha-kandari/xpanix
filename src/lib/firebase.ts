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
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX", // Add this line
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  // Check if Firebase is already initialized
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    console.log('Firebase initialized with new app instance');
  } else {
    app = getApps()[0];
    console.log('Firebase using existing app instance');
  }
  
  // Initialize auth and firestore
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Log successful initialization in development
  if (import.meta.env.MODE === 'development') {
    console.log('Firebase initialized successfully');
    console.log('Project ID:', firebaseConfig.projectId);
    console.log('Auth Domain:', firebaseConfig.authDomain);
    console.log('App ID:', firebaseConfig.appId);
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
  throw new Error("Firebase configuration error. Please check your environment variables.");
}

export { auth, db }; 