// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDEDwXkJ4ShxlZEdU_ix6U9N9ESDD0Qhf4",
    authDomain: "chitchat-18697.firebaseapp.com",
    projectId: "chitchat-18697",
    storageBucket: "chitchat-18697.appspot.com",
    messagingSenderId: "538793398911",
    appId: "1:538793398911:web:f384b6a4e56a911d00654a",
    measurementId: "G-PPHF1ZCW9B"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
