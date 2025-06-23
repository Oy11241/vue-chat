import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvHP-sAm024D3sVfnxqxPKRrvOjigAt5U",
  authDomain: "vue-chat-211c9.firebaseapp.com",
  projectId: "vue-chat-211c9",
  storageBucket: "vue-chat-211c9.firebasestorage.app",
  messagingSenderId: "99885577005",
  appId: "1:99885577005:web:ae880cde6d3844375759a4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
