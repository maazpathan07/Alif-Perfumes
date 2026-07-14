import Modal from "../../../UI/Modal/Modal";

import CategoryForm from "../CategoryForm/CategoryForm";

function CategoryModal({
  open,
  onClose,
  category,
  onSuccess,
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
      />
    </Modal>
  );
}

export default CategoryModal;