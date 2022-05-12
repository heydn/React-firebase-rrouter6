import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCfslOxMqZ-ASKQJVgeVkKji5GcAqO3_bY",
  authDomain: "cotizadorcp.firebaseapp.com",
  projectId: "cotizadorcp",
  storageBucket: "cotizadorcp.appspot.com",
  messagingSenderId: "714225348255",
  appId: "1:714225348255:web:69915ee173d36908713caa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};