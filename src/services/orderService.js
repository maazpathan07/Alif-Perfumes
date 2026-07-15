import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const ordersCollection = collection(db, "orders");

/* ======================================
   Get All Orders / Enquiries
====================================== */
export async function getOrders() {
  try {
    const q = query(ordersCollection, orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      // Format timestamp if it exists
      timestamp: doc.data().timestamp?.toDate() || new Date(),
    }));
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

/* ======================================
   Create Order / Enquiry
====================================== */
export async function createOrder(orderData) {
  try {
    const docRef = await addDoc(ordersCollection, {
      ...orderData,
      status: "Pending",
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

/* ======================================
   Update Order Status
====================================== */
export async function updateOrderStatus(orderId, status) {
  try {
    const orderDoc = doc(db, "orders", orderId);
    await updateDoc(orderDoc, { status });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

/* ======================================
   Delete Order
====================================== */
export async function deleteOrder(orderId) {
  try {
    const orderDoc = doc(db, "orders", orderId);
    await deleteDoc(orderDoc);
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}
