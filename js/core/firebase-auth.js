/* ==========================================
   DISCOVER EGYPT - FIREBASE AUTHENTICATION
   Complete authentication system with Firebase
   ========================================== */

import { auth, db } from '../../firebase/firebase-config.js';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail,
    setPersistence,
    browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Set persistence to LOCAL (stays logged in across sessions)
setPersistence(auth, browserLocalPersistence);

/* ==========================================
   USER DATA MANAGEMENT
   ========================================== */

/**
 * Save or update user data in Firestore
 */
async function saveUserData(user, additionalData = {}) {
    try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || additionalData.displayName || 'User',
            photoURL: user.photoURL || additionalData.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=4F46E5&color=fff`,
            lastLogin: serverTimestamp(),
            ...additionalData
        };

        if (!userDoc.exists()) {
            // New user - create document with creation date
            userData.createdAt = serverTimestamp();
            await setDoc(userRef, userData);
        } else {
            // Existing user - update only specific fields
            await updateDoc(userRef, {
                lastLogin: serverTimestamp(),
                displayName: userData.displayName,
                photoURL: userData.photoURL
            });
        }

        return userData;
    } catch (error) {
        console.error('Error saving user data:', error);
        throw error;
    }
}

/**
 * Get user data from Firestore
 */
async function getUserData(uid) {
    try {
        const userRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            return userDoc.data();
        }
        return null;
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
}

/* ==========================================
   AUTHENTICATION FUNCTIONS
   ========================================== */

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(email, password, displayName) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update profile with display name
        await updateProfile(user, {
            displayName: displayName,
            photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=4F46E5&color=fff`
        });

        // Save user data to Firestore
        await saveUserData(user, { displayName });

        return { success: true, user };
    } catch (error) {
        console.error('Sign up error:', error);
        return {
            success: false,
            error: getErrorMessage(error.code)
        };
    }
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update user data
        await saveUserData(user);

        return { success: true, user };
    } catch (error) {
        console.error('Sign in error:', error);
        return {
            success: false,
            error: getErrorMessage(error.code)
        };
    }
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Save user data to Firestore
        await saveUserData(user);

        return { success: true, user };
    } catch (error) {
        console.error('Google sign in error:', error);
        return {
            success: false,
            error: getErrorMessage(error.code)
        };
    }
}

/**
 * Sign out
 */
export async function signOutUser() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error('Sign out error:', error);
        return {
            success: false,
            error: getErrorMessage(error.code)
        };
    }
}

/**
 * Send password reset email
 */
export async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
    } catch (error) {
        console.error('Password reset error:', error);
        return {
            success: false,
            error: getErrorMessage(error.code)
        };
    }
}

/**
 * Get current user
 */
export function getCurrentUser() {
    return auth.currentUser;
}

/**
 * Listen to authentication state changes
 */
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in, get full user data from Firestore
            const userData = await getUserData(user.uid);
            callback(user, userData);
        } else {
            // User is signed out
            callback(null, null);
        }
    });
}

/* ==========================================
   HELPER FUNCTIONS
   ========================================== */

/**
 * Get user-friendly error messages
 */
function getErrorMessage(errorCode) {
    const errorMessages = {
        'auth/email-already-in-use': 'هذا البريد الإلكتروني مستخدم بالفعل / This email is already in use',
        'auth/invalid-email': 'البريد الإلكتروني غير صالح / Invalid email address',
        'auth/operation-not-allowed': 'العملية غير مسموح بها / Operation not allowed',
        'auth/weak-password': 'كلمة المرور ضعيفة جداً (6 أحرف على الأقل) / Password is too weak (minimum 6 characters)',
        'auth/user-disabled': 'تم تعطيل هذا الحساب / This account has been disabled',
        'auth/user-not-found': 'المستخدم غير موجود / User not found',
        'auth/wrong-password': 'كلمة المرور خاطئة / Wrong password',
        'auth/too-many-requests': 'محاولات كثيرة جداً. حاول لاحقاً / Too many requests. Try again later',
        'auth/network-request-failed': 'خطأ في الاتصال بالشبكة / Network error',
        'auth/popup-closed-by-user': 'تم إغلاق النافذة المنبثقة / Popup closed by user',
        'auth/cancelled-popup-request': 'تم إلغاء الطلب / Request cancelled'
    };

    return errorMessages[errorCode] || 'حدث خطأ غير متوقع / An unexpected error occurred';
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function isValidPassword(password) {
    return password.length >= 6;
}

/**
 * Get user initials for avatar
 */
export function getUserInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/* ==========================================
   USER PROFILE FUNCTIONS
   ========================================== */

/**
 * Update user profile
 */
export async function updateUserProfile(updates) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('No user logged in');

        // Update Firebase Auth profile
        if (updates.displayName || updates.photoURL) {
            await updateProfile(user, {
                displayName: updates.displayName || user.displayName,
                photoURL: updates.photoURL || user.photoURL
            });
        }

        // Update Firestore document
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });

        return { success: true };
    } catch (error) {
        console.error('Error updating profile:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Get user statistics (for future features)
 */
export async function getUserStats(uid) {
    try {
        const userData = await getUserData(uid);
        if (!userData) return null;

        // Here you can add more stats from different collections
        return {
            memberSince: userData.createdAt,
            lastLogin: userData.lastLogin,
            // Add more stats as needed (favorites, reviews, etc.)
        };
    } catch (error) {
        console.error('Error getting user stats:', error);
        return null;
    }
}

// Export auth instance for direct use if needed
export { auth };
