import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDij_U3wy4wXHa8-mklnT02OBpUJajA9Z0",
  authDomain: "telegrammini.firebaseapp.com",
  projectId: "telegrammini",
  storageBucket: "telegrammini.appspot.com", // corretto
  messagingSenderId: "475772387381",
  appId: "1:475772387381:web:9987ed408378fa40e9717c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" }); // forza la scelta dell'account ad ogni login
export const db = getFirestore(app);
export const storage = getStorage(app);
