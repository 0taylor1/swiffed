import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBEfGe7v4AhjttRxx4hoG2KSQaAyw9L84Y',
  authDomain: 'swiffed-idea-hacks-2023.firebaseapp.com',
  databaseURL: 'https://swiffed-idea-hacks-2023-default-rtdb.firebaseio.com/',
  projectId: 'swiffed-idea-hacks-2023',
  storageBucket: 'swiffed-idea-hacks-2023.appspot.com',
  messagingSenderId: '486038085197',
  appId: '1:486038085197:ios:2fda4e625aed336e044604',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
