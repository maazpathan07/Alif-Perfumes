import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

import { db } from "./firebase";

const productsRef = collection(db, "products");

/* ==========================
   Get Products
========================== */

export async function getProducts() {
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/* ==========================
   Get Product By ID
========================== */

export async function getProductById(id) {
  const productRef = doc(db, "products", id);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

/* ==========================
   Get Products By Category
========================== */

export async function getProductsByCategory(category) {
  const q = query(productsRef, where("category", "==", category));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/* ==========================
   Get Featured Products
========================== */

export async function getFeaturedProducts() {
  const q = query(productsRef, where("featured", "==", true));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/* ==========================
   Add Product
========================== */

export async function addProduct(product) {
  return await addDoc(productsRef, product);
}

/* ==========================
   Update Product
========================== */

export async function updateProduct(id, data) {
  const productRef = doc(db, "products", id);

  return await updateDoc(productRef, data);
}

/* ==========================
   Delete Product
========================== */

export async function deleteProduct(id) {
  const productRef = doc(db, "products", id);

  await deleteDoc(productRef);
}