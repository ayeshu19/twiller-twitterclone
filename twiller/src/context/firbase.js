// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD32lUZc2vfAA-KaXXXeKmf84Lj1k0zHqI",
  authDomain: "twiller-da547.firebaseapp.com",
  projectId: "twiller-da547",
  storageBucket: "twiller-da547.firebasestorage.app",
  messagingSenderId: "111165639872",
  appId: "1:111165639872:web:06345154951a5f2124f125",
  measurementId: "G-YDDGMBG8W1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app 
//const analytics = getAnalytics(app);
