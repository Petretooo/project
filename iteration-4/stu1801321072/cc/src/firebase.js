import * as firebase from "firebase/app";
import "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDeWfwn0P0AECmyb_k_BrjJWh-eYLkKZ0I",
  authDomain: "candicecock-7375c.firebaseapp.com",
  databaseURL: "https://candicecock-7375c-default-rtdb.firebaseio.com",
  projectId: "candicecock-7375c",
  storageBucket: "candicecock-7375c.appspot.com",
  messagingSenderId: "391705122887",
  appId: "1:391705122887:web:3644ad7faa2c33ce3f7962",
  measurementId: "G-2RCGBWVFCP",
});

export const app = getAuth(firebaseConfig);
export const storage = getStorage(firebaseConfig);
