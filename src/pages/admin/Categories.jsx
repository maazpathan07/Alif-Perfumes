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

  const [isDirty, setIsDirty] = useState(false);

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsDirty(false);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsDirty(false);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    if (isDirty) {
      const confirm = window.confirm("You have unsaved changes. Are you sure you want to close?");
      if (!confirm) return;
    }
    setSelectedCategory(null);
    setIsModalOpen(false);
    setIsDirty(false);
  };

  const handleSuccess = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);
    setIsDirty(false);

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
        setIsDirty={setIsDirty}
      />
    </>
  );
}

export default Categories;