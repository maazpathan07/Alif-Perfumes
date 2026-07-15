import { useEffect, useState } from "react";

import {
  Pencil,
  Trash2,
  Star,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getProducts,
  deleteProduct,
} from "../../../../services/productService";
import { deleteImage } from "../../../../services/storageService";

import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";
import EmptyState from "../../../UI/EmptyState/EmptyState";
import ConfirmModal from "../../../UI/ConfirmModal/ConfirmModal";

import styles from "./ProductTable.module.css";

function ProductTable({ onEdit, search = "", category = "All Categories" }) {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState(null);

  useEffect(() => {
    let active = true;
    getProducts()
      .then((data) => {
        if (active) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load products.");
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
      const target = products.find((p) => p.id === deleteId);
      if (target?.image) {
        await deleteImage(target.image);
      }

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

  const handleToggleStock = async (product) => {
    const updatedStatus = !product.inStock;
    try {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, inStock: updatedStatus } : p))
      );
      await updateProduct(product.id, { inStock: updatedStatus });
      toast.success(`${product.name} is now ${updatedStatus ? "In Stock" : "Out of Stock"}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update stock status.");
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, inStock: !updatedStatus } : p))
      );
    }
  };

  const handleToggleFeatured = async (product) => {
    const updatedFeatured = !product.featured;
    try {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, featured: updatedFeatured } : p))
      );
      await updateProduct(product.id, { featured: updatedFeatured });
      toast.success(updatedFeatured ? `${product.name} is now Featured!` : `${product.name} removed from Featured.`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update featured status.");
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, featured: !updatedFeatured } : p))
      );
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !search ||
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "All Categories" ||
      product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <LoadingSpinner text="Loading Products..." />
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className={styles.wrapper}>
        <EmptyState
          title="No Products Found"
          subtitle="Try adjusting your search or filters."
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

              <th>Original Price</th>

              <th>Sale Price</th>

              <th>Featured</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product) => (


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

                <td style={{ fontWeight: 600 }}>{product.name}</td>

                <td>{product.category}</td>

                <td>₹{product.price}</td>

                <td>
                  {product.discountPrice ? (
                    <strong style={{ color: "#16a34a" }}>₹{product.discountPrice}</strong>
                  ) : (
                    <span style={{ color: "#94a3b8" }}>-</span>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => handleToggleFeatured(product)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
                    title={product.featured ? "Remove from Featured" : "Feature on Homepage"}
                  >
                    <Star
                      size={20}
                      fill={product.featured ? "#fbbf24" : "none"}
                      color={product.featured ? "#fbbf24" : "#94a3b8"}
                    />
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleToggleStock(product)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    title="Click to toggle Stock Status"
                  >
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
                  </button>
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