import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCxeH9gyj6xlduu2CX3CwBOVI7S7d65GH0",
    authDomain: "todo-9c53a.firebaseapp.com",
    projectId: "todo-9c53a",
    storageBucket: "todo-9c53a.firebasestorage.app",
    messagingSenderId: "527567732868",
    appId: "1:527567732868:web:719e46f73629c055d1c2d1"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };