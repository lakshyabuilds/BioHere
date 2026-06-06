import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC2evYs-g83dTZdbGjsgoKleDQmRV4RdmU",
  authDomain: "pi-store-c0f97.firebaseapp.com",
  projectId: "pi-store-c0f97",
  storageBucket: "pi-store-c0f97.firebasestorage.app",
  messagingSenderId: "535526924822",
  appId: "1:535526924822:web:c56728a6ffccf02f1e0b37",
  measurementId: "G-QGZNPKETW0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed", error);
  }
};
