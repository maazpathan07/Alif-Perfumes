import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "./firebase";

export async function getDashboardStats() {
  const productsSnapshot = await getDocs(collection(db, "products"));
  const categoriesSnapshot = await getDocs(collection(db, "categories"));
  const ordersSnapshot = await getDocs(collection(db, "orders"));
  const testimonialsSnapshot = await getDocs(collection(db, "testimonials"));

  return {
    totalProducts: productsSnapshot.size,
    totalCategories: categoriesSnapshot.size,
    totalOrders: ordersSnapshot.size,
    totalTestimonials: testimonialsSnapshot.size,
  };
}