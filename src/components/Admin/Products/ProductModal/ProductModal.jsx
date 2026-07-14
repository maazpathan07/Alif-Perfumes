import Modal from "../../../UI/Modal/Modal";
import ProductForm from "../ProductForm/ProductForm";

function ProductModal({
  open,
  onClose,
  product,
  onSuccess,
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
      />
    </Modal>
  );
}

export default ProductModal;