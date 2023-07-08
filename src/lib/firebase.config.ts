import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'



const firebaseConfig = {
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
  // measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  apiKey: 'AIzaSyBTyUN8PPMtD6LHVZkzhvHDDJI3XlmoRzM',
  authDomain: 'app-masters-c40c6.firebaseapp.com',
  projectId: 'app-masters-c40c6',
  storageBucket: 'app-masters-c40c6.appspot.com',
  messagingSenderId: '382443386439',
  appId: '1:382443386439:web:28f8887e731092a2aba362',
  measurementId: 'G-11ND2FYPRH'

}

export const firebase_APP: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(firebase_APP)