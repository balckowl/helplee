import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCjaLKLWR-nBE0IHOnhl2ZyUuh1qdN76rY",
    authDomain: "helplee-27027.firebaseapp.com",
    projectId: "helplee-27027",
    storageBucket: "helplee-27027.appspot.com",
    messagingSenderId: "996632912879",
    appId: "1:996632912879:web:6f19fee9840cf4e3e3cc1a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db }