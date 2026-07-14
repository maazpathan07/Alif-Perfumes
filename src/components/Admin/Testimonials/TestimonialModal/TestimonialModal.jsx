import Modal from "../../../UI/Modal/Modal";

import TestimonialForm from "../TestimonialForm/TestimonialForm";

function TestimonialModal({
  open,
  onClose,
  testimonial,
  onSuccess,
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
      />
    </Modal>
  );
}

export default TestimonialModal;