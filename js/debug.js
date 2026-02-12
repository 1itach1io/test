/* ==========================================
   DEBUG & ERROR TRACKING
   مساعد تصحيح الأخطاء - نسخة مبسطة
   ========================================== */

console.log('🔍 Starting debug checks...');

// Check Firebase
setTimeout(() => {
    console.log('📦 Checking Firebase...');
    if (typeof firebase !== 'undefined') {
        console.log('✅ Firebase SDK loaded');
        if (firebase.auth) {
            console.log('✅ Firebase Auth initialized');
        } else {
            console.error('❌ Firebase Auth NOT initialized');
        }
        if (firebase.firestore) {
            console.log('✅ Firestore initialized');
        } else {
            console.error('❌ Firestore NOT initialized');
        }
    } else {
        console.error('❌ Firebase SDK NOT loaded');
    }

    console.log('🔍 Debug checks complete!');
}, 2000);

// Add global error handler
window.addEventListener('error', function(e) {
    console.error('🚨 Global Error:', e.error);
});

console.log('✅ Debug script loaded - Login buttons are now simple links to login.html');

