import { useEffect, useState } from "react";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getCategories,
  deleteCategory,
} from "../../../../services/categoryService";

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
    loadCategories();
  }, []);

  async function loadCategories() {
    try {

      const data =
        await getCategories();

      setCategories(data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load categories."
      );

    } finally {

      setLoading(false);

    }
  }

  async function handleDelete() {

    if (!deleteId) return;

    try {

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

                <td>{category.name}</td>

                <td>{category.description}</td>

                <td>

                  <span
                    className={
                      category.featured
                        ? styles.featured
                        : styles.notFeatured
                    }
                  >
                    {category.featured
                      ? "Yes"
                      : "No"}
                  </span>

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