
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
    projectId: `${process.env.REACT_APP_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_MESSAGINGSENDER_ID}`,
    appId: `${process.env.REACT_APP_APP_ID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const moviesCollectionRef = collection(db, "movies")
export const reviewsCollectionRef = collection(db,"reviews")
export const userCollectionRef = collection(db, "users")

export default app;