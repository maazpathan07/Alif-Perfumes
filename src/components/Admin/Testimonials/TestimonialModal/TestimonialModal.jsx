import Modal from "../../../UI/Modal/Modal";

import TestimonialForm from "../TestimonialForm/TestimonialForm";

function TestimonialModal({
  open,
  onClose,
  testimonial,
  onSuccess,
  setIsDirty,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        testimonial
          ? "Edit Testimonial"
          : "Add Testimonial"
      }
    >
      <TestimonialForm
        testimonial={testimonial}
        onSuccess={onSuccess}
        setIsDirty={setIsDirty}
      />
    </Modal>
  );
}

export default TestimonialModal;