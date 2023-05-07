import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA_n-F31-LDb98rf_ogvScVE2dGyOF0l3k",
  authDomain: "file-manager-51d7b.firebaseapp.com",
  projectId: "file-manager-51d7b",
  storageBucket: "file-manager-51d7b.appspot.com",
  messagingSenderId: "867036861720",
  appId: "1:867036861720:web:4512708c58f737c9f9ba6d"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;

