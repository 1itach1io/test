/* ==========================================
   FIREBASE CONFIGURATION
   Real Firebase setup for authentication
   ========================================== */

// Firebase configuration
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
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = firebase.auth();

// Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Export for use in other files
window.firebaseAuth = auth;
window.googleProvider = googleProvider;

console.log('✅ Firebase initialized successfully');
