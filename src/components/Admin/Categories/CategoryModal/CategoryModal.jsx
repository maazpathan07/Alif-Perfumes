import Modal from "../../../UI/Modal/Modal";

import CategoryForm from "../CategoryForm/CategoryForm";

function CategoryModal({
  open,
  onClose,
  category,
  onSuccess,
  setIsDirty,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        category
          ? "Edit Category"
          : "Add Category"
      }
    >
      <CategoryForm
        category={category}
        onSuccess={onSuccess}
        setIsDirty={setIsDirty}
      />
    </Modal>
  );
}

export default CategoryModal;