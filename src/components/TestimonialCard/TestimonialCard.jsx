import {
  Star,
  UserCircle2,
} from "lucide-react";

import { Hover } from "../../animations";

import styles from "./TestimonialCard.module.css";

function TestimonialCard({ review }) {
  return (
    <Hover>

      <div className={styles.card}>

        <div className={styles.stars}>

          {Array.from({
            length: review.rating,
          }).map((_, index) => (
            <Star
              key={index}
              size={18}
              strokeWidth={2}
              fill="currentColor"
            />
          ))}

        </div>

        <p className={styles.review}>
          "{review.review}"
        </p>

        <div className={styles.user}>

          {review.image ? (
            <img
              src={review.image}
              alt={review.name}
              loading="lazy"
            />
          ) : (
            <UserCircle2
              size={46}
              strokeWidth={1.8}
            />
          )}

          <div>

            <h3>{review.name}</h3>

            {review.location && (
              <span>{review.location}</span>
            )}

          </div>

        </div>

      </div>

    </Hover>
  );
}

export default TestimonialCard;