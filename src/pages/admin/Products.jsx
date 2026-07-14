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

  const handleAdd = () => {
    setSelectedProduct(null);

    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);

    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);

    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);

    setSelectedProduct(null);

    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <ProductToolbar
        onAdd={handleAdd}
      />

      <ProductTable
        key={refreshKey}
        onEdit={handleEdit}
      />

      <ProductModal
        open={isModalOpen}
        product={selectedProduct}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </>
  );
}

export default Products;