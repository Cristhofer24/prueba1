// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhH9YWiSAeChD9FYpKlTH3RG3d7yLTBqc",
  authDomain: "appprueba-f57de.firebaseapp.com",
  databaseURL: "https://appprueba-f57de-default-rtdb.firebaseio.com",
  projectId: "appprueba-f57de",
  storageBucket: "appprueba-f57de.appspot.com",
  messagingSenderId: "928333993002",
  appId: "1:928333993002:web:08b1313482c44efbde5f53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);