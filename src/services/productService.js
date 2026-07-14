import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
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