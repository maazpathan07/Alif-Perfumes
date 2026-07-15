import { useState } from "react";

import TestimonialToolbar from "../../components/Admin/Testimonials/TestimonialToolbar/TestimonialToolbar";
import TestimonialTable from "../../components/Admin/Testimonials/TestimonialTable/TestimonialTable";
import TestimonialModal from "../../components/Admin/Testimonials/TestimonialModal/TestimonialModal";

function Testimonials() {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedTestimonial, setSelectedTestimonial] =
    useState(null);

  const [refreshKey, setRefreshKey] =
    useState(0);

  const [isDirty, setIsDirty] = useState(false);

  const handleAdd = () => {
    setSelectedTestimonial(null);
    setIsDirty(false);
    setIsModalOpen(true);
  };

  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsDirty(false);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    if (isDirty) {
      const confirm = window.confirm("You have unsaved changes. Are you sure you want to close?");
      if (!confirm) return;
    }
    setSelectedTestimonial(null);
    setIsModalOpen(false);
    setIsDirty(false);
  };

  const handleSuccess = () => {
    setSelectedTestimonial(null);
    setIsModalOpen(false);
    setIsDirty(false);

    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <TestimonialToolbar
        onAdd={handleAdd}
      />

      <TestimonialTable
        key={refreshKey}
        onEdit={handleEdit}
      />

      <TestimonialModal
        open={isModalOpen}
        testimonial={selectedTestimonial}
        onClose={handleClose}
        onSuccess={handleSuccess}
        setIsDirty={setIsDirty}
      />
    </>
  );
}

export default Testimonials;