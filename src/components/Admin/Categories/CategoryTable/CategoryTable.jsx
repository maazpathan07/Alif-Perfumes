import { useEffect, useState } from "react";

import {
  Pencil,
  Trash2,
  Star,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getCategories,
  deleteCategory,
  updateCategory,
} from "../../../../services/categoryService";
import { deleteImage } from "../../../../services/storageService";

import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";
import EmptyState from "../../../UI/EmptyState/EmptyState";
import ConfirmModal from "../../../UI/ConfirmModal/ConfirmModal";

import styles from "./CategoryTable.module.css";

function CategoryTable({ onEdit }) {
  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState(null);

  useEffect(() => {
    let active = true;
    getCategories()
      .then((data) => {
        if (active) {
          setCategories(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load categories.");
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
      const target = categories.find((c) => c.id === deleteId);
      if (target?.image) {
        await deleteImage(target.image);
      }

      await deleteCategory(deleteId);

      setCategories((prev) =>
        prev.filter(
          (category) =>
            category.id !== deleteId
        )
      );

      toast.success(
        "Category deleted successfully."
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

  const handleToggleFeatured = async (category) => {
    const updatedFeatured = !category.featured;
    try {
      setCategories((prev) =>
        prev.map((c) => (c.id === category.id ? { ...c, featured: updatedFeatured } : c))
      );
      await updateCategory(category.id, { featured: updatedFeatured });
      toast.success(updatedFeatured ? `${category.name} is now Featured!` : `${category.name} removed from Featured.`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update featured status.");
      setCategories((prev) =>
        prev.map((c) => (c.id === category.id ? { ...c, featured: !updatedFeatured } : c))
      );
    }
  };

  const handleToggleActive = async (category) => {
    const updatedActive = category.isActive === false ? false : true;
    const nextVal = !updatedActive;
    try {
      setCategories((prev) =>
        prev.map((c) => (c.id === category.id ? { ...c, isActive: nextVal } : c))
      );
      await updateCategory(category.id, { isActive: nextVal });
      toast.success(`${category.name} is now ${nextVal ? "Active" : "Inactive"}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update active status.");
      setCategories((prev) =>
        prev.map((c) => (c.id === category.id ? { ...c, isActive: updatedActive } : c))
      );
    }
  };

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <LoadingSpinner text="Loading Categories..." />
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className={styles.wrapper}>
        <EmptyState
          title="No Categories Found"
          subtitle="Create your first category to organize your products."
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

              <th>Image</th>

              <th>Name</th>

              <th>Description</th>

              <th>Featured</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {categories.map((category) => (

              <tr key={category.id}>

                <td>

                  <img
                    src={
                      category.image ||
                      "/placeholder-category.png"
                    }
                    alt={category.name}
                    className={styles.image}
                  />

                </td>

                <td style={{ fontWeight: 600 }}>{category.name}</td>

                <td>{category.description}</td>

                <td>
                  <button
                    onClick={() => handleToggleFeatured(category)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
                    title={category.featured ? "Remove from Featured" : "Feature on Homepage"}
                  >
                    <Star
                      size={20}
                      fill={category.featured ? "#fbbf24" : "none"}
                      color={category.featured ? "#fbbf24" : "#94a3b8"}
                    />
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleToggleActive(category)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    title="Click to toggle Category Visibility"
                  >
                    <span
                      className={
                        category.isActive !== false
                          ? styles.featured
                          : styles.notFeatured
                      }
                    >
                      {category.isActive !== false
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </button>
                </td>

                <td>

                  <div className={styles.actions}>

                    <button
                      onClick={() =>
                        onEdit(category)
                      }
                      title="Edit Category"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => {

                        setDeleteId(
                          category.id
                        );

                        setShowModal(true);

                      }}
                      title="Delete Category"
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
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
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

export default CategoryTable;