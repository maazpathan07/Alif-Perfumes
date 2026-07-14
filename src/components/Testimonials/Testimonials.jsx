import { useMemo } from "react";

import Section from "../UI/Section";
import Title from "../UI/Title";
import TestimonialCard from "../TestimonialCard/TestimonialCard";

import testimonials from "../../data/testimonials";

import { Reveal } from "../../animations";

import styles from "./Testimonials.module.css";

function Testimonials() {
  const reviews = useMemo(() => {
    return testimonials.filter(
      (item) => item.isActive !== false
    );
  }, []);

  if (reviews.length === 0) {
    return null;
  }

  return (
    <Section>

      <Title
        title="What Our Customers Say"
        subtitle="Real reviews from our valued customers."
      />

      <div className={styles.grid}>

        {reviews.map((review, index) => (
          <Reveal
            key={review.id}
            delay={index * 0.08}
          >
            <TestimonialCard
              review={review}
            />
          </Reveal>
        ))}

      </div>

    </Section>
  );
}

export default Testimonials;