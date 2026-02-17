/**
 * Firebase Configuration
 * =====================
 * ⚠️ إرشادات الأمان المهمة:
 * 
 * 1. هذه المفاتيح حالياً مكشوفة في الكود - يجب تأمينها!
 * 2. للحماية، افتح Firebase Console واذهب إلى:
 *    - Project Settings > General
 *    - أسفل "Your apps" > اضغط على تطبيق الويب
 *    - في قسم "App restrictions" > قم بتفعيل:
 *      ✅ Domain restrictions (أضف النطاقات المسموحة فقط)
 *      ✅ API restrictions (فعّل القيود على API keys)
 * 
 * 3. تأمين قاعدة البيانات - أضف Firebase Security Rules:
 * {
 *   "rules": {
 *     "users": {
 *       "$uid": {
 *         ".read": "$uid === auth.uid",
 *         ".write": "$uid === auth.uid"
 *       }
 *     },
 *     ".read": "auth != null",
 *     ".write": "auth != null"
 *   }
 * }
 * 
 * 4. للإنتاج، استخدم Environment Variables أو Backend Proxy
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
    console.log('✅ Firebase Analytics initialized');
  }
  
  // Enable persistence for better UX
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      console.log('✅ Auth persistence enabled');
    })
    .catch((error) => {
      console.warn('⚠️ Persistence setup failed:', error.message);
    });
  
  // Configure Firestore settings
  db.settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
  });
  
  // Enable offline persistence
  db.enablePersistence()
    .then(() => {
      console.log('✅ Firestore offline persistence enabled');
    })
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('⚠️ Multiple tabs open, persistence enabled in first tab only');
      } else if (err.code === 'unimplemented') {
        console.warn('⚠️ Browser doesn\'t support persistence');
      } else {
        console.warn('⚠️ Firestore persistence error:', err.message);
      }
    });
  
  console.log('✅ Firebase initialized successfully');
  
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  // عرض رسالة للمستخدم في حالة فشل التهيئة
  if (typeof showNotification === 'function') {
    showNotification('خطأ في الاتصال بقاعدة البيانات. بعض الميزات قد لا تعمل.', 'error');
  }
}

// Export Firebase instances
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDB = db;
window.firebaseAnalytics = analytics;

// التحقق من حالة الاتصال
window.addEventListener('online', () => {
  console.log('🌐 تم استعادة الاتصال بالإنترنت');
});

window.addEventListener('offline', () => {
  console.log('📴 فقدان الاتصال بالإنترنت - الوضع غير المتصل');
});
