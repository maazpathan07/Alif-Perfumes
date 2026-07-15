import { initializeApp } from "firebase/app";

import {
  getAuth,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

import {
  getStorage,
} from "firebase/storage";

import firebaseConfig from "../config/firebaseConfig";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Tab band ho to logout — har baar login karna padega
setPersistence(auth, browserSessionPersistence);

const db = getFirestore(app);

const storage = getStorage(app);

export {
  app,
  auth,
  db,
  storage,
};