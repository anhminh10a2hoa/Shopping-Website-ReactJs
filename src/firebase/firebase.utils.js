import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBKSaUzBbdjj7Be-wcLcfXDKHeLviXa9GM",
  authDomain: "clothing-db-256.firebaseapp.com",
  databaseURL: "https://clothing-db-256.firebaseio.com",
  projectId: "clothing-db-256",
  storageBucket: "clothing-db-256.appspot.com",
  messagingSenderId: "858265254190",
  appId: "1:858265254190:web:433147d4264443c8cd22bf",
  measurementId: "G-Y3RR6MSQ0M"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;