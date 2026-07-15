import { useState } from "react";

import ProductToolbar from "../../components/Admin/Products/ProductToolbar/ProductToolbar";
import ProductTable from "../../components/Admin/Products/ProductTable/ProductTable";
import ProductModal from "../../components/Admin/Products/ProductModal/ProductModal";

function Products() {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [refreshKey, setRefreshKey] =
    useState(0);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const [isDirty, setIsDirty] = useState(false);

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsDirty(false);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsDirty(false);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    if (isDirty) {
      const confirm = window.confirm("You have unsaved changes. Are you sure you want to close?");
      if (!confirm) return;
    }
    setSelectedProduct(null);
    setIsModalOpen(false);
    setIsDirty(false);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setIsDirty(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <ProductToolbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        onAdd={handleAdd}
      />

      <ProductTable
        key={`${refreshKey}-${search}-${category}`}
        search={search}
        category={category}
        onEdit={handleEdit}
      />

      <ProductModal
        open={isModalOpen}
        product={selectedProduct}
        onClose={handleClose}
        onSuccess={handleSuccess}
        setIsDirty={setIsDirty}
      />
    </>
  );
}

export default Products;