import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXbLMAuNEvuPeYNwRwomqQvbQuqZIhdcs",
  authDomain: "coding-rental-books.firebaseapp.com",
  projectId: "coding-rental-books",
  storageBucket: "coding-rental-books.appspot.com",
  messagingSenderId: "253680742230",
  appId: "1:253680742230:web:1cad43e82b7f0e3809b0f7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
