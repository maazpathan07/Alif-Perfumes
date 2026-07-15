import Modal from "../../../UI/Modal/Modal";
import ProductForm from "../ProductForm/ProductForm";

function ProductModal({
  open,
  onClose,
  product,
  onSuccess,
  setIsDirty,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        product
          ? "Edit Product"
          : "Add Product"
      }
    >
      <ProductForm
        product={product}
        onSuccess={onSuccess}
        setIsDirty={setIsDirty}
      />
    </Modal>
  );
}

export default ProductModal;