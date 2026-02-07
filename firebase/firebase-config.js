// firebase.js - Firebase Initialization

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDdJHBy-Ai8MBQQgFJCsolOE1VvCPwWOCQ",
    authDomain: "discover-egypt-13ef7.firebaseapp.com",
    projectId: "discover-egypt-13ef7",
    storageBucket: "discover-egypt-13ef7.firebasestorage.app",
    messagingSenderId: "200252880261",
    appId: "1:200252880261:web:b24b6b09151830b82580ec",
    measurementId: "G-R46HC715KF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };