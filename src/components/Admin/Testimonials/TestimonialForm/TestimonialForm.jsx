import {
  useEffect,
  useState,
} from "react";

import {
  addTestimonial,
  updateTestimonial,
} from "../../../../services/testimonialService";

import {
  uploadImage,
  deleteImage,
} from "../../../../services/storageService";

import styles from "./TestimonialForm.module.css";

import toast from "react-hot-toast";

function TestimonialForm({
  testimonial,
  onSuccess,
  setIsDirty,
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
      isActive: true,
    });

  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!setIsDirty) return;

    let dirty;
    if (testimonial) {
      const nameChanged = (formData.name || "") !== (testimonial.name || "");
      const cityChanged = (formData.city || "") !== (testimonial.city || "");
      const ratingChanged = Number(formData.rating || 5) !== Number(testimonial.rating || 5);
      const reviewChanged = (formData.review || "") !== (testimonial.review || "");
      const activeChanged = (formData.isActive ?? true) !== (testimonial.isActive ?? true);
      const imageChanged = !!imageFile;

      dirty = nameChanged || cityChanged || ratingChanged || reviewChanged || activeChanged || imageChanged;
    } else {
      dirty = !!formData.name || !!formData.city || !!formData.review || !formData.isActive || !!imageFile;
    }

    setIsDirty(dirty);
  }, [formData, imageFile, testimonial, setIsDirty]);


  useEffect(() => {
    if (!testimonial) return;

    Promise.resolve().then(() => {
      setFormData({
        name: testimonial.name || "",
        city: testimonial.city || "",
        rating: testimonial.rating || 5,
        review: testimonial.review || "",
        image: testimonial.image || "",
        isActive: testimonial.isActive ?? true,
      });
      setImageFile(null);
    });
  }, [testimonial]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "rating"
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
      isActive: true,
    });
    setImageFile(null);
    setUploadProgress(0);
    setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (Number(formData.rating) < 1 || Number(formData.rating) > 5) {
        toast.error("Rating must be between 1 and 5.");
        setLoading(false);
        return;
      }

      let imageUrl = formData.image;

      if (imageFile) {
        if (testimonial?.image && testimonial.image.startsWith("http")) {
          try {
            await deleteImage(testimonial.image);
          } catch (err) {
            console.warn("Could not delete old image:", err);
          }
        }

        setStatus("Uploading");
        imageUrl = await uploadImage(
          imageFile,
          "testimonials",
          (progress) => {
            setUploadProgress(progress);
          }
        );
        setStatus("Saving");
      }

      const testimonialData = {
        name: formData.name,
        city: formData.city,
        rating: Number(formData.rating),
        review: formData.review,
        image: imageUrl,
        isActive: formData.isActive,
      };

      if (testimonial) {

        await updateTestimonial(
          testimonial.id,
          testimonialData
        );

        toast.success("Testimonial updated successfully!");

      } else {

        await addTestimonial({
          ...testimonialData,
          createdAt: new Date(),
        });

        toast.success("Testimonial added successfully!");

      }

      resetForm();

      onSuccess?.();

    } catch (error) {

      console.error(error);

      toast.error(error.message || "Something went wrong.");

    } finally {

      setLoading(false);
      setStatus("");
      setUploadProgress(0);

    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >

      <label htmlFor="test-name" className="visually-hidden">Customer Name</label>
      <input
        id="test-name"
        type="text"
        name="name"
        placeholder="Customer Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="test-city" className="visually-hidden">City</label>
      <input
        id="test-city"
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />

      <label htmlFor="test-rating" className="visually-hidden">Rating (1 to 5)</label>
      <input
        id="test-rating"
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        min="1"
        max="5"
        value={formData.rating}
        onChange={handleChange}
        required
      />

      <label htmlFor="test-review" className="visually-hidden">Customer Review</label>
      <textarea
        id="test-review"
        rows="5"
        name="review"
        placeholder="Customer Review"
        value={formData.review}
        onChange={handleChange}
        required
      />

      <label htmlFor="test-image-url" className="visually-hidden">Photo URL (Fallback)</label>
      <input
        id="test-image-url"
        type="text"
        name="image"
        placeholder="Photo URL (Fallback)"
        value={formData.image}
        onChange={handleChange}
      />

      <div className={styles.fileInputGroup}>
        <label htmlFor="test-image-file">Or Upload Testimonial Photo File:</label>
        <input
          id="test-image-file"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>

      {(imageFile || (formData.image && formData.image.trim() !== "")) && (
        <div className={styles.previewContainer}>
          <img
            src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
            alt="Testimonial photo preview"
            className={styles.preview}
          />
          {imageFile && (
            <button
              type="button"
              onClick={() => setImageFile(null)}
              className={styles.removePreview}
              aria-label="Remove photo file"
            >
              Remove
            </button>
          )}
        </div>
      )}

      {loading && status === "Uploading" && (
        <div
          className={styles.progressContainer}
          role="progressbar"
          aria-valuenow={uploadProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Photo upload progress"
        >
          <div className={styles.progressTop}>
            <span>Uploading Image...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{
                width: `${uploadProgress}%`,
              }}
            />
          </div>
        </div>
      )}

      <label className={styles.check}>
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
        />
        <span>Active (Show on Website)</span>
      </label>

      <button
        className={styles.button}
        type="submit"
        disabled={loading}
      >
        {loading
          ? status || "Saving..."
          : testimonial
          ? "Update Testimonial"
          : "Save Testimonial"}
      </button>

    </form>
  );
}

export default TestimonialForm;