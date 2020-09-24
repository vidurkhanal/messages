import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCr3y1gAwslVgFc03JkrNbeTlV36pPt18s",
  authDomain: "vidsociaal.firebaseapp.com",
  databaseURL: "https://vidsociaal.firebaseio.com",
  projectId: "vidsociaal",
  storageBucket: "vidsociaal.appspot.com",
  messagingSenderId: "679817015482",
  appId: "1:679817015482:web:3ed152a7578931d2d09283",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;