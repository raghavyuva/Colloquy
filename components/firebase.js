import React from "react";
import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyChJ0ge-LvPuLpoN7KCNqTE7g7XSL2jJKY",
  authDomain: "vtyuva-dd9cb.firebaseapp.com",
  projectId: "vtyuva-dd9cb",
  storageBucket: "vtyuva-dd9cb.appspot.com",
  messagingSenderId: "742298040786",
  appId: "1:742298040786:web:88378266062e3820ec700b",
  measurementId: "G-JGEPSPEM8W"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
firebase.firestore().settings({ experimentalForceLongPolling: true }); //add this..


export  {firebase}; 
