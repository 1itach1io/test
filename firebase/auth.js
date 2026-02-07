// auth.js - Firebase Authentication Handling

import { auth } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// DOM Elements
const authBtn = document.getElementById('auth-btn');
const modal = document.getElementById('auth-modal');
const closeModal = document.getElementById('close-modal');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');
const logoutBtn = document.getElementById('logout');

// Open Modal
authBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Close Modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Login
loginBtn.addEventListener('click', () => {
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then(() => modal.style.display = 'none')
        .catch(error => alert(error.message));
});

// Sign Up
signupBtn.addEventListener('click', () => {
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then(() => modal.style.display = 'none')
        .catch(error => alert(error.message));
});

// Logout
logoutBtn.addEventListener('click', () => {
    signOut(auth).catch(error => alert(error.message));
});

// Auth State Listener (preserve session)
onAuthStateChanged(auth, user => {
    if (user) {
        authBtn.textContent = 'Profile';
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
    } else {
        authBtn.textContent = 'Login / Sign Up';
        loginBtn.style.display = 'block';
        signupBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
});