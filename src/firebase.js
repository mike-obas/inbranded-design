import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

const app = initializeApp({
  apiKey: "Replace with appropriate API_KEY",
  authDomain: "Replace with appropriate AUTH_DOMAIN",
  projectId: "Replace with appropriate PROJECT_ID",
  storageBucket: "Replace with appropriate STORAGE_BUCKET",
  messagingSenderId: "Replace with appropriate MESSAGING_SENDER_ID",
  appId: "Replace with appropriate APP_ID"
})

const auth = getAuth(app);
export { auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
}
export default app
