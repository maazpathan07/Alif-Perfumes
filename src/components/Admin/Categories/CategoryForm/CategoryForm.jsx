import {
  useEffect,
  useState,
} from "react";

import {
  addCategory,
  updateCategory,
} from "../../../../services/categoryService";

import styles from "./CategoryForm.module.css";

import toast from "react-hot-toast";

function CategoryForm({
  category,
  onSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      image: "",
      featured: false,
    });

  useEffect(() => {

    if (!category) return;

    setFormData({
      name: category.name || "",
      description:
        category.description || "",
      image: category.image || "",
      featured:
        category.featured ?? false,
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
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      if (category) {

        await updateCategory(
          category.id,
          formData
        );

        toast.success("Category updated successfully!");

      } else {

        await addCategory({
          ...formData,
          createdAt: new Date(),
        });

        toast.success("Category added successfully!");

      }

      resetForm();

      onSuccess?.();

    } catch (error) {

      console.error(error);

      toast.error(
        "Something went wrong."
      );

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
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />

      <label className={styles.check}>

        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
        />

        Featured Category

      </label>

      <button
        className={styles.button}
        type="submit"
        disabled={loading}
      >
        {loading
          ? category
            ? "Updating..."
            : "Saving..."
          : category
          ? "Update Category"
          : "Save Category"}
      </button>

    </form>
  );
}

export default CategoryForm;