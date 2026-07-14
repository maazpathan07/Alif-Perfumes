import { useEffect, useState } from "react";

import {
  Pencil,
  Trash2,
  Star,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getTestimonials,
  deleteTestimonial,
} from "../../../../services/testimonialService";

import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";
import EmptyState from "../../../UI/EmptyState/EmptyState";
import ConfirmModal from "../../../UI/ConfirmModal/ConfirmModal";

import styles from "./TestimonialTable.module.css";

function TestimonialTable({ onEdit }) {
  const [testimonials, setTestimonials] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    try {

      const data =
        await getTestimonials();

      setTestimonials(data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load testimonials."
      );

    } finally {

      setLoading(false);

    }
  }

  async function handleDelete() {

    if (!deleteId) return;

    try {

      await deleteTestimonial(deleteId);

      setTestimonials((prev) =>
        prev.filter(
          (item) =>
            item.id !== deleteId
        )
      );

      toast.success(
        "Testimonial deleted successfully."
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Something went wrong."
      );

    } finally {

      setShowModal(false);

      setDeleteId(null);

    }

  }

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <LoadingSpinner text="Loading Testimonials..." />
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className={styles.wrapper}>
        <EmptyState
          title="No Testimonials Found"
          subtitle="Customer reviews will appear here after you add them."
        />
      </div>
    );
  }

  return (
    <>
      <div className={styles.wrapper}>

        <table className={styles.table}>

          <thead>

            <tr>

              <th>Photo</th>

              <th>Name</th>

              <th>City</th>

              <th>Rating</th>

              <th>Review</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {testimonials.map((testimonial) => (

              <tr key={testimonial.id}>

                <td>

                  <img
                    src={
                      testimonial.image ||
                      "/placeholder-user.png"
                    }
                    alt={testimonial.name}
                    className={styles.photo}
                  />

                </td>

                <td>{testimonial.name}</td>

                <td>{testimonial.city}</td>

                <td>

                  <div className={styles.rating}>

                    <Star
                      size={16}
                      fill="currentColor"
                    />

                    {testimonial.rating}

                  </div>

                </td>

                <td>{testimonial.review}</td>

                <td>

                  <div className={styles.actions}>

                    <button
                      onClick={() =>
                        onEdit(testimonial)
                      }
                      title="Edit Testimonial"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => {

                        setDeleteId(
                          testimonial.id
                        );

                        setShowModal(true);

                      }}
                      title="Delete Testimonial"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <ConfirmModal
        open={showModal}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => {

          setShowModal(false);

          setDeleteId(null);

        }}
      />

    </>
  );
}

export default TestimonialTable;