// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF_TOMFBSV35g49fMWRePiPgQPIYCGdAM",
  authDomain: "chat-app-dep11.firebaseapp.com",
  projectId: "chat-app-dep11",
  storageBucket: "chat-app-dep11.appspot.com",
  messagingSenderId: "623270340047",
  appId: "1:623270340047:web:b38939f7b649c5df7cdeba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {app, auth};