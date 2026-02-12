/**
 * Firebase Configuration
 * =====================
 * Production-ready Firebase setup for Discover Egypt
 * Initialized with CDN imports for GitHub Pages compatibility
 */

// Firebase Configuration Object
const firebaseConfig = {
  apiKey: "AIzaSyDdJHBy-Ai8MBQQgFJCsolOE1VvCPwWOCQ",
  authDomain: "discover-egypt-13ef7.firebaseapp.com",
  projectId: "discover-egypt-13ef7",
  storageBucket: "discover-egypt-13ef7.firebasestorage.app",
  messagingSenderId: "200252880261",
  appId: "1:200252880261:web:b24b6b09151830b82580ec",
  measurementId: "G-R46HC715KF"
};

// Initialize Firebase
let app, auth, db, analytics;

try {
  // Initialize Firebase App
  app = firebase.initializeApp(firebaseConfig);

  // Initialize Firebase Services
  auth = firebase.auth();
  db = firebase.firestore();

  // Initialize Analytics (optional)
  if (typeof firebase.analytics === 'function') {
    analytics = firebase.analytics();
  }

  // Enable persistence for better UX
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch((error) => {
      console.warn('Persistence setup failed:', error);
    });

  // Configure Firestore settings
  db.settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
  });

  // Enable offline persistence
  db.enablePersistence()
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence enabled in first tab only');
      } else if (err.code === 'unimplemented') {
        console.warn('Browser doesn\'t support persistence');
      }
    });

  console.log('✅ Firebase initialized successfully');

} catch (error) {
  console.error('❌ Firebase initialization error:', error);
}

// Export Firebase instances
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDB = db;
window.firebaseAnalytics = analytics;
