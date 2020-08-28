import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
  apiKey: "AIzaSyDObSqxsvJ1wshkj6pa0xLcCKd1t8zOYB0",
    authDomain: "cambridge-7d6ed.firebaseapp.com",
    databaseURL: "https://cambridge-7d6ed.firebaseio.com",
    projectId: "cambridge-7d6ed",
    storageBucket: "cambridge-7d6ed.appspot.com",
    messagingSenderId: "846316095866",
    appId: "1:846316095866:web:9452ed3cd2cc1a4ae92ec3",
    measurementId: "G-FX3DS2JNFE"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };