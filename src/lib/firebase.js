import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyDJohH-HOX9_1h5xzg85xGr2BT0CA8K8tk',
  authDomain: 'instagram-a7410.firebaseapp.com',
  projectId: 'instagram-a7410',
  storageBucket: 'instagram-a7410.appspot.com',
  messagingSenderId: '555423940662',
  appId: '1:555423940662:web:4cd6d27fe4f09768cad897'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
