//Firebase code

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDr0ft7AAk1mCmXKqIUfjSUZDc_8uBSC4Q",
  authDomain: "kej-shots.firebaseapp.com",
  databaseURL: "https://kej-shots-default-rtdb.firebaseio.com",
  projectId: "kej-shots",
  storageBucket: "kej-shots.firebasestorage.app",
  messagingSenderId: "1080451951468",
  appId: "1:1080451951468:web:fedc304301308e5cce2149",
  measurementId: "G-M1LLN3QEG0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);