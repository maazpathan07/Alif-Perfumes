import { useEffect, useState } from "react";

import Section from "../UI/Section";
import Title from "../UI/Title";
import TestimonialCard from "../TestimonialCard/TestimonialCard";

import { getTestimonials } from "../../services/testimonialService";
import staticTestimonials from "../../data/testimonials";

import { Reveal } from "../../animations";

import styles from "./Testimonials.module.css";

function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getTestimonials()
      .then((data) => {
        if (active) {
          const activeReviews = data.filter((item) => item.isActive !== false);
          setReviews(activeReviews);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Failed to load database testimonials on homepage:", error);
        // Fallback to static reviews
        if (active) {
          const activeStatic = staticTestimonials.filter((item) => item.isActive !== false);
          setReviews(activeStatic);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading || reviews.length === 0) {
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