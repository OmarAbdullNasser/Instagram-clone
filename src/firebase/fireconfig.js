import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDStkVoCCAQc2Retx9HkExdizCMXb3HMs",
  authDomain: "instagram-clone-13bc9.firebaseapp.com",
  projectId: "instagram-clone-13bc9",
  storageBucket: "instagram-clone-13bc9.appspot.com",
  messagingSenderId: "791855490822",
  appId: "1:791855490822:web:6e3e18e6ae0da469a9a087",
};

//init firebase
const app = initializeApp(firebaseConfig);

//init servies
const db = getFirestore();
const auth = getAuth(app);
const storage = getStorage(app);
const Timestamp = serverTimestamp();
export { db, auth, storage, Timestamp };
