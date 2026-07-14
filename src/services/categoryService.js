import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

const categoriesRef = collection(
  db,
  "categories"
);

/* ==========================
   Get Categories
========================== */

export async function getCategories() {
  const snapshot = await getDocs(
    categoriesRef
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/* ==========================
   Add Category
========================== */

export async function addCategory(
  category
) {
  return await addDoc(
    categoriesRef,
    category
  );
}

/* ==========================
   Update Category
========================== */

export async function updateCategory(
  id,
  data
) {
  const categoryRef = doc(
    db,
    "categories",
    id
  );

  return await updateDoc(
    categoryRef,
    data
  );
}

/* ==========================
   Delete Category
========================== */

export async function deleteCategory(
  id
) {
  const categoryRef = doc(
    db,
    "categories",
    id
  );

  await deleteDoc(categoryRef);
}