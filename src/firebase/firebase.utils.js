import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCbG6FWw7ZR2_86SrKLjQp5AKVXdlfFiQg",
  authDomain: "crwn-db-e8d80.firebaseapp.com",
  projectId: "crwn-db-e8d80",
  storageBucket: "crwn-db-e8d80.appspot.com",
  messagingSenderId: "372588239546",
  appId: "1:372588239546:web:888c5f9bb4aaff8de34083",
  measurementId: "G-BKG3KHPG42"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
