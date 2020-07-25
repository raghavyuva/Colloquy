import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyDecKLhO9c5PnqFoBWenlu9TFmYtQFSAi8",
    authDomain: "todo-413d6.firebaseapp.com",
    databaseURL: "https://todo-413d6.firebaseio.com",
    projectId: "todo-413d6",
    storageBucket: "todo-413d6.appspot.com",
    messagingSenderId: "729915356936",
    appId: "1:729915356936:web:48839217ceec1fb77e1ebd",
    measurementId: "G-7B3FM75L82"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };