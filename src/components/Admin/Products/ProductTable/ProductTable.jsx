import { useEffect, useState } from "react";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getProducts,
  deleteProduct,
} from "../../../../services/productService";

import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";
import EmptyState from "../../../UI/EmptyState/EmptyState";
import ConfirmModal from "../../../UI/ConfirmModal/ConfirmModal";

import styles from "./ProductTable.module.css";

function ProductTable({ onEdit }) {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {

      const data =
        await getProducts();

      setProducts(data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load products."
      );

    } finally {

      setLoading(false);

    }
  }

  async function handleDelete() {

    if (!deleteId) return;

    try {

      await deleteProduct(deleteId);

      setProducts((prev) =>
        prev.filter(
          (product) =>
            product.id !== deleteId
        )
      );

      toast.success(
        "Product deleted successfully."
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
        <LoadingSpinner text="Loading Products..." />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.wrapper}>
        <EmptyState
          title="No Products Found"
          subtitle="Create your first product to see it here."
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

              <th>Product</th>

              <th>Category</th>

              <th>Price</th>

              <th>Rating</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr key={product.id}>

                <td>

                  <img
                    src={
                      product.image ||
                      "/placeholder-product.png"
                    }
                    alt={product.name}
                    className={styles.image}
                  />

                </td>

                <td>{product.name}</td>

                <td>{product.category}</td>

                <td>₹{product.price}</td>

                <td>{product.rating} ⭐</td>

                <td>

                  <span
                    className={
                      product.inStock
                        ? styles.inStock
                        : styles.outStock
                    }
                  >
                    {product.inStock
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>

                </td>

                <td>

                  <div className={styles.actions}>

                    <button
                      onClick={() =>
                        onEdit(product)
                      }
                      title="Edit Product"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => {

                        setDeleteId(
                          product.id
                        );

                        setShowModal(true);

                      }}
                      title="Delete Product"
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
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
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

export default ProductTable;