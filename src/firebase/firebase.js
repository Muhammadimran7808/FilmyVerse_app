
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD_FE5dyhjsDi8KhsSCPFDp3rNrgXZ9jBE",
    authDomain: "filmyverse-1c888.firebaseapp.com",
    projectId: "filmyverse-1c888",
    storageBucket: "filmyverse-1c888.appspot.com",
    messagingSenderId: "1017135473254",
    appId: "1:1017135473254:web:72255271a46eeab3b203a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const moviesCollectionRef = collection(db, "movies")
export const reviewsCollectionRef = collection(db,"reviews")

export default app;