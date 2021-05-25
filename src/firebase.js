import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = firebase.initializeApp({
    apiKey: process.env.REACT_APP_MEDIA_API_KEY,
    authDomain: process.env.REACT_APP_MEDIA_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_MEDIA_PROJECT_ID,
    storageBucket: process.env.REACT_APP_MEDIA_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MEDIA_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_MEDIA_APP_ID
})

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const storage = firebase.storage();
const auth = firebase.auth();
export {auth, storage, firebase as default};

