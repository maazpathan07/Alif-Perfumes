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
  updateTestimonial,
} from "../../../../services/testimonialService";
import { deleteImage } from "../../../../services/storageService";

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
    let active = true;
    getTestimonials()
      .then((data) => {
        if (active) {
          setTestimonials(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load testimonials.");
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);


  async function handleDelete() {
    if (!deleteId) return;

    try {
      const target = testimonials.find((item) => item.id === deleteId);
      if (target?.image) {
        await deleteImage(target.image);
      }

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

  const handleToggleActive = async (testimonial) => {
    const updatedActive = testimonial.isActive === false ? false : true;
    const nextVal = !updatedActive;
    try {
      setTestimonials((prev) =>
        prev.map((t) => (t.id === testimonial.id ? { ...t, isActive: nextVal } : t))
      );
      await updateTestimonial(testimonial.id, { isActive: nextVal });
      toast.success(`Review visibility is now ${nextVal ? "Active" : "Inactive"}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update visibility status.");
      setTestimonials((prev) =>
        prev.map((t) => (t.id === testimonial.id ? { ...t, isActive: updatedActive } : t))
      );
    }
  };

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

              <th>Visibility</th>

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

                <td style={{ fontWeight: 600 }}>{testimonial.name}</td>

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
                  <button
                    onClick={() => handleToggleActive(testimonial)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    title="Click to toggle Review visibility"
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        borderRadius: "99px",
                        fontSize: "11px",
                        fontWeight: "700",
                        background: testimonial.isActive !== false ? "#dcfce7" : "#fee2e2",
                        color: testimonial.isActive !== false ? "#16a34a" : "#dc2626"
                      }}
                    >
                      {testimonial.isActive !== false
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </button>
                </td>

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