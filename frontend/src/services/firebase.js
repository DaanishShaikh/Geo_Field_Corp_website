import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2z3ouN62xKaVe3dbyTyspHPWodXEax2s",
  authDomain: "geofieldcorp.firebaseapp.com",
  projectId: "geofieldcorp",
  storageBucket: "geofieldcorp.firebasestorage.app",
  messagingSenderId: "575542458871",
  appId: "1:575542458871:web:792bbd1296d7203f91d6f2",
  measurementId: "G-V76KKQJ7BL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
