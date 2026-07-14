import {
  useEffect,
  useState,
} from "react";

import {
  addTestimonial,
  updateTestimonial,
} from "../../../../services/testimonialService";

import styles from "./TestimonialForm.module.css";

import toast from "react-hot-toast";

function TestimonialForm({
  testimonial,
  onSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      city: "",
      rating: 5,
      review: "",
      image: "",
    });

  useEffect(() => {
    if (!testimonial) return;

    setFormData({
      name: testimonial.name || "",
      city: testimonial.city || "",
      rating: testimonial.rating || 5,
      review: testimonial.review || "",
      image: testimonial.image || "",
    });
  }, [testimonial]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "rating"
          ? Number(value)
          : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      city: "",
      rating: 5,
      review: "",
      image: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      if (testimonial) {

        await updateTestimonial(
          testimonial.id,
          formData
        );

        toast.success("Testimonial updated successfully!");

      } else {

        await addTestimonial({
          ...formData,
          createdAt: new Date(),
        });

        toast.success("Testimonial added successfully!");
        

      }

      resetForm();

      onSuccess?.();

    } catch (error) {

      console.error(error);

      toast.error("Something went wrong.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >

      <input
        type="text"
        name="name"
        placeholder="Customer Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />

      <input
        type="number"
        name="rating"
        min="1"
        max="5"
        value={formData.rating}
        onChange={handleChange}
        required
      />

      <textarea
        rows="5"
        name="review"
        placeholder="Customer Review"
        value={formData.review}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="image"
        placeholder="Photo URL"
        value={formData.image}
        onChange={handleChange}
      />

      <button
        className={styles.button}
        type="submit"
        disabled={loading}
      >
        {loading
          ? testimonial
            ? "Updating..."
            : "Saving..."
          : testimonial
          ? "Update Testimonial"
          : "Save Testimonial"}
      </button>

    </form>
  );
}

export default TestimonialForm;