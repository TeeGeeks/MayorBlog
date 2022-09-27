import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJT3JI2Kuz5z6rcRzp8Szro6jT2yea6R8",
  authDomain: "mayorblog-e07bf.firebaseapp.com",
  projectId: "mayorblog-e07bf",
  storageBucket: "mayorblog-e07bf.appspot.com",
  messagingSenderId: "1072112509159",
  appId: "1:1072112509159:web:b754549aed488757050242",
  measurementId: "G-PNFWH1WK8T",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export async function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + ".png");

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });

  alert("Uploaded file!");
}

export function forgotPassword(email) {
  return sendPasswordResetEmail(auth, email, {
    url: "https://mayorblog-e07bf.web.app/login",
  });
}

export function resetPassword(oobCode, newPassword) {
  return confirmPasswordReset(auth, oobCode, newPassword);
}

export { auth, db, storage };
