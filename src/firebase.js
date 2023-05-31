import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDx2Fekt2nif2Ip0UzHIpS9ns3QFX5XlhE",

    authDomain: "snapcat-e6711.firebaseapp.com",
  
    projectId: "snapcat-e6711",
  
    storageBucket: "snapcat-e6711.appspot.com",

    databaseURL: "https://snapcat-e6711-default-rtdb.europe-west1.firebasedatabase.app",
  
    messagingSenderId: "233582366499",
  
    appId: "1:233582366499:web:092aed1c2e00370ca0c696",
  
    measurementId: "G-XEFTFSY3BJ"
};

// Use this to initialize the firebase App
const firebaseApp =firebase.initializeApp(firebaseConfig);

// Use these for auth

const auth = firebase.auth();

export {auth};
export const db = getDatabase(firebaseApp);