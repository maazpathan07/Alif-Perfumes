import {
  Star,
  UserCircle2,
} from "lucide-react";

import { Hover } from "../../animations";

import styles from "./TestimonialCard.module.css";

function TestimonialCard({ review }) {
  return (
    <Hover>

      <article className={styles.card}>

        <div className={styles.stars} aria-label={`Rating: ${review.rating} out of 5`} role="img">

          {Array.from({
            length: review.rating,
          }).map((_, index) => (
            <Star
              key={index}
              size={18}
              strokeWidth={2}
              fill="currentColor"
              aria-hidden="true"
            />
          ))}

        </div>

        <p className={styles.review}>
          &ldquo;{review.review}&rdquo;
        </p>

        <div className={styles.user}>

          {review.image ? (
            <img
              src={review.image}
              alt={`Photo of ${review.name}`}
              loading="lazy"
            />
          ) : (
            <UserCircle2
              size={46}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          )}

          <div>

            <h3>{review.name}</h3>

            {review.location && (
              <span>{review.location}</span>
            )}

          </div>

        </div>

      </article>

    </Hover>
  );
}

export default TestimonialCard;