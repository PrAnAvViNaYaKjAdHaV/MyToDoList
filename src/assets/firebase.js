import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB1Ik2vUyVgmQNgEFICN9gmxRq7T2qFH0g",
  authDomain: "todolist-b762d.firebaseapp.com",
  projectId: "todolist-b762d",
  storageBucket: "todolist-b762d.appspot.com",
  messagingSenderId: "696021993695",
  appId: "1:696021993695:web:0ff1104eb1e7783db2016a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const singIn = async () => {
  try {
    await signInWithPopup(auth, provider);
    const user = auth.currentUser.uid;
    const User = await getDoc(doc(db, "UserList", user));
    if (!User.exists()) {
      await setDoc(doc(db, "UserList", user), {
        todolist: ["Hii", "WelCome to Todo list"],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const SingOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export const Uid = () => {
  return auth.currentUser.uid;
};
