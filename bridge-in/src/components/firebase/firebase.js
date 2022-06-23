// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAlVlG1kyBBADSnsNwrU_aQ-XiOqOQDGXw",

  authDomain: "bridge-in.firebaseapp.com",

  projectId: "bridge-in",

  storageBucket: "bridge-in.appspot.com",

  messagingSenderId: "639258562322",

  appId: "1:639258562322:web:9143835496fffc54fc2dcb",

  measurementId: "G-1EBVVMLWDP",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
