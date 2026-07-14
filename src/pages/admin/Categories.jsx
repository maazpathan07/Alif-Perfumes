import { useState } from "react";

import CategoryToolbar from "../../components/Admin/Categories/CategoryToolbar/CategoryToolbar";
import CategoryTable from "../../components/Admin/Categories/CategoryTable/CategoryTable";
import CategoryModal from "../../components/Admin/Categories/CategoryModal/CategoryModal";

function Categories() {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [refreshKey, setRefreshKey] =
    useState(0);

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);

    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <CategoryToolbar
        onAdd={handleAdd}
      />

      <CategoryTable
        key={refreshKey}
        onEdit={handleEdit}
      />

      <CategoryModal
        open={isModalOpen}
        category={selectedCategory}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </>
  );
}

export default Categories;