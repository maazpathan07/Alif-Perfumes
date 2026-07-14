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

  const handleAdd = () => {
    setSelectedTestimonial(null);
    setIsModalOpen(true);
  };

  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedTestimonial(null);
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    setSelectedTestimonial(null);
    setIsModalOpen(false);

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
      />
    </>
  );
}

export default Testimonials;