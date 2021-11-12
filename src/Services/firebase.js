// import * as firebase from 'firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDofsuemXE0-R3wEpCrhEi2J94mzIRU0Q8",
  authDomain: "admission-270c8.firebaseapp.com",
  projectId: "admission-270c8",
  storageBucket: "admission-270c8.appspot.com",
  messagingSenderId: "666914927508",
  appId: "1:666914927508:web:58b2634b2c4047189c5581",
  measurementId: "G-99YZZ309FT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase }