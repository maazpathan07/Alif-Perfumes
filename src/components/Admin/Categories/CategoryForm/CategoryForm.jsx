import {
  useEffect,
  useState,
} from "react";

import {
  addCategory,
  updateCategory,
} from "../../../../services/categoryService";

import {
  uploadImage,
  deleteImage,
} from "../../../../services/storageService";

import styles from "./CategoryForm.module.css";

import toast from "react-hot-toast";

function CategoryForm({
  category,
  onSuccess,
  setIsDirty,
}) {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      image: "",
      featured: false,
      isActive: true,
    });

  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!setIsDirty) return;

    let dirty;
    if (category) {
      const nameChanged = (formData.name || "") !== (category.name || "");
      const descriptionChanged = (formData.description || "") !== (category.description || "");
      const featuredChanged = (formData.featured ?? false) !== (category.featured ?? false);
      const activeChanged = (formData.isActive ?? true) !== (category.isActive ?? true);
      const imageChanged = !!imageFile;

      dirty = nameChanged || descriptionChanged || featuredChanged || activeChanged || imageChanged;
    } else {
      dirty = !!formData.name || !!formData.description || !formData.isActive || !!imageFile;
    }

    setIsDirty(dirty);
  }, [formData, imageFile, category, setIsDirty]);


  useEffect(() => {
    if (!category) return;

    Promise.resolve().then(() => {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        image: category.image || "",
        featured: category.featured ?? false,
        isActive: category.isActive ?? true,
      });
      setImageFile(null);
    });
  }, [category]);

  const handleChange = (e) => {

    const {
      name,
      value,
      checked,
      type,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image: "",
      featured: false,
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
      let imageUrl = formData.image;

      if (imageFile) {
        if (category?.image && category.image.startsWith("http")) {
          try {
            await deleteImage(category.image);
          } catch (err) {
            console.warn("Could not delete old image:", err);
          }
        }

        setStatus("Uploading");
        imageUrl = await uploadImage(
          imageFile,
          "categories",
          (progress) => {
            setUploadProgress(progress);
          }
        );
        setStatus("Saving");
      }

      const categoryData = {
        name: formData.name,
        description: formData.description,
        image: imageUrl,
        featured: formData.featured,
        isActive: formData.isActive,
      };

      if (category) {

        await updateCategory(
          category.id,
          categoryData
        );

        toast.success("Category updated successfully!");

      } else {

        await addCategory({
          ...categoryData,
          createdAt: new Date(),
        });

        toast.success("Category added successfully!");

      }

      resetForm();

      onSuccess?.();

    } catch (error) {

      console.error(error);

      toast.error(
        error.message || "Something went wrong."
      );

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

      <input
        type="text"
        name="name"
        placeholder="Category Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <textarea
        rows="4"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL (Fallback)"
        value={formData.image}
        onChange={handleChange}
      />

      <div className={styles.fileInputGroup}>
        <label>Or Upload Category Image File:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>

      {(imageFile || formData.image) && (
        <div className={styles.previewContainer}>
          <img
            src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
            alt="Preview"
            className={styles.preview}
          />
          {imageFile && (
            <button
              type="button"
              onClick={() => setImageFile(null)}
              className={styles.removePreview}
            >
              Remove
            </button>
          )}
        </div>
      )}

      {loading && status === "Uploading" && (
        <div className={styles.progressContainer}>
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

      <div style={{ display: "flex", gap: "20px", margin: "10px 0" }}>
        <label className={styles.check}>
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Featured Category
        </label>

        <label className={styles.check}>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          Active (Visible on Site)
        </label>
      </div>

      <button
        className={styles.button}
        type="submit"
        disabled={loading}
      >
        {loading
          ? status || "Saving..."
          : category
          ? "Update Category"
          : "Save Category"}
      </button>

    </form>
  );
}

export default CategoryForm;