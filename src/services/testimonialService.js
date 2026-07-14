import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

const testimonialsRef = collection(
  db,
  "testimonials"
);

/* ==========================
   Get Testimonials
========================== */

export async function getTestimonials() {
  const snapshot = await getDocs(
    testimonialsRef
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/* ==========================
   Add Testimonial
========================== */

export async function addTestimonial(
  testimonial
) {
  return await addDoc(
    testimonialsRef,
    testimonial
  );
}

/* ==========================
   Update Testimonial
========================== */

export async function updateTestimonial(
  id,
  data
) {
  const testimonialRef = doc(
    db,
    "testimonials",
    id
  );

  return await updateDoc(
    testimonialRef,
    data
  );
}

/* ==========================
   Delete Testimonial
========================== */

export async function deleteTestimonial(
  id
) {
  const testimonialRef = doc(
    db,
    "testimonials",
    id
  );

  await deleteDoc(
    testimonialRef
  );
}