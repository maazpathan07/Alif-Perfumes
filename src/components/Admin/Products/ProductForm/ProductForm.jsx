import { useEffect, useState } from "react";

import {
  addProduct,
  updateProduct,
} from "../../../../services/productService";

import styles from "./ProductForm.module.css";

import {
  uploadImage,
  deleteImage,
} from "../../../../services/storageService";

import toast from "react-hot-toast";

function ProductForm({
  product,
  onSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      category: "",
      price: "",
      rating: "",
      description: "",
      features: "",
      inStock: true,
      featured: false,
      image: null,
    });

    const [uploadProgress, setUploadProgress] =
    useState(0);

    const [status, setStatus] =
    useState("");

  useEffect(() => {

    if (!product) return;

    setFormData({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      rating: product.rating || "",
      description:
        product.description || "",
      features: Array.isArray(product.features)
          ? product.features.join(", ")
          : product.features || "",
      inStock:
        product.inStock ?? true,
      featured:
        product.featured ?? false,
      image:
        product.image || null,
    });

  }, [product]);

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
      files,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      rating: "",
      description: "",
      features: "",
      inStock: true,
      featured: false,
      image: null,
    });
  };

    const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    let imageUrl = product?.image || "";

    // Upload new image only if user selected one
        if (formData.image instanceof File) {

          if (product?.image) {

            await deleteImage(product.image);

          }

          setStatus("Uploading");

          imageUrl = await uploadImage(
            formData.image,
            "products",
            (progress) => {
              setUploadProgress(progress);
            }
          );

          setStatus("Saving");

        }

        const productData = {
          name: formData.name,
          category: formData.category,
          price: Number(formData.price),
          rating: Number(formData.rating),
          description: formData.description,
          features: formData.features
            ? Array.isArray(formData.features)
             ? formData.features
             : formData.features
             .split(",")
             .map((item) => item.trim())
            : [],
          inStock: formData.inStock,
          featured: formData.featured,
          image: imageUrl,
        };

          if (product) {

            await updateProduct(
              product.id,
              productData
            );

            toast.success(
              "Product updated successfully!"
            );

          } else {

            await addProduct({
              ...productData,
              createdAt: new Date(),
            });

            toast.success(
              "Product added successfully!"
            );

          }

          setUploadProgress(0);

          setStatus("");

          resetForm();

          onSuccess?.();

              } catch (error) {

          console.error(error);

          setUploadProgress(0);

          setStatus("");

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

      <div className={styles.grid}>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">
            Select Category
          </option>

          <option>Arabic Perfumes</option>
          <option>Attars</option>
          <option>Bakhoor</option>
          <option>Gift Sets</option>

        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating"
          min="0"
          max="5"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
          required
        />

      </div>

      <textarea
        name="description"
        rows="5"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <textarea
        name="features"
        rows="4"
        placeholder="Features (comma separated)"
        value={formData.features}
        onChange={handleChange}
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        required={!product}
      />

      <div className={styles.checks}>

        <label>

          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
          />

          In Stock

        </label>

        <label>

          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />

          Featured Product

        </label>

      </div>

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

      <button
        type="submit"
        className={styles.button}
        disabled={loading}
      >

        {loading ? (

          status === "Uploading"

            ? `Uploading ${uploadProgress}%...`

            : "Saving Product..."

        ) : product ? (

          "Update Product"

        ) : (

          "Save Product"

        )}

      </button>

    </form>
  );
}

export default ProductForm;