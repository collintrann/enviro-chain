// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3u5DdYuUng2fDxv1jH2V8dvapPFibNfw",
  authDomain: "envirochain-47463.firebaseapp.com",
  projectId: "envirochain-47463",
  storageBucket: "envirochain-47463.appspot.com",
  messagingSenderId: "1032903087446",
  appId: "1:1032903087446:web:48802074b333845be572f7",
  measurementId: "G-ZNLLC8CTNQ",
  databaseURL: "https://envirochain-47463-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);
