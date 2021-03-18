import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDFNIKw1GZpI3U0RbWXaBi6nK6JnSDRblg",
    authDomain: "greens-5a2b0.firebaseapp.com",
    projectId: "greens-5a2b0",
    storageBucket: "greens-5a2b0.appspot.com",
    messagingSenderId: "1004850792330",
    appId: "1:1004850792330:web:da41ef9195ee38374fea73",
    measurementId: "G-S6FKG6F85P"
}

if (! firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Store exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillisecounds = firebase.firestore.Timestamp.fromMillis;


/**
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function docToJson(doc) {
    const data = doc.data();
    return {
        id: doc.id,
        ...data,
    }
}