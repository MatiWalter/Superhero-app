import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAJqde_ovC2oZJX4g6UWleQyJgciRuNgxI",
  authDomain: "superhero-app-66e3f.firebaseapp.com",
  projectId: "superhero-app-66e3f",
  storageBucket: "superhero-app-66e3f.appspot.com",
  messagingSenderId: "381503786285",
  appId: "1:381503786285:web:1ee0b55ae58414556457a4",
  measurementId: "G-12VQYVBSV6"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: 'select_account'
});

export {
  db,
  googleAuthProvider,
  githubAuthProvider,
  firebase
}