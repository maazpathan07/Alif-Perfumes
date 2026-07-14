import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "./firebase";

export async function getDashboardStats() {
  const productsSnapshot =
    await getDocs(
      collection(db, "products")
    );

  const categoriesSnapshot =
    await getDocs(
      collection(db, "categories")
    );

  const products =
    productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

  return {
    totalProducts:
      products.length,

    totalCategories:
      categoriesSnapshot.size,

    featuredProducts:
      products.filter(
        (item) => item.featured
      ).length,
  };
}