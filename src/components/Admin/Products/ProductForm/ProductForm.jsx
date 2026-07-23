import { useEffect, useState } from "react";

import {
  addProduct,
  updateProduct,
} from "../../../../services/productService";

import { getCategories } from "../../../../services/categoryService";

import styles from "./ProductForm.module.css";

import {
  uploadImage,
  deleteImage,
} from "../../../../services/storageService";

import toast from "react-hot-toast";

import ImageCropModal from "../ImageCropModal/ImageCropModal";

function ProductForm({
  product,
  onSuccess,
  setIsDirty,
}) {
  const [loading, setLoading] =
    useState(false);

  const [categories, setCategories] = useState([]);
  const [rawFileForCrop, setRawFileForCrop] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    let active = true;
    getCategories()
      .then((data) => {
        if (active) setCategories(data);
      })
      .catch((err) => console.error("Failed to load categories in form:", err));
    return () => { active = false; };
  }, []);

  const [formData, setFormData] =
    useState({
      name: "",
      category: "",
      price: "",
      discountPrice: "",
      rating: "",
      description: "",
      features: "",
      topNotes: "",
      middleNotes: "",
      baseNotes: "",
      inStock: true,
      featured: false,
      image: null,
    });

  useEffect(() => {
    if (!setIsDirty) return;

    let dirty;
    if (product) {
      const nameChanged = (formData.name || "") !== (product.name || "");
      const categoryChanged = (formData.category || "") !== (product.category || "");
      const priceChanged = String(formData.price || "") !== String(product.price || "");
      const discountChanged = String(formData.discountPrice || "") !== String(product.discountPrice || "");
      const ratingChanged = String(formData.rating || "") !== String(product.rating || "");
      const descriptionChanged = (formData.description || "") !== (product.description || "");
      const featuresStr = Array.isArray(product.features) ? product.features.join(", ") : product.features || "";
      const featuresChanged = (formData.features || "") !== featuresStr;
      const inStockChanged = (formData.inStock ?? true) !== (product.inStock ?? true);
      const featuredChanged = (formData.featured ?? false) !== (product.featured ?? false);
      const imageChanged = formData.image instanceof File;

      dirty = nameChanged || categoryChanged || priceChanged || discountChanged || ratingChanged || descriptionChanged || featuresChanged || inStockChanged || featuredChanged || imageChanged;
    } else {
      dirty = !!formData.name || !!formData.category || !!formData.price || !!formData.discountPrice || !!formData.rating || !!formData.description || !!formData.features || formData.image instanceof File;
    }

    setIsDirty(dirty);
  }, [formData, product, setIsDirty]);


    const [uploadProgress, setUploadProgress] =
    useState(0);

    const [status, setStatus] =
    useState("");

  useEffect(() => {
    if (!product) return;

    Promise.resolve().then(() => {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        discountPrice: product.discountPrice || "",
        rating: product.rating || "",
        description: product.description || "",
        features: Array.isArray(product.features)
            ? product.features.join(", ")
            : product.features || "",
        topNotes: product.topNotes || "",
        middleNotes: product.middleNotes || "",
        baseNotes: product.baseNotes || "",
        inStock: product.inStock ?? true,
        featured: product.featured ?? false,
        image: product.image || null,
      });
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

    if (type === "file") {
      if (files && files[0]) {
        setRawFileForCrop(files[0]);
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCropConfirm = (finalFile) => {
    setFormData((prev) => ({
      ...prev,
      image: finalFile,
    }));
    setPreviewUrl(URL.createObjectURL(finalFile));
    setRawFileForCrop(null);
  };

  const handleCropCancel = () => {
    setRawFileForCrop(null);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      rating: "",
      description: "",
      features: "",
      topNotes: "",
      middleNotes: "",
      baseNotes: "",
      inStock: true,
      featured: false,
      image: null,
    });
    setPreviewUrl(null);
  };

    const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    if (Number(formData.price) < 0 || (formData.discountPrice && Number(formData.discountPrice) < 0)) {
      toast.error("Price cannot be negative.");
      setLoading(false);
      return;
    }

    if (Number(formData.rating) < 0 || Number(formData.rating) > 5) {
      toast.error("Rating must be between 0 and 5.");
      setLoading(false);
      return;
    }

    if (formData.discountPrice && Number(formData.discountPrice) >= Number(formData.price)) {
      toast.error("Discount price must be lower than original price.");
      setLoading(false);
      return;
    }

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
          discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
          rating: Number(formData.rating),
          description: formData.description,
          features: formData.features
            ? Array.isArray(formData.features)
             ? formData.features
             : formData.features
             .split(",")
             .map((item) => item.trim())
            : [],
          topNotes: formData.topNotes || "",
          middleNotes: formData.middleNotes || "",
          baseNotes: formData.baseNotes || "",
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
        <div className={styles.fieldGroup}>
          <label htmlFor="product-name" className={styles.label}>Product Name *</label>
          <input
            id="product-name"
            type="text"
            name="name"
            placeholder="e.g. Royal Oud Intense"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="product-category" className={styles.label}>Category *</label>
          <select
            id="product-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {(categories.length > 0 ? categories.map(c => c.name) : ["Arabic Perfumes", "Attars", "Bakhoor", "Gift Sets"]).map((catName) => (
              <option key={catName} value={catName}>
                {catName}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="product-price" className={styles.label}>Original Price (₹) *</label>
          <input
            id="product-price"
            type="number"
            name="price"
            placeholder="e.g. 2999"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="product-discount-price" className={styles.label}>Discount Price (₹)</label>
          <input
            id="product-discount-price"
            type="number"
            name="discountPrice"
            placeholder="e.g. 2499 (Optional)"
            value={formData.discountPrice}
            onChange={handleChange}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="product-rating" className={styles.label}>Rating (0 - 5) *</label>
          <input
            id="product-rating"
            type="number"
            name="rating"
            placeholder="e.g. 4.8"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="product-top-notes" className={styles.label}>Top Notes</label>
          <input
            id="product-top-notes"
            type="text"
            name="topNotes"
            placeholder="e.g. Lavender, Bergamot"
            value={formData.topNotes}
            onChange={handleChange}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="product-middle-notes" className={styles.label}>Middle Notes</label>
          <input
            id="product-middle-notes"
            type="text"
            name="middleNotes"
            placeholder="e.g. Amber, Patchouli"
            value={formData.middleNotes}
            onChange={handleChange}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="product-base-notes" className={styles.label}>Base Notes</label>
          <input
            id="product-base-notes"
            type="text"
            name="baseNotes"
            placeholder="e.g. Sandalwood, Agarwood Oud"
            value={formData.baseNotes}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={styles.fieldGroupFull}>
        <label htmlFor="product-description" className={styles.label}>Description *</label>
        <textarea
          id="product-description"
          name="description"
          rows="4"
          placeholder="Enter detailed perfume description..."
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.fieldGroupFull}>
        <label htmlFor="product-features" className={styles.label}>Features (comma separated)</label>
        <textarea
          id="product-features"
          name="features"
          rows="3"
          placeholder="e.g. Long-lasting 24h, Premium Agarwood, Cruelty-free"
          value={formData.features}
          onChange={handleChange}
        />
      </div>

      {/* Selected / Current Image Preview */}
      {(previewUrl || (typeof formData.image === "string" && formData.image)) && (
        <div className={styles.previewBox}>
          <img
            src={previewUrl || formData.image}
            alt="Product Preview"
            className={styles.previewImg}
          />
          <div>
            <span className={styles.previewTextTitle}>
              ✓ Image Selected & Ready
            </span>
            <span className={styles.previewTextSub}>
              Click file button below to change or recrop.
            </span>
          </div>
        </div>
      )}

      <div className={styles.fieldGroupFull}>
        <label htmlFor="product-image" className={styles.label}>Product Image *</label>
        <input
          id="product-image"
          type="file"
          name="image"
          className={styles.fileInput}
          accept="image/*"
          onChange={handleChange}
          required={!product && !formData.image}
        />
      </div>

      {/* Image Crop & Preview Modal */}
      {rawFileForCrop && (
        <ImageCropModal
          imageFile={rawFileForCrop}
          onConfirm={handleCropConfirm}
          onCancel={handleCropCancel}
        />
      )}

      <div className={styles.checks}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
          />
          In Stock
        </label>

        <label className={styles.checkboxLabel}>
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

          <div
            className={styles.progressContainer}
            role="progressbar"
            aria-valuenow={uploadProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Image upload progress"
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