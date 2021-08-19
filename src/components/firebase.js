//jshint esversion:6

import firebase from "firebase";
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "control-your-money-spend.firebaseapp.com",
  projectId: "control-your-money-spend",
  storageBucket: "control-your-money-spend.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGE_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-K7FR2HZLC0"
};

// initialze our app & database and activate auth system with provider which will handle login and register process. 
// const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) :  firebase.app();
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export {auth, provider, firebaseApp};

export default db;